import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { pb } from '../pb';
import type { RecordModel } from 'pocketbase';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoggedIn: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  restoreSession: () => void;
}

function recordToUser(record: RecordModel): AuthUser {
  return {
    id: record.id,
    email: record.email as string,
    name: (record.name as string) || (record.email as string).split('@')[0],
    avatar: record.avatar as string | undefined,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: async (email, password) => {
        const authData = await pb.collection('users').authWithPassword(email, password);
        set({
          user: recordToUser(authData.record),
          token: authData.token,
          isLoggedIn: true,
        });
      },

      register: async (email, password, name) => {
        await pb.collection('users').create({
          email,
          password,
          passwordConfirm: password,
          name,
        });
        // Auto-login after register
        const authData = await pb.collection('users').authWithPassword(email, password);
        set({
          user: recordToUser(authData.record),
          token: authData.token,
          isLoggedIn: true,
        });
      },

      logout: () => {
        pb.authStore.clear();
        set({ user: null, token: null, isLoggedIn: false });
      },

      restoreSession: () => {
        if (pb.authStore.isValid && pb.authStore.model) {
          set({
            user: recordToUser(pb.authStore.model as RecordModel),
            token: pb.authStore.token,
            isLoggedIn: true,
          });
        }
      },
    }),
    {
      name: 'forma-atelier-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
