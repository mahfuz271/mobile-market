import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { toast } from 'react-toastify';

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(false)
    const [loadingSave, setloadingSave] = useState(false)
    const { user, logOut } = useContext(AuthContext);

    const reloadProduct = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/products/${id}`, {
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
                setProduct(data);
            });

    }
    useDocumentTitle(product?.title);

    useEffect(reloadProduct, []);

    const handleStatusChange = (id, task) => {
        let data = { task, pid: id, title: product.title };

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
                toast('successfully ' + task);
                reloadProduct();
            })
    }
    const handleSubmit = event => {
        event.preventDefault();

        setloadingSave(true);
        let data = new FormData(event.target);
        let product = Object.fromEntries(data);

        fetch(process.env.REACT_APP_SERVER_URL + `/placeOrder`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(product)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    setloadingSave(false);
                    return logOut();
                }
                return res.json();
            })
            .then(data => {
                toast('successfully booked');
                event.target.reset();
                setloadingSave(false);
                document.querySelector('#updateform .btn-close')?.click();
                document.querySelector(".modal-backdrop")?.remove("show");
                document.body.classList.remove("modal-open");
            })
    }
    return (
        <div className="container mt-5 mb-5">
            {product ? <>
                <div className="row d-flex justify-content-center mb-5">
                    <div className="col-md-10">
                        <div className="card single">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="image_selected">
                                        <img id="main-image" src={product.img} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="product p-md-2 pt-5 p-lg-4">
                                        <div> <span className="text-uppercase text-muted brand">{product.location}</span>
                                            <h5 className="text-uppercase">{product.title}</h5>
                                            <div className="price d-flex flex-row align-items-center">
                                                <span className="act-price">${product.resale}
                                                </span>
                                                <div className="ms-2">
                                                    <small className="dis-price">${product.price}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="about mt-3 ps-3">
                                            <li><span>Brand:</span> {product.brand}</li>
                                            <li><span>Posted:</span> <Moment fromNow>{product.created}</Moment></li>
                                            <li><span>Condition:</span> {product.condition}</li>
                                            <li><span>Year Of Purchase:</span> {product.year_of_purchase}</li>
                                            <li><span>Mobile Number:</span> {product.mobile_number}</li>
                                        </ul>
                                        <div className="cart mt-4 align-items-center">
                                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" disabled={product.status=='Sold'} className="btn btn-danger text-uppercase me-2 px-4">Book now</button>
                                            {product.wishlist < 1 ?
                                                <button onClick={() => handleStatusChange(product._id, 'added')} title='Add to wishlist' className={`btn wishlist`} type='button'><i className="fa fa-heart text-muted"></i></button>
                                                :
                                                <button onClick={() => handleStatusChange(product._id, 'removed')} title='Remove from to wishlist' className={`btn wishlist btn-primary`} type='button'><i className="fa fa-heart text-muted"></i></button>
                                            }
                                        </div>
                                        <p className="m-0">
                                            <span className="author">Posted by {product.user.name} {product.user.status == 'Verified' && <i class="fa fa-check-circle"></i>}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10 row-underline"> <span className="deal-text">Specifications</span> </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10" dangerouslySetInnerHTML={{ __html: product.description.replace(/(?:\r\n|\r|\n)/g, '<br />') }}>
                    </div>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog">
                        <form encType="multipart/form-data" className="modal-content" onSubmit={handleSubmit} id="updateform">
                            <div className="modal-header">
                                <h5 className="modal-title">Book now</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body text-start">
                                <input type="hidden" name="pid" value={product._id} />
                                <div className="form-group">
                                    <label className="form-label text-primary">Title</label>
                                    <input className="form-control" name='title' type="text" readOnly value={product.title} required />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="form-label text-primary">Price</label>
                                    <input className="form-control" name='resale' type="text" readOnly value={product.resale} required />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="form-label text-primary">Name</label>
                                    <input className="form-control" name='username' type="text" readOnly value={user.displayName} required />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="form-label text-primary">Email</label>
                                    <input className="form-control" name='useremail' type="text" readOnly value={user.email} required />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="form-label text-primary">Phone</label>
                                    <input className="form-control" name='userphone' type="text" required />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="form-label text-primary">Meeting Location</label>
                                    <input className="form-control" name='meet_location' type="text" required />
                                </div>
                                <div className="modal-footer text-center">
                                    <button type="submit" className="btn btn-primary m-auto" disabled={loadingSave}>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </> :
                <div className='text-center my-5'><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>
            }
        </div>
    );
};

export default SingleProduct;