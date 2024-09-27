import React, {useState, useEffect, useRef} from 'react'
import {User, Mail, Calendar, Camera} from 'lucide-react'
import userService from "../service/UserService.js";

export default function ProfilePage() {
    const [user, setUser] = useState({
        email: '',
        role: '',
        createdAt: '',
        profileImage: '/placeholder.svg?height=128&width=128'
    })
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const fileInputRef = useRef(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await userService.getUserInfo();

                if (res.status === 200) {
                    const userData = res.data;
                    setError('')
                    setUser(userData);
                } else {
                    setError('Failed to load user data. Please try again later.');
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error)
                setError('Failed to load user data. Please try again later.')
            }
        }

        fetchUserData()
    }, [])

    const handleImageClick = () => {
        fileInputRef.current.click()
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            try {
                const formData = new FormData()
                formData.append('profileImage', file)
                const updatedUser = await UserService.updateProfileImage(formData)
                setUser(prevUser => ({...prevUser, profileImage: updatedUser.profileImage}))
                setSuccess('Profile image updated successfully!')
            } catch (error) {
                console.error('Failed to update profile image:', error)
                setError('Failed to update profile image. Please try again.')
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        try {
            const updatedUser = await UserService.updateUser(user)
            setUser(updatedUser)
            setIsEditing(false)
            setSuccess('Profile updated successfully!')
        } catch (error) {
            console.error('Failed to update profile:', error)
            setError('Failed to update profile. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">User Profile</h1>

                        {error && (
                            <div
                                className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        {success && (
                            <div
                                className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                                role="alert">
                                <span className="block sm:inline">{success}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-6 flex flex-col items-center">
                                <div className="relative w-32 h-32 mb-4">
                                    <img
                                        src={user.profileImage}
                                        alt="Profile Image"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleImageClick}
                                        className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <Camera className="h-5 w-5"/>
                                    </button>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <div className="flex items-center border-b border-gray-500 py-2">
                                    <Mail className="text-gray-500 mr-2"/>
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={user.username}
                                        onChange={(e) => setUser({...user, username: e.target.value})}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                                    Role
                                </label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={user.role}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="createdAt">
                                    Member Since
                                </label>
                                <div className="flex items-center border-b border-gray-500 py-2">
                                    <Calendar className="text-gray-500 mr-2"/>
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                        type="text"
                                        id="createdAt"
                                        name="createdAt"
                                        value={new Date(user.createdAt).toLocaleDateString()}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                {isEditing ? (
                                    <>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}