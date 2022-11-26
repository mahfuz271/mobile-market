import { createBrowserRouter } from "react-router-dom";
import Error from "../Components/Error/Error";
import Homepage from "../Components/Homepage/Homepage";
import Blog from "../Components/Blog/Blog";
import Main from "../Layout/Main";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Logout from "../Components/Logout/Logout";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Homepage />,
                loader: () => {
                    return fetch(`${process.env.REACT_APP_SERVER_URL}/services?limit=3`);
                }
            },
            {
                path: "/blog",
                element: <Blog />
            },
            {
                path: "/login",
                element: <PublicRoute><Login /></PublicRoute>
            },
            {
                path: "/logout",
                element: <PrivateRoute><Logout /></PrivateRoute>
            },
            {
                path: "/signup",
                element: <PublicRoute><Signup /></PublicRoute>
            },


            {
                path: '*',
                element: <Error />
            }
        ]
    }
]);

export default Router;