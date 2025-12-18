import { create } from 'zustand';
import { supabase } from '../../../services/supabaseClient';
import { Group } from '../../../models/Group';

type GroupState = {
  groups: Group[];
  loading: boolean;
  fetchGroups: () => Promise<void>;
};

export const useGroupStore = create<GroupState>((set) => ({
  groups: [],
  loading: false,
  fetchGroups: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.from<Group>('groups').select('*');
      if (error) {
        console.log(error);
      }
      if (data) {
        set({ groups: data });
      }
    } catch (err) {
      console.error('Fehler beim Abrufen der Gruppen:', err);
    } finally {
      set({ loading: false });
    }
  },
}));
