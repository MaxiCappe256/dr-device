import { NavLink } from 'react-router'
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLogout } from '../../../hooks/useAuth';
import { MenuIcon, ArrowCloseIcon } from '../../../utils/icons';
import { useState } from 'react';
import Button from './Button';
import UserMenu from './UserMenu';
import Logo from './Logo';

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const logoutMutation = useLogout();
  const { user } = useAuthContext()

  const links = [
    { label: "Inicio", to: "/", isReferencial: false },
    { label: "Características", to: "#features", isReferencial: true },
    { label: "FAQ", to: "#faq", isReferencial: true }
  ]


  return (
    <>
      <nav className="w-11/12 flex items-center justify-between auth-brand-panel rounded-xl text-white mx-auto my-2 pl-5">
        <Logo to="/" iconClassName="size-6 brightness-0 invert" textClassName="max-md:text-xs" />

        <ul className="flex justify-end gap-8 items-center text-xl bg-linear-to-l from-primary via-primary/80 to-transparent rounded-lg px-5 py-2 max-lg:hidden">
          <div className="flex gap-8 items-center">
            {links.map((link) => (
              <li key={link.label}>
                {link.isReferencial ?
                  <a className="hover:text-primary-soft" href={link.to}>
                    {link.label}</a> :
                  <NavLink to={link.to} className="hover:text-primary-soft">
                    {link.label}
                  </NavLink>}
              </li>
            ))}
          </div>
          <div className="flex gap-4 items-center relative">
            {user?.data ?
              <UserMenu user={user.data} logoutLoading={logoutMutation.isPending} onLogout={logoutMutation.mutateAsync} />
              :
              <>
                <li className="underline hover:text-primary-soft">
                  <NavLink to="/auth/login">Iniciar sesión</NavLink>
                </li>
                <li>
                  <Button variant="inverted">
                    <NavLink to="/auth/register">Crear cuenta</NavLink>
                  </Button>
                </li>
              </>
            }
          </div>
        </ul>

        <div className="bg-linear-to-l from-primary via-primary/80 to-transparent rounded-lg lg:hidden flex">
          <MenuIcon
            className="m-5 cursor-pointer"
            height='24'
            onClick={() => setMenu(true)}
          />
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${menu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenu(false)}
      />

      <aside className={`fixed top-0 right-0 h-screen w-72 bg-primary z-50 lg:hidden transition-transform duration-300 flex flex-col gap-8 p-8 text-white rounded-l-lg ${menu ? 'translate-x-0' : 'translate-x-full'}`}>
        <ArrowCloseIcon
          className="absolute top-8 right-8 cursor-pointer"
          height='24'
          onClick={() => setMenu(false)}
        />

        <ul className="flex flex-col gap-6 text-xl mt-16">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className="hover:text-primary-soft"
                onClick={() => setMenu(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4">
          {user?.data ? (
            <>
              <span className="font-bold">{user.data.full_name}</span>
              <NavLink className='hover:text-primary-soft' to="/account" onClick={() => setMenu(false)}>Mi cuenta</NavLink>
              <NavLink className='hover:text-primary-soft' to="/account/orders" onClick={() => setMenu(false)}>Órdenes</NavLink>
              {user.data.roles?.some((role) => role.title === "admin") && (
                <NavLink className='hover:text-primary-soft' to="/admin-panel" onClick={() => setMenu(false)}>Panel admin</NavLink>
              )}
              <span
                className='text-error font-semibold cursor-pointer'
                onClick={logoutMutation.mutateAsync}
              >
                {logoutMutation.isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
              </span>
            </>
          ) : (
            <>
              <NavLink
                to="/auth/login"
                className="underline hover:text-primary-soft"
                onClick={() => setMenu(false)}
              >
                Iniciar sesión
              </NavLink>
              <Button variant="inverted">
                <NavLink to="/auth/register" onClick={() => setMenu(false)}>Crear cuenta</NavLink>
              </Button>
            </>
          )}
        </div>
      </aside>
    </>
  )
}