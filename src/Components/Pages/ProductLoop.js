import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ProductLoop = ({product}) => {
    return (<div className="col align-self-stretch">
        <div className="link-dark row rounded products me-md-1 text-decoration-none">
            <div className="col-12 px-0 position-relative">
                <img src={`${product.img}`} className="rounded w-100 h-100" alt="" />
                <p className="fw-bolder prices fs-4 position-absolute">${product.resale}</p>
            </div>
            <div className="col-12 align-self-center py-3 ps-4">
                <Moment fromNow>{product.created}</Moment>
                <h4>{product.title}</h4>
                <p>{product.description.slice(0, 150)}</p>
                <Link to={`/advertisement/${product._id}`} className="btn btn-primary">
                    View details <i className="fa-solid fa-arrow-right"></i>
                </Link>
            </div>
        </div>
    </div>
    );
};

export default ProductLoop;