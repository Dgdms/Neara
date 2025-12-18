import { create } from 'zustand';
import { supabase } from '../../../services/supabaseClient';
import { User } from '../../../models/User';

type AuthState = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  signIn: async (email, password) => {
    try {
      set({ loading: true });
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.error('SignIn error:', error.message);
        return;
      }

      if (data.user) {
        set({ user: { id: data.user.id, email: data.user.email, created_at: data.user.created_at } });
      }
    } catch (err) {
      console.error('Unexpected signIn error:', err);
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email, password) => {
    try {
      set({ loading: true });

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError) {
        console.error('SignUp error:', signUpError.message);
        return;
      }

      if (signUpData.user) {
        // Insert in users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert({
            id: signUpData.user.id,
            email: signUpData.user.email,
            created_at: new Date(),
          });

        if (userError) {
          console.error('Database insert error:', userError.message);
        }

        // User direkt in Zustand setzen
        set({
          user: {
            id: signUpData.user.id,
            email: signUpData.user.email,
            created_at: signUpData.user.created_at ?? new Date(), // fallback
          },
        });
      }

    } catch (err) {
      console.error('Unexpected signUp error:', err);
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true });
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('SignOut error:', error.message);
        return;
      }

      set({ user: null });
    } catch (err) {
      console.error('Unexpected signOut error:', err);
    } finally {
      set({ loading: false });
    }
  },
}));
