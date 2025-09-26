import { useEffect } from 'react';
import { supabase } from '../../../services/supabaseClient';
import { useAuthStore } from '../store/authStore';

export const useAuthListener = () => {
  const setUser = useAuthStore((state) => (user: any) => state.user = user);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id, created_at: session.user.created_at } : null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);
};
