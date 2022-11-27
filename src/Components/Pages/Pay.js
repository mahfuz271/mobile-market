
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Pay = () => {
    const { oid } = useParams();
    useDocumentTitle("Pay");
    const { logOut } = useContext(AuthContext);

    const orderGet = async () => {
        return await fetch(`${process.env.REACT_APP_SERVER_URL}/order/${oid}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                return logOut();
            }
            return res.json();
        })

    }
    const { data: order = false, refetch } = useQuery({ queryKey: ['order'], queryFn: orderGet })

    return (
        <div>
            <h2>Pay ${order.resale} for {order.title} </h2>
            <div className='col-md-6 my-5'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        order={order}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Pay;