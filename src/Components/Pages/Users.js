import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import { toast } from 'react-toastify';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

const Users = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let location = useLocation()

    useDocumentTitle("Manage Users");
    const { user, logOut, setLoading, loading, brands } = useContext(AuthContext);

    const [users, setUsers] = useState([])
    const [userRole, setUserRole] = useState(null)

    const reloadUsers = () => {
        if (userRole) {
            fetch(process.env.REACT_APP_SERVER_URL + `/users?role=${userRole}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        return logOut();
                    }
                    return res.json();
                })
                .then(data => {
                    setUsers(data);
                })
        }
    }

    useEffect(reloadUsers, [user?.email, logOut, userRole]);

    useEffect(() => {
        if (searchParams.get("buyer")) {
            setUserRole('buyer');
        } else {
            setUserRole('seller');
        }
    }, [location])

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete');
        if (proceed) {
            fetch(process.env.REACT_APP_SERVER_URL + `/users/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        return logOut();
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast('Deleted successfully');
                        const remaining = users.filter(odr => odr._id !== id);
                        setUsers(remaining);
                    }
                })
        }
    }

    return (<div className='my-5 text-center'>
        {users.length > 0 ?
            <div className="overflow-x-auto w-full row">
                <h2 className='mb-5'>You have {users.length} users</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-start'>Name</th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map(s => {
                                return <tr key={s._id}>
                                    <td className='text-start'>{s.displayName}</td>
                                    <th>
                                        <button onClick={() => handleDelete(s._id)} className='btn btn-danger'>X</button>
                                    </th>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div> :
            <p className='text-center'>No user found</p>
        }

    </div>
    );
};

export default Users;