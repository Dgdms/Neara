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
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data.user) set({ user: { id: data.user.id, created_at: data.user.created_at } });
    set({ loading: false });
  },

  signUp: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (data.user) set({ user: { id: data.user.id, created_at: data.user.created_at } });
    set({ loading: false });
  },

  signOut: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
    set({ user: null });
    set({ loading: false });
  },
}));