import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import { toast } from 'react-toastify';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    useDocumentTitle("My wishlist");
    const { user, logOut, setLoading, loading } = useContext(AuthContext);

    const [list, setList] = useState([])

    const reloadList = () => {
        fetch(process.env.REACT_APP_SERVER_URL + `/wishlist?email=${user?.email}`, {
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
                setList(data);
            })
    }

    const handleDelete = (id) => {
        let data = { task: 'removed', pid: id };

        fetch(process.env.REACT_APP_SERVER_URL + `/wishlist`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut();
                }
                return res.json();
            })
            .then(data => {
                toast('successfully removed');
                reloadList();
            })
    }
    useEffect(reloadList, [user?.email, logOut]);

    return (<div className='my-5 text-center'>
        {list.length > 0 ?
            <div className="overflow-x-auto w-full row">
                <h2 className='mb-5'>You have {list.length} products in your wish list</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-start'>Title</th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            list.map(s => {
                                return <tr key={s._id}>
                                    <td className='text-start'>{s.title}</td>
                                    <th>
                                        <Link className='btn-sm btn btn-info me-2' to={`/advertisement/${s.pid}`}>View</Link>

                                        <button onClick={() => handleDelete(s.pid)} className='btn btn-danger'>X</button>
                                    </th>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div> :
            <p className='text-center'>Wishlist empty</p>
        }

    </div>
    );
};

export default Wishlist;