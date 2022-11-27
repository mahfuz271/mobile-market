import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ProductLoop = ({ product }) => {
    return (<div className="col align-self-stretch">
        <div className="link-dark row rounded products me-md-1 text-decoration-none text-center">
            <div className="col-12 px-0 position-relative">
                <img src={`${product.img}`} className="rounded w-100 h-100" alt="" />
                <p className="fw-bolder prices position-absolute"><Moment fromNow>{product.created}</Moment></p>
            </div>
            <div className="col-12 align-self-center py-3 ps-4">
                <h4>{product.title}</h4>
                <div className="price d-inline">
                    <span className="act-price">${product.resale}
                    </span>
                    <div className="ms-2 d-inline">
                        <small className="dis-price">${product.price}</small>
                    </div>
                </div>
                <div className="my-3"><i className="fa fa-map-marker" aria-hidden="true"></i> {product.location}</div>
                <Link to={`/advertisement/${product._id}?booknow=true`} className="btn btn-primary">
                    Book Now <i className="fa-solid fa-arrow-right"></i>
                </Link>
            </div>
        </div>
    </div>
    );
};

export default ProductLoop;