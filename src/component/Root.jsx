import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Root = () => {
    return (
        <div className='bg-gradient-to-b from-[#ebf6f4] to-[#d7f5ed]'>
        <Navbar></Navbar>
        <ToastContainer></ToastContainer>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
    );
};

export default Root;