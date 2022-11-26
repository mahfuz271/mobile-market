import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import { toast } from 'react-toastify';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import { Link } from 'react-router-dom';

const MyProducts = () => {
    useDocumentTitle("Manage My Products");
    const { user, logOut, setLoading, loading } = useContext(AuthContext);

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + `/myproducts?email=${user?.email}`, {
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
                setProducts(data);
            })
    }, [user?.email, logOut])

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete');
        if (proceed) {
            fetch(process.env.REACT_APP_SERVER_URL + `/myproducts/${id}`, {
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
                        const remaining = products.filter(odr => odr._id !== id);
                        setProducts(remaining);
                    }
                })
        }
    }

    const handleModify = id => {
        const current = products.find(odr => odr._id === id);
        let form = document.getElementById('updateform');
        form._id.value = id;
        form.title.value = current?.title || '';
        form.comment.value = current?.comment || '';
        form.rating.value = current?.rating || '';
        if (current?.rating) {
            document.querySelectorAll('.rating_star')[current.rating - 1].click();
        }
    }

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const id = form._id.value;
        const title = form.title.value;
        const comment = form.comment.value;
        const rating = form.rating.value;

        const product = {
            title,
            comment,
            rating,
        }

        setLoading(true);
        fetch(process.env.REACT_APP_SERVER_URL + `/myproducts/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(product)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    setLoading(false);
                    return logOut();
                }
                return res.json();
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    const remaining = products.filter(odr => odr._id !== id);
                    const updated = products.find(odr => odr._id === id);
                    updated.title = title
                    updated.comment = comment
                    updated.rating = rating

                    const newproducts = [updated, ...remaining];
                    setProducts(newproducts);
                    toast('Updated successfully');
                }
                form.reset();
                setLoading(false);
                document.querySelector('#modalCloseBs')?.click();
                document.querySelector(".modal-backdrop")?.remove("show");
                document.body.classList.remove("modal-open");
            })
    }
    return (
        <div className='my-5 text-center'>
            {products.length > 0 ?
                <div className="overflow-x-auto w-full row">
                    <h2 className='mb-5'>You have {products.length} products</h2>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>
                                </th>
                                <th className='text-start'>Title</th>
                                <th>Date</th>
                                <th>Service</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                products.map(s => {
                                    return <tr key={s._id}>
                                        <th>
                                            <button onClick={() => handleDelete(s._id)} className='btn btn-danger'>X</button>
                                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleModify(s._id)} className='btn btn-info ms-2'><i className="fa fa-edit"></i></button>
                                        </th>
                                        <td className='text-start'>{s.title}</td>
                                        <td>{s?.created}</td>
                                        <td><Link to={`/services/${s.service_id}`}>Go to service</Link></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div> :
                <p className='text-center'>No products were added</p>
            }
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={handleUpdate} id="updateform">
                        <div className="modal-header">
                            <h5 className="modal-title">Update product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-start">
                            <input type="hidden" name="_id" id='_id' />
                            <div className="form-group">
                                <label className="form-label text-primary" htmlFor="title">Title</label>
                                <input className="form-control" id="title" name='title' type="text" placeholder="" required="" />
                            </div>
                            <div className="form-group mt-4">
                                <label className="form-label text-primary">Comment</label>
                                <textarea className="form-control" id='comment' name='comment' required></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" id='modalCloseBs' data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProducts;