import Button from "./Button"; 
import { useState } from "react"
import { NavLink } from "react-router"
import { UserIcon, AngleDownIcon } from '../../../utils/icons';

export default function UserMenu({ user, logoutLoading, onLogout }) {
    const [open, setOpen] = useState(false);

    return (    
        <div className="relative">
            <div onClick={() => setOpen(!open)}>
                <Button
                    variant="primary"
                    iconLeft={<UserIcon height={24} />}
                    iconRight={
                        <AngleDownIcon
                            className={`${open ? 'rotate-180' : 'rotate-0'} transition-all`}
                            height={24}
                        />
                    }
                >
                    <span className="w-36 truncate line-clamp-1">{user?.full_name}</span>
                </Button>
            </div>
            <ul className={`flex flex-col gap-4 absolute top-16 w-full p-3 rounded-lg bg-background border border-on-tertiary-fixed text-on-background text-xl ${open ? 'opacity-100 translate-y-1.5' : 'opacity-0 pointer-events-none translate-y-0'} transition-all`}>
                <li className='font-bold w-full truncate line-clamp-1'>{user?.full_name}</li>
                <div className="flex flex-col gap-2">
                    <li><NavLink className='hover:text-surface-tint' to="/account">Mi cuenta</NavLink></li>
                    <li><NavLink className='hover:text-surface-tint' to="/account/orders">Órdenes</NavLink></li>
                </div>
                <li
                    className='text-error font-semibold cursor-pointer'
                    onClick={() => onLogout()}
                >
                    {logoutLoading ? 'Cerrando sesión...' : 'Cerrar sesión'}
                </li>
            </ul>
        </div>
    )
}
