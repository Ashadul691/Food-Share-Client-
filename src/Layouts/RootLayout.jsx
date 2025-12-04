import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../pages/Footer.jsx'
import LoadingPage from "../Provider/LoadingPage";
import { ToastContainer } from 'react-toastify';
const RootLayout = () => {
    const { state } = useNavigation();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
                {state === "loading" ? <LoadingPage /> : <Outlet />}    
            <Footer/>
            <ToastContainer />
        </div>
    );
};

export default RootLayout;