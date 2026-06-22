import { useState } from 'react';
import AssideAccount from '../account/AssideAccount';
import { Outlet } from 'react-router';
import ProfileHeader from '../account/ProfileHeader';

export default function AccountLayout() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const closeAccountMenu = () => setIsAccountMenuOpen(false);

  return (
    <div className="flex min-h-screen bg-surface text-on-surface">
      <AssideAccount isOpen={isAccountMenuOpen} onClose={closeAccountMenu} />

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isAccountMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeAccountMenu}
      />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <ProfileHeader onOpenMenu={() => setIsAccountMenuOpen(true)} />
        <div className="px-4 pb-8 sm:px-6 lg:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
