import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    const navigate = useNavigate();
    const { logOut, setLoading } = useContext(AuthContext);
    logOut().then(() => {
        navigate(-1);
    }).catch(error => { toast(error.message); setLoading(false); });
};

export default Logout;