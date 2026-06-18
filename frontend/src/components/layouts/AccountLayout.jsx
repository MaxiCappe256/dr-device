import AssideAccount from '../account/AssideAccount';
import { Outlet } from 'react-router';
import ProfileHeader from '../account/ProfileHeader';

export default function AccountLayout() {
  return (
    <div className="flex min-h-screen bg-surface text-on-surface">
      <AssideAccount />
    
      <main className="min-w-0 flex-1 overflow-y-auto">
        <ProfileHeader />
        <div className='px-10'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
