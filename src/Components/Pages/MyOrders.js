import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    useDocumentTitle("My Orders");
    const { user, logOut, setLoading, loading } = useContext(AuthContext);

    const [list, setList] = useState([])

    const reloadList = () => {
        fetch(process.env.REACT_APP_SERVER_URL + `/MyOrders?email=${user?.email}`, {
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

    useEffect(reloadList, [user?.email, logOut]);

    return (<div className='my-5 text-center'>
        {list.length > 0 ?
            <div className="overflow-x-auto w-full row">
                <h2 className='mb-5'>You have {list.length} orders</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-start'>Product</th>
                            <th className='text-start'>Price</th>
                            <th>Payment Status</th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            list.map(s => {
                                return <tr key={s._id}>
                                    <td className='text-start'>
                                        <img src={`${s.img}`} className="rounded" alt="" width={50} />
                                        {s.title}
                                    </td>
                                    <td className='text-start'>${s.resale}</td>
                                    <th>
                                        {s?.paid == 'Paid' ? 'Paid' : <Link className='btn-sm btn btn-outline-primary' to={`/pay/${s._id}`}>Pay</Link>}
                                    </th>
                                    <th>
                                        <Link className='btn-sm btn btn-info' to={`/advertisement/${s.pid}`}>View Product</Link>
                                    </th>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div> :
            <p className='text-center'>No order found</p>
        }

    </div>
    );
};

export default MyOrders;