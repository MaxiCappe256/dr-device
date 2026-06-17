import Navbar from '../ui/shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../ui/Footer.jsx';

function MainLayout() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer/>
        </>
    )
}

export default MainLayout