import React from 'react';
import useIsAdmin from '../hooks/useIsAdmin';

const AdminExitButton: React.FC = () => {
  const isAdmin = useIsAdmin();

  if (!isAdmin) return null;

  return (
    <button
      onClick={() => {
        localStorage.setItem('isAdmin', '0');
        window.dispatchEvent(new CustomEvent('admin:changed', { detail: { isAdmin: false } }));
      }}
      className="fixed bottom-6 right-6 z-40 px-4 py-2 rounded-full font-semibold text-white border border-white/10 bg-gradient-to-r from-red-500/30 to-pink-500/30 backdrop-blur-md shadow-lg shadow-black/30 hover:from-red-500/40 hover:to-pink-500/40"
      aria-label="Exit admin mode"
    >
      Exit Admin
    </button>
  );
};

export default AdminExitButton;

