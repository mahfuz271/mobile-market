import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';

const DashboardLayout = () => {
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse show">
                        <div className="position-sticky sidebar-sticky py-3">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard/myorders">
                                        My orders
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard/myproducts?addproduct=true">
                                        Add A product
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard/myproducts">
                                        My Products
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard/users?buyer=true">
                                        All Buyers
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard/users">
                                        All Sellers
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard/wishlist">
                                        Wishlist
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;