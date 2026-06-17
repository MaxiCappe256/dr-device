import React from 'react'
import Navbar from '../ui/Navbar';
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