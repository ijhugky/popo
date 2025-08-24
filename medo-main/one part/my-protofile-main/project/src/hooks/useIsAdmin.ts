import { useEffect, useState } from 'react';

export default function useIsAdmin(): boolean {
  const [isAdmin, setIsAdmin] = useState<boolean>(typeof window !== 'undefined' && localStorage.getItem('isAdmin') === '1');

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'isAdmin') {
        setIsAdmin(e.newValue === '1');
      }
    };
    const handleAdminChanged = (e: Event) => {
      const detail = (e as CustomEvent).detail as { isAdmin?: boolean } | undefined;
      if (detail && typeof detail.isAdmin === 'boolean') {
        setIsAdmin(detail.isAdmin);
      } else {
        setIsAdmin(localStorage.getItem('isAdmin') === '1');
      }
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('admin:changed', handleAdminChanged as EventListener);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('admin:changed', handleAdminChanged as EventListener);
    };
  }, []);

  return isAdmin;
}

