import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';

const Header = () => {

    const { user } = useContext(AuthContext);
    let activeClassName = "nav-link px-2 link-dark active-link";
    let inActiveClass = "nav-link px-2 link-dark";

    return (
        <header className='py-3 border-bottom'>
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                    <Link to="/">
                        <img className="light-mode-item navbar-brand-item" src="/logo.png" alt="logo" height="45" />
                    </Link>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 main_menu">
                        <li><NavLink to="/" className={(({ isActive }) => isActive ? activeClassName : inActiveClass)} end>Home</NavLink></li>
                        {user ? <><li><NavLink to="/dashboard" className={(({ isActive }) => isActive ? activeClassName : inActiveClass)} end>Dashboard</NavLink></li>
                        </> : ''}
                        <li><NavLink to="/blog" className={(({ isActive }) => isActive ? activeClassName : inActiveClass)} end>Blog</NavLink></li>
                    </ul>

                    {user ? <div className="text-end d-flex mt-2 align-items-center justify-content-center">
                        <Link to="#" className="d-block link-dark text-decoration-none"><img src={(user.photoURL) ? user.photoURL : "//dummyimage.com/60x60/666/ffffff&text=No+Image"} alt={user.displayName} title={user.displayName} width="32" height="32" className="rounded-circle" /></Link>
                        <Link to="/logout" className="btn btn-outline-danger ms-3">Logout</Link>
                    </div> :
                        <div className="text-end mt-2">
                            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Sign-up</Link>
                        </div>}
                </div>
            </div>
        </header>
    );
};

export default Header;