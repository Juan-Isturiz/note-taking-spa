import { Outlet } from 'react-router-dom';
import { Button } from '@/atoms';
import { NavButton } from './NavButton';

export function Layout() {
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  };
  return (
    <div className="min-h-screen bg-neutral-950">
      <nav>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center flex-col">
            <div className="flex justify-between w-full">
              <h1 className="text-3xl font-bold text-stone-300 self-start">
                Ensolver Notes
              </h1>
              <Button onClick={handleLogout} variant="ghost">
                Logout
              </Button>
            </div>
            <div className="flex items-center gap-8">
              <div className="sm:flex sm:gap-4 space-x-2">
                <NavButton to="/">Active</NavButton>
                <NavButton to="/archived">Archived</NavButton>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
