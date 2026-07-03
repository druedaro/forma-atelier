import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from '../firebase';

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


  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  restoreSession: () => void;
}

function firebaseUserToAuthUser(user: User): AuthUser {
  return {
    id: user.uid,
    email: user.email ?? '',
    name: user.displayName || (user.email ?? '').split('@')[0],
    avatar: user.photoURL ?? undefined,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: async (email, password) => {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        set({
          user: firebaseUserToAuthUser(credential.user),
          token: null,
          isLoggedIn: true,
        });
      },

      register: async (email, password, name) => {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, { displayName: name });
        set({
          user: firebaseUserToAuthUser({ ...credential.user, displayName: name }),
          token: null,
          isLoggedIn: true,
        });
      },

      logout: () => {
        signOut(auth);
        set({ user: null, token: null, isLoggedIn: false });
      },

      restoreSession: () => {

        onAuthStateChanged(auth, (user) => {
          if (user) {
            set({ user: firebaseUserToAuthUser(user), token: null, isLoggedIn: true });
          } else {
            set({ user: null, token: null, isLoggedIn: false });
          }
        });
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
