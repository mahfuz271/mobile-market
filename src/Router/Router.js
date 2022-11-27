import { createBrowserRouter } from "react-router-dom";
import Error from "../Components/Error/Error";
import Homepage from "../Components/Homepage/Homepage";
import Blog from "../Components/Blog/Blog";
import Main from "../Layout/Main";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Logout from "../Components/Logout/Logout";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Components/Pages/Dashboard";
import MyProducts from "../Components/Pages/MyProducts";
import Users from "../Components/Pages/Users";
import Products from "../Components/Pages/Products";
import SingleProduct from "../Components/Pages/SingleProduct";
import Wishlist from "../Components/Pages/Wishlist";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Homepage />,
                loader: () => {
                    return fetch(`${process.env.REACT_APP_SERVER_URL}/products?limit=4&advertise=true`);
                }
            },
            {
                path: "/blog",
                element: <Blog />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/logout",
                element: <PrivateRoute><Logout /></PrivateRoute>
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/category/:txt",
                element: <PrivateRoute><Products query='brand' /></PrivateRoute>
            },
            {
                path: "/location/:txt",
                element: <PrivateRoute><Products query='location' /></PrivateRoute>
            },
            {
                path: "/advertisement/:id",
                element: <PrivateRoute><SingleProduct /></PrivateRoute>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: "/dashboard/myproducts",
                element: <MyProducts />
            },
            {
                path: "/dashboard/users",
                element: <Users />
            },
            {
                path: "/dashboard/wishlist",
                element: <Wishlist />
            },
        ]
    },

    {
        path: '*',
        element: <Error />
    }
]);

export default Router;