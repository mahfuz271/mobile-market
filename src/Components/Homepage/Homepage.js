import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import { Link, useLoaderData } from 'react-router-dom';
import ProductLoop from '../Pages/ProductLoop';

const Homepage = () => {
    useDocumentTitle("Mobile Market");
    let products = useLoaderData();
    const { brands, adlocation } = useContext(AuthContext);
    return (
        <div className='container-fluid'>
            {products.length > 0 && <>
                <div id="myCarousel" className="carousel slide">
                    <div className="carousel-inner">
                        <div className="carousel-item active pt-5">
                            <div className="mask flex-center">
                                <div className="container">
                                    <div className="row align-items-center">
                                        <div className="col-md-7 col-12 order-md-1 order-2">
                                            <h4>{products[0].title}</h4>
                                            <p className='desc'>
                                                {products[0].description.slice(0, 150)}
                                            </p>
                                            <div className='price'>
                                                <span className="act-price">${products[0].resale}
                                                </span>
                                                <div className="ms-2 d-inline">
                                                    <small className="dis-price">${products[0].price}</small>
                                                </div>
                                            </div>
                                            <Link to={`/advertisement/${products[0]._id}?booknow=true`}>Book Now</Link>
                                        </div>
                                        <div className="col-md-5 col-12 order-md-2 order-1">
                                            <img src={`${products[0].img}`} className="mx-auto" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
            {products.length > 1 && <>
                <div className="row mt-5">
                    <div className="col-sm-12">
                        <div className="main-heading text-center">
                            <h2>Advertised Products</h2>
                        </div>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 mx-0 gy-5">
                    {products.filter((v, i) => { return i != 0 }).map(c => <ProductLoop key={c._id} product={c}></ProductLoop>)}
                </div></>
            }
            {brands.length > 0 && <>
                <div className="row mt-5">
                    <div className="col-sm-12">
                        <div className="main-heading text-center">
                            <h2>Brands</h2>
                        </div>
                    </div>
                </div>
                <div className="row row-cols-2 row-cols-lg-6 row-cols-md-3 mb-5 mx-0 g-5">
                    {brands.map((c, i) => {
                        return (<div className="col align-self-stretch" key={i}>
                            <Link to={`/category/${c.name}`} className="link-dark row rounded brands me-md-1 text-decoration-none">
                                <div className="col-12 px-0 position-relative">
                                    <img src={`${c.img}`} className="rounded w-100 h-100" alt="" />
                                </div>
                                <div className="col-12 text-center py-3">
                                    <h4>{c.name}</h4>
                                </div>
                            </Link>
                        </div>)
                    })}
                </div></>
            }
            {adlocation.length > 0 && <>
                <div className="row mt-5">
                    <div className="col-sm-12">
                        <div className="main-heading text-center">
                            <h2>Locations</h2>
                        </div>
                    </div>
                </div><div className="row">
                    <div className="col-xs-12">
                        <div className="locations outline mx-3">
                            <div className="row">
                                {adlocation.map((c, i) => {
                                    return (<div className="col-lg-2 col-md-3 col-sm-3 col-xs-12" key={i}>
                                        <Link to={`/location/${c}`}>
                                            <i className="fas fa-map-marker-alt"></i>{c}
                                        </Link>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div></>
            }
        </div>
    );
};

export default Homepage;