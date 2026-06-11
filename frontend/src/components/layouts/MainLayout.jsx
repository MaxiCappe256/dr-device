import Navbar from '../ui/shared/Navbar';
import { Outlet } from 'react-router';

function MainLayout() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout