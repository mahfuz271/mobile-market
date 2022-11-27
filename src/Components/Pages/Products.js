import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import { Link, useParams } from 'react-router-dom';
import Moment from 'react-moment';
import ProductLoop from './ProductLoop';

const Products = ({ query }) => {
    const { txt } = useParams();
    const [products, setProducts] = useState([])

    const reloadProducts = () => {
        fetch(process.env.REACT_APP_SERVER_URL + `/products?${query}=${txt}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setProducts(data);
            })
    }

    useEffect(reloadProducts, []);

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-sm-12">
                    <div className="main-heading text-center">
                        <h2>{txt}</h2>
                    </div>
                </div>
            </div>
            {products.length > 0 ? <>
                <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 mx-0 gy-5">
                    {products.map(c => <ProductLoop key={c._id} product={c}></ProductLoop>)}
                </div></>
                :
                <p className='text-center'>No product found</p>
            }
        </div>
    );
};

export default Products;