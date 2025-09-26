import {create} from 'zustand';
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
    const { data, error } = await supabase.from<Group>('groups').select('*');
    if (data) set({ groups: data });
    set({ loading: false });
  },
}));
