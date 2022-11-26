import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    let inActiveClass = "nav-link px-2";
    return (
        <footer className="container-fluid mt-5 shadow">
            <footer className="py-3">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><NavLink to="/" className={inActiveClass}>Home</NavLink></li>
                    <li className="nav-item"><NavLink to="/blog" className={inActiveClass}>Blog</NavLink></li>
                </ul>
                <p className="text-center">© 2022 Mobile Market</p>
            </footer>
        </footer>
    );
};

export default Footer;