import React from 'react';
import Navbar from '../Shared/Header/Navbar';
import Footer from '../Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className=''>
            <div className='max-w-7xl mx-auto px-2 rounded'>
             <Navbar/>
             <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default Main;