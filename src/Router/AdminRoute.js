import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);

    if (loading || isAdminLoading) {
        return <div className='text-center my-5'><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" replace></Navigate>;
};

export default AdminRoute;