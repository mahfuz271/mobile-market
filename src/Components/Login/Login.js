import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import { toast } from 'react-toastify';
import useDocumentTitle from '../../Layout/useDocumentTitle';

const Login = () => {
    useDocumentTitle("Login");
    const { signIn, loading, setLoading, signInWithGoogle, signInWithGithub } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);
    const from = location.state?.from?.pathname || '/';
    
    const jwt = (result) => {
        const user = result.user;

        const currentUser = {
            email: user.email
        }

        // get jwt token
        fetch(process.env.REACT_APP_SERVER_URL + '/jwt', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentUser)
        })
            .then(res => res.json())
            .then(data => {
                // local storage is the easiest but not the best place to store jwt token
                localStorage.setItem('logged-token', data.token);
                setLoading(false);
                toast("Login success!")
                navigate(from, { replace: true });
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
    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setError(null);

        if (email.length < 1) {
            setError('Enter your Email.');
            setLoading(false);
            return;
        }

        if (password.length < 1) {
            setError('Enter password.');
            setLoading(false);
            return;
        }

        signIn(email, password)
            .then(result => {
                form.reset();
                jwt(result);
            })
            .catch(error => { toast(error.message); setLoading(false); });
    }

    return (
        <div className="m-auto col-md-6 mt-5">
            <h2>Hello ! Welcome back.</h2>
            <p>Log in with your data that you entered during Your registration.</p>
            <form className="mt-5" onSubmit={handleSubmit}>
                {error ? <p className='alert alert-danger'>{error}</p> : ''}
                <div className="form-group mt-4">
                    <label className="form-label text-primary" htmlFor="exampleFormControlInput1">Email address</label>
                    <input className="form-control" id="exampleFormControlInput1" name='email' type="email" placeholder="Exampl@email.com" required="" />
                </div>
                <div className="form-group mt-4">
                    <div className="d-flex justify-content-between">
                        <label className="form-label text-primary d-flex" htmlFor="inputPassword5">Password</label>
                        <button className="btn" type='button'>Forgot Password</button>
                    </div>
                    <div className="password-wrap position-relative">
                        <input className="form-control pe-5" id="inputPassword5" name="password" type="password" placeholder="Enter password" required="" />
                    </div>
                </div>
                <button className="btn btn-primary w-100 mt-5 submit-btn" type="submit" disabled={loading}>Start now !</button>
            </form>
            <div className="my-4 text-center"><span className="mx-3 span-or text-secondary">OR</span></div>
            <button className="btn btn-outline-secondary w-100 submit-btn" type="button" onClick={handleGoogleSignIn} > <img className="me-3" src="/img/google-icon.svg" alt="Google" />Start now !</button>
            <button className="btn btn-outline-secondary goolge-signin w-100 submit-btn mt-3" type="button" onClick={handleGithubSignIn}> <img className="me-3" src="/img/GitHub-Mark-32px.png" alt="github" />Start now !</button>
            <span className="card-text mt-5 d-block text-center">Don’t have an account? <Link className="text-focus" to="/signup"> Sign up</Link></span>
        </div>
    );
};

export default Login;