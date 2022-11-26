import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import { toast } from 'react-toastify';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import useToken from '../../hooks/useToken';

const Signup = () => {
    useDocumentTitle("Signup");
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { createUser, updateUser, loading, setLoading, signInWithGoogle, signInWithGithub } = useContext(AuthContext);
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    if (token) {
        setLoading(false);
        navigate('/');
    }


    const jwt = (result, role = 'buyer') => {
        setLoginUserEmail(result.user.email);
        let currentUser = {
            email: result.user.email,
            name: result.user.displayName,
            role
        }
        fetch(process.env.REACT_APP_SERVER_URL + '/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentUser)
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                toast("Signup success!")
                navigate('/');
            });

    }


    const handleGoogleSignIn = (event) => {
        signInWithGoogle().then(jwt)
            .catch(error => { toast(error.message); setLoading(false); });
    }

    const handleGithubSignIn = (event) => {
        signInWithGithub().then(jwt)
            .catch(error => { toast(error.message); setLoading(false); });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;
        const account_type = form.account_type.value;

        setError(null);

        if (name.length < 1) {
            setError('Enter your name.');
            setLoading(false);
            return;
        }

        if (email.length < 1) {
            setError('Enter your Email.');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password should be 6 characters or more.');
            setLoading(false);
            return;
        }

        if (photoURL.length < 6) {
            setError('Enter photo URL.');
            setLoading(false);
            return;
        }

        if (account_type.length < 1) {
            setError('Select role.');
            setLoading(false);
            return;
        }

        createUser(email, password)
            .then(result => {
                updateUser(name, photoURL).then(() => {
                    form.reset();
                    jwt(result, account_type);
                })
                    .catch(error => { toast(error.message); setLoading(false); });
            })
            .catch(error => { toast(error.message); setLoading(false); });

    }

    return (
        <div className="m-auto col-md-6 mt-5">
            <h2>Create your account</h2>
            <p>See how the world’s best user experiences are created</p>
            <form className="mt-5" onSubmit={handleSubmit}>
                {error ? <p className='alert alert-danger'>{error}</p> : ''}
                <div className="form-group">
                    <label className="form-label text-primary" htmlFor="fullName">Full name</label>
                    <input className="form-control" id="fullName" type="text" name='name' placeholder="Your name" required="" />
                </div>
                <div className="form-group mt-4">
                    <label className="form-label text-primary" htmlFor="exampleFormControlInput1">Email address</label>
                    <input className="form-control" id="exampleFormControlInput1" name='email' type="email" placeholder="Exampl@email.com" required="" />
                </div>
                <div className="form-group mt-4">
                    <label className="form-label text-primary d-flex" htmlFor="inputPassword5">Password</label>
                    <div className="password-wrap position-relative">
                        <input className="form-control pe-5" id="inputPassword5" name="password" type="password" placeholder="Enter password" required="" />
                    </div>
                </div>
                <div className="form-group mt-4">
                    <label className="form-label text-primary d-flex" htmlFor="inputphotoURL">Photo URL</label>
                    <div className="password-wrap position-relative">
                        <input className="form-control pe-5" id="inputphotoURL" name="photoURL" type="text" placeholder="Enter photoURL" required="" />
                    </div>
                </div>
                <div className="form-group mt-4">
                    <label className="form-label text-primary d-flex">Account type</label>
                    <input type="radio" required="" id="user_A" name="account_type" value="seller" /> <label htmlFor="user_A">Seller</label>
                    <input type="radio" className='ms-5' required="" id="user_D" name="account_type" value="buyer" /> <label htmlFor="user_D">Buyer</label>
                </div>
                <button className="btn btn-primary w-100 mt-5 submit-btn" type="submit" disabled={loading}>Start now !</button>
                <div className="text-center my-4"><span className="mx-3 span-or text-secondary">OR</span></div>
                <button className="btn btn-outline-secondary w-100 submit-btn" type="button" onClick={handleGoogleSignIn} > <img className="me-3" src="/img/google-icon.svg" alt="Google" />Start now !</button>
                <button className="btn btn-outline-secondary goolge-signin w-100 submit-btn mt-3" type="button" onClick={handleGithubSignIn}> <img className="me-3" src="/img/GitHub-Mark-32px.png" alt="github" />Start now !</button>
                <span className="card-text mt-5 d-block text-center">Already have an account?  <Link className="text-focus" to="/login"> Login</Link></span>
            </form>
        </div>
    );
};

export default Signup;