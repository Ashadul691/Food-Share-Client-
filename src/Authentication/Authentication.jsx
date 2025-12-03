import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Authentication = () => {
    return (
        <div>
            <header><Navbar></Navbar> </header>
            <main>
                <Outlet></Outlet>
            </main>
            
        </div>
    );
};

export default Authentication;