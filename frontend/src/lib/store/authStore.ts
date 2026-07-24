import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signInAnonymously,
  GoogleAuthProvider,
  type User,
} from 'firebase/auth';
import { auth } from '../firebase';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isGuest?: boolean;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoggedIn: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => void;
  restoreSession: () => void;
}

function firebaseUserToAuthUser(user: User, isGuest = false): AuthUser {
  return {
    id: user.uid,
    email: user.email ?? '',
    name: user.displayName || (user.isAnonymous ? 'Invitado' : (user.email ?? '').split('@')[0]),
    avatar: user.photoURL ?? undefined,
    isGuest,
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

      loginWithGoogle: async () => {
        const provider = new GoogleAuthProvider();
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
          await signInWithRedirect(auth, provider);
        } else {
          const credential = await signInWithPopup(auth, provider);
          set({
            user: firebaseUserToAuthUser(credential.user),
            token: null,
            isLoggedIn: true,
          });
        }
      },

      loginAsGuest: async () => {
        const credential = await signInAnonymously(auth);
        set({
          user: firebaseUserToAuthUser(credential.user, true),
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
            set({ user: firebaseUserToAuthUser(user, user.isAnonymous), token: null, isLoggedIn: true });
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
