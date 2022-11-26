import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import { Link, useLoaderData } from 'react-router-dom';

const Homepage = () => {
    useDocumentTitle("Mobile Market");
    let products = useLoaderData();
    const { user, brands, adlocation } = useContext(AuthContext);
    return (
        <div>
            {products.length > 0 && <>
                <div className="row mt-5">
                    <div className="col-sm-12">
                        <div className="main-heading text-center">
                            <h2>Advertised Products</h2>
                        </div>
                    </div>
                </div>
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
                            <h2>Location</h2>
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