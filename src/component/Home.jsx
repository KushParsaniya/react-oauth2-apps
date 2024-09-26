import React from 'react'
import {useSelector} from "react-redux";

export default function HomePage() {

    const isLogged = useSelector(state => state.user.isLogged)

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <h1 className="text-3xl font-bold text-gray-900">Welcome to OAuth2 Client App</h1>
                        <p className="mt-4 text-lg text-gray-500">
                            This is a sample homepage for your OAuth2 client application. You can customize this content
                            and add more features as needed.
                        </p>
                        {isLogged ? (
                            <p className="mt-4 text-lg text-green-600">You are logged in!</p>
                        ) : (
                            <p className="mt-4 text-lg text-red-600">You are not logged in. Please log in to access all
                                features.</p>
                        )}
                    </div>
                </div>
            </main>

            <footer className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">© 2023 OAuth2 Client App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}