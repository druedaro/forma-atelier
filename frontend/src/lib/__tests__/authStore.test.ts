import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act } from '@testing-library/react';

vi.mock('../firebase', () => ({ auth: {} }));

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  updateProfile: vi.fn(),
  onAuthStateChanged: vi.fn(),
  signInWithPopup: vi.fn(),
  signInAnonymously: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}));

import { useAuthStore } from '../store/authStore';

const mockUser = {
  uid: 'uid-123',
  email: 'test@forma.es',
  displayName: 'Test User',
  photoURL: null,
  isAnonymous: false,
};

const mockGuestUser = {
  uid: 'guest-456',
  email: null,
  displayName: null,
  photoURL: null,
  isAnonymous: true,
};

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null, isLoggedIn: false });
    vi.clearAllMocks();
  });

  it('initial state is unauthenticated', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isLoggedIn).toBe(false);
    expect(state.token).toBeNull();
  });

  it('login() sets user and isLoggedIn to true on success', async () => {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    vi.mocked(signInWithEmailAndPassword).mockResolvedValueOnce({ user: mockUser } as any);

    await act(async () => {
      await useAuthStore.getState().login('test@forma.es', 'password123');
    });

    const state = useAuthStore.getState();
    expect(state.isLoggedIn).toBe(true);
    expect(state.user?.email).toBe('test@forma.es');
    expect(state.user?.name).toBe('Test User');
  });

  it('login() throws on invalid credentials', async () => {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce(
      new Error('auth/invalid-credential')
    );

    await expect(
      useAuthStore.getState().login('wrong@email.com', 'badpass')
    ).rejects.toThrow();

    expect(useAuthStore.getState().isLoggedIn).toBe(false);
  });

  it('register() creates a user with a display name and sets isLoggedIn', async () => {
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
    vi.mocked(createUserWithEmailAndPassword).mockResolvedValueOnce({ user: mockUser } as any);
    vi.mocked(updateProfile).mockResolvedValueOnce(undefined);

    await act(async () => {
      await useAuthStore.getState().register('new@forma.es', 'password123', 'New User');
    });

    expect(useAuthStore.getState().isLoggedIn).toBe(true);
    expect(updateProfile).toHaveBeenCalledWith(mockUser, { displayName: 'New User' });
  });

  it('logout() clears the user state', async () => {
    const { signOut } = await import('firebase/auth');
    vi.mocked(signOut).mockResolvedValueOnce(undefined);

    useAuthStore.setState({ user: { id: '1', email: 'x@x.com', name: 'X' }, isLoggedIn: true, token: null });
    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isLoggedIn).toBe(false);
  });

  it('loginWithGoogle() sets user on success', async () => {
    const { signInWithPopup } = await import('firebase/auth');
    vi.mocked(signInWithPopup).mockResolvedValueOnce({ user: mockUser } as any);

    await act(async () => {
      await useAuthStore.getState().loginWithGoogle();
    });

    expect(useAuthStore.getState().isLoggedIn).toBe(true);
    expect(useAuthStore.getState().user?.email).toBe('test@forma.es');
  });

  it('loginAsGuest() sets the isGuest flag on the user', async () => {
    const { signInAnonymously } = await import('firebase/auth');
    vi.mocked(signInAnonymously).mockResolvedValueOnce({ user: mockGuestUser } as any);

    await act(async () => {
      await useAuthStore.getState().loginAsGuest();
    });

    const state = useAuthStore.getState();
    expect(state.isLoggedIn).toBe(true);
    expect(state.user?.isGuest).toBe(true);
    expect(state.user?.name).toBe('Invitado');
  });
});
