import { NavLink } from 'react-router'
import { useAuthContext } from '../../../hooks/useAuthContext';
import Button from './Button';
import { UserIcon, AngleDownIcon } from '../../../utils/icons';

export default function Navbar() {
  const { user } = useAuthContext()
  
  const links = [
    {
      label: "Inicio",
      to: "/"
    },
    {
      label: "Características",
      to: "#features"
    },
    {
      label: "FAQ",
      to: "#faq"
    }
  ]

  return (
    <nav className="w-11/12 flex items-center justify-between auth-brand-panel rounded-xl text-white mx-auto my-2">
      <div className="flex items-center gap-2 p-5">
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
        <span className="text-2xl font-bold tracking-[-0.02em]">
          Dr. Device
        </span>
      </div>
      <ul className="w-3/4 flex justify-end gap-8 items-center text-xl bg-linear-to-l from-primary via-primary/80 to-transparent rounded-lg px-5 py-2">
        <div className="flex gap-2 items-center">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink to={link.to} className=" hover:text-primary-soft">
                {link.label}
              </NavLink>
            </li>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          {user?.data ?
            <li><Button variant="inverted" iconLeft={<UserIcon height={24}/>} iconRight={<AngleDownIcon height={24}/>} >
              {user.data.full_name}
            </Button></li>
            :
            <>
              <li className="underline hover:text-primary-soft"><NavLink to="/auth/login">Iniciar sesión</NavLink></li>
              <li><Button variant="inverted"><NavLink to="/auth/register">Crear cuenta</NavLink></Button></li>
            </>
          }
        </div>
      </ul>
    </nav>
  )
}
