import React from 'react';
import { UserIcon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import userService from "../service/UserService.js";
import { useDispatch, useSelector } from "react-redux";
import { logoutSlice } from "../app/feature/UserSlice.js";

export default function Navbar() {
    const isLogged = useSelector(state => state.user.isLogged);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onLogin = () => {
        navigate("/login");
    };

    const onLogout = () => {
        userService.logoutUser().then(() => dispatch(logoutSlice()));
        navigate("/");
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <UserIcon className="h-8 w-8 text-blue-500" />
                            <span className="ml-2 text-xl font-bold text-gray-800">OAuth2 App</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className={`${
                                    location.pathname === "/" ? "border-blue-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/clients"
                                className={`${
                                    location.pathname === "/clients" ? "border-blue-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/user"
                                className={`${
                                    location.pathname === "/user" ? "border-blue-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                Profile
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <button
                            onClick={isLogged ? onLogout : onLogin}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {isLogged ? 'Logout' : 'Login'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}