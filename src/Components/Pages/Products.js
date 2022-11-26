import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import { Link, useParams } from 'react-router-dom';

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
        <div>
            <div className="row mt-5">
                <div className="col-sm-12">
                    <div className="main-heading text-center">
                        <h2>{txt}</h2>
                    </div>
                </div>
            </div>
            {products.length > 0 ? <>
                <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 mx-0 gy-5">
                    {products.map((c) => {
                        return (<div className="col align-self-stretch" key={c._id}>
                            <div className="link-dark row rounded products me-md-1 text-decoration-none">
                                <div className="col-12 align-self-center py-3 ps-4">
                                    <h4>{c.title}</h4>
                                    <h4>{c.price}</h4>
                                    <p>{c.description.slice(0, 150)}</p>
                                    <Link to={`/products/${c._id}`} className="btn btn-primary">
                                        View details <i className="fa-solid fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>)
                    })}
                </div></>
                :
                <p className='text-center'>No products found</p>
            }
        </div>
    );
};

export default Products;