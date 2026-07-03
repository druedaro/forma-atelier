import React, { useEffect } from 'react';
import { useAuthStore } from '../../lib/store/authStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = '/login';
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return <>{children}</>;
}
