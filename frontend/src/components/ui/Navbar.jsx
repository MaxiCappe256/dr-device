import { NavLink } from 'react-router'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useAuth } from '../../hooks/useAuth';
import { UserIcon, AngleDownIcon } from '../../utils/icons';
import { useState } from 'react';
import { MenuIcon, ArrowCloseIcon } from '../../utils/icons';
import Button from './Button';

export default function Navbar() {
  const [accountMenu, setAccountMenu] = useState(false);
  const [menu, setMenu] = useState(false);
  const { logoutMutation } = useAuth();
  const { user } = useAuthContext()

  const links = [
    { label: "Inicio", to: "/" },
    { label: "Características", to: "#features" },
    { label: "FAQ", to: "#faq" }
  ]

  return (
    <>
      <nav className="w-11/12 flex items-center justify-between auth-brand-panel rounded-xl text-white mx-auto my-2">
        <div className="flex items-center gap-4 p-3">
          <div className="flex items-center justify-center rounded-sm border-3 border-on-primary">
            <svg
              aria-hidden="true"
              className="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            >
              <path d="M8 6V4h8v2" />
              <path d="M4 6h16v14H4z" />
              <path d="M12 10v6" />
              <path d="M9 13h6" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-[-0.02em] max-md:text-xs">
            Dr. Device
          </span>
        </div>

        <ul className="flex justify-end gap-8 items-center text-xl bg-linear-to-l from-primary via-primary/80 to-transparent rounded-lg px-5 py-2 max-lg:hidden">
          <div className="flex gap-8 items-center">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink to={link.to} className="hover:text-primary-soft">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </div>
          <div className="flex gap-4 items-center relative">
            {user?.data ? (
              <>
                <li onClick={() => setAccountMenu(!accountMenu)}>
                  <Button
                    variant="normal"
                    iconLeft={<UserIcon height={24} />}
                    iconRight={
                      <AngleDownIcon
                        className={`${accountMenu ? 'rotate-180' : 'rotate-0'} transition-all`}
                        height={24}
                      />
                    }
                  >
                    {user.data.full_name}
                  </Button>
                </li>
                <ul className={`flex flex-col gap-4 absolute top-16 w-full p-3 rounded-lg bg-background border border-on-tertiary-fixed text-on-background ${accountMenu ? 'opacity-100 translate-y-1.5' : 'opacity-0 pointer-events-none translate-y-0'} transition-all`}>
                  <li className='font-bold'>{user.data.full_name}</li>
                  <div className="flex flex-col gap-2">
                    <li><NavLink className='hover:text-surface-tint' to="/account">Mi cuenta</NavLink></li>
                    <li><NavLink className='hover:text-surface-tint' to="/account/orders">Órdenes</NavLink></li>
                  </div>
                  <li
                    className='text-error font-semibold cursor-pointer'
                    onClick={logoutMutation.mutateAsync}
                  >
                    {logoutMutation.isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
                  </li>
                </ul>
              </>
            ) : (
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
            )}
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