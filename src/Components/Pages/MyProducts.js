import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import { toast } from 'react-toastify';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

const MyProducts = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let location = useLocation()
    const imgHostKey = process.env.REACT_APP_imgbb_key;

    useDocumentTitle("Manage My Products");
    const { adlocation, user, logOut, setLoading, loading, brands } = useContext(AuthContext);

    const [products, setProducts] = useState([])

    const reloadProducts = () => {
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
    }

    useEffect(reloadProducts, [user?.email, logOut]);

    useEffect(() => {
        if (searchParams.get("addproduct")) {
            document.querySelector('.add_product').click();
            let form = document.getElementById('updateform');
            form.querySelector(".modal-title").innerHTML = "Add Product";
            form.reset();
            form._id.value = 'new';
        }
    }, [location])

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
        form.querySelector(".modal-title").innerHTML = "Edit Product";

        form._id.value = id;
        for (let k in current) {
            let inp = form.querySelector("[name='" + k + "']");
            if (inp) {
                inp.value = current[k] || '';
            }

        }
    }
    const saveDetailsToServer = (status, product, form) => {
        fetch(process.env.REACT_APP_SERVER_URL + `/myproducts`, {
            method: 'POST',
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
                toast('successfully saved');
                if (!status) {
                    setSearchParams("");
                    form.reset();
                    setLoading(false);
                    document.querySelector('#modalCloseBs')?.click();
                    document.querySelector(".modal-backdrop")?.remove("show");
                    document.body.classList.remove("modal-open");
                } else {
                    reloadProducts();
                }
            })
    }
    const updateDetails = (data, form = false) => {
        data.append('email', user.email);
        let product = Object.fromEntries(data);
        let status = form == false;

        setLoading(!status);

        if (product.imagefile.name) {
            let formdata = new FormData();
            formdata.append('image', product.imagefile);
            delete product.imagefile;
            fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
                method: 'POST',
                body: formdata
            })
                .then(res => {
                    return res.json();
                })
                .then(imgdata => {
                    if (imgdata.success) {
                        product.img = imgdata.data.url;
                        saveDetailsToServer(status, product, form);
                    }
                })
        } else {
            delete product.imagefile;
            saveDetailsToServer(status, product, form);
        }
    }
    const handleSubmit = event => {
        event.preventDefault();
        let data = new FormData(event.target);
        updateDetails(data, event.target);
    }
    const handleStatusChange = id => {
        const current = products.find(odr => odr._id === id);
        let data = new FormData();
        data.append('_id', id);
        data.append('advertise', (current.status == 'Yes' ? 'No' : 'Yes'));
        updateDetails(data);
    }
    return (
        <div className='my-5 text-center'>
            <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='d-none add_product'>add product</button>
            {products.length > 0 ?
                <div className="overflow-x-auto w-full row">
                    <h2 className='mb-5'>You have {products.length} products</h2>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className='text-start'>Title</th>
                                <th>Price</th>
                                <th>Resale</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Advertise</th>
                                <th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                products.map(s => {
                                    return <tr key={s._id}>
                                        <td className='text-start'>{s.title}</td>
                                        <td className='text-start'>${s.price}</td>
                                        <td className='text-start'>${s?.resale}</td>
                                        <td>{s?.created}</td>
                                        <td>
                                            {s?.status}
                                        </td>
                                        <td>
                                            {s?.status == 'Unsold' && <button type='button' onClick={() => handleStatusChange(s._id)} className='btn-sm btn btn-outline-primary mx-2'>{s?.advertise || 'No'}</button>}
                                        </td>
                                        <th>
                                            <Link className='btn-sm btn btn-info me-2' to={`/advertisement/${s._id}`}>View</Link>
                                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleModify(s._id)} className='btn-sm btn btn-info mx-2'><i className="fa fa-edit"></i></button>
                                            <button onClick={() => handleDelete(s._id)} className='btn-sm btn btn-danger'>X</button>
                                        </th>
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
                    <form encType="multipart/form-data" className="modal-content" onSubmit={handleSubmit} id="updateform">
                        <div className="modal-header">
                            <h5 className="modal-title">Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-start">
                            <input type="hidden" name="_id" />
                            <div className="form-group">
                                <label className="form-label text-primary">Title</label>
                                <input className="form-control" name='title' type="text" required />
                            </div>
                            <div className="form-group mt-4">
                                <label className="form-label text-primary text-capitalize">price</label>
                                <input className="form-control" name='price' type="number" required />
                            </div>
                            <div className="form-group mt-4">
                                <label className="form-label text-primary text-capitalize">resale</label>
                                <input className="form-control" name='resale' type="number" required />
                            </div>
                            <div className="form-group mt-4">
                                <label className="form-label text-primary text-capitalize">mobile number</label>
                                <input className="form-control" name='mobile_number' type="number" required />
                            </div>
                            <div className="form-group mt-4">
                                <label className="form-label text-primary">Description</label>
                                <textarea className="form-control" name='description' required></textarea>
                            </div>
                            <div className="form-group mt-4">
                                <label className="form-label text-primary text-capitalize">Year of purchase</label>
                                <input className="form-control" name='year_of_purchase' type="number" required="" />
                            </div>
                            <div className="form-group mt-4">
                                <select className="form-select" name='brand' required>
                                    <option value="">Brand</option>
                                    {
                                        brands.map((s, i) => {
                                            return <option key={i}>{s.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group mt-4">
                                <select className="form-select" name='location' required>
                                    <option value="">Location</option>
                                    {
                                        adlocation.map((s, i) => {
                                            return <option key={i}>{s}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group my-4">
                                <select className="form-select" name='condition' required>
                                    <option value="">Condition</option>
                                    <option value="Excellent">Excellent</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Image</label>
                                <input className="form-control" name='imagefile' type="file" id="formFile" />
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