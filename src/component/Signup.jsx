import {useState} from "react";
import {Link} from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send this data to your backend
        console.log('Login attempt:', {email, password});
        // Reset form
        setEmail('');
        setPassword('');
    };

    return (
        <div className="min-h-screen bg-gray-800 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 text-black rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 text-black rounded-md"
                                required
                            />
                        </div>
                        <button type="submit"
                                className="w-full bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300">
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        Already have account? <Link className="text-blue-400 hover:underline" to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;