import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import { Link, useLoaderData } from 'react-router-dom';
import Moment from 'react-moment';

const SingleProduct = () => {
    let product = useLoaderData();
    useDocumentTitle(product.title);
    const { user } = useContext(AuthContext);
    return (
        <div className="container mt-5 mb-5">
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
                                    <div className="cart mt-4 align-items-center"> <button className="btn btn-danger text-uppercase mr-2 px-4">Book now</button> <button title='Add to wishlist' className='btn' type='button'><i className="fa fa-heart text-muted"></i></button> </div>
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
        </div>
    );
};

export default SingleProduct;