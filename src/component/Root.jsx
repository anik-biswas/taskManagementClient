import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className='bg-gradient-to-b from-[#e9edc9] to-[#e0ebc9]'>
        {/* <Navbar></Navbar> */}
        this
        <Outlet></Outlet>
        {/* <Footer></Footer> */}
    </div>
    );
};

export default Root;