import React, {useState, useEffect, useId} from 'react'
import { BarChart, Users, FileText, Settings, Plus, Edit, Trash } from 'lucide-react'
import ClientService from "../service/ClientService.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {
    const [clients, setClients] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingClient, setEditingClient] = useState(null)
    const [newClient, setNewClient] = useState({ clientName: '', redirectUris: '' })
    const [newClientInfo, setNewClientInfo] = useState(null)
    const [showSecret, setShowSecret] = useState(false)
    const [copiedId, setCopiedId] = useState(false)
    const [copiedSecret, setCopiedSecret] = useState(false)
    const id = useId()
    const navigate = useNavigate();
    const isLogged = useSelector(state => state.user.isLogged);

    useEffect(() => {
        async function showClients() {
            const response = await ClientService.showClients()
            if (response.status === 200) {
                console.table(response.data)
                setClients(response.data)
            } else {
                console.error("ClientList :: useEffect :: error", clients)
            }
        }
        if (localStorage.getItem("token") != null) {
            showClients();
        } else {
            navigate("/login")
        }
    }, [])

    const handleAddClient = () => {
        // TODO: Implement API call to add client

        ClientService.createClient(newClient).then(r => r);

        setClients([...clients, { id: clients.length + 1, ...newClient }])
        setNewClient({ clientName: '', redirectUris: '' })
        setIsModalOpen(false)
    }

    const handleEditClient = () => {
        // TODO: Implement API call to edit client
        setClients(clients.map(client => client.id === editingClient.id ? editingClient : client))
        setEditingClient(null)
        setIsModalOpen(false)
    }

    const handleDeleteClient = (id) => {
        // TODO: Implement API call to delete client
        setClients(clients.filter(client => client.id !== id))
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

                    {newClientInfo && (
                        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <Check className="h-5 w-5 text-green-400"/>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-green-700">
                                        New client created successfully! Here are the details:
                                    </p>
                                    <div className="mt-2">
                                        <p className="text-sm text-green-700">
                                            Client ID:
                                            <span className="font-mono ml-2">{newClientInfo.id}</span>
                                            <button
                                                onClick={() => copyToClipboard(newClientInfo.id, setCopiedId)}
                                                className="ml-2 text-green-600 hover:text-green-800"
                                            >
                                                {copiedId ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}
                                            </button>
                                        </p>
                                        <p className="text-sm text-green-700 mt-1">
                                            Client Secret:
                                            <span className="font-mono ml-2">
                        {showSecret ? newClientInfo.secret : '••••••••'}
                      </span>
                                            <button
                                                onClick={() => setShowSecret(!showSecret)}
                                                className="ml-2 text-green-600 hover:text-green-800"
                                            >
                                                {showSecret ? <EyeOff className="h-4 w-4"/> :
                                                    <Eye className="h-4 w-4"/>}
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(newClientInfo.secret, setCopiedSecret)}
                                                className="ml-2 text-green-600 hover:text-green-800"
                                            >
                                                {copiedSecret ? <Check className="h-4 w-4"/> :
                                                    <Copy className="h-4 w-4"/>}
                                            </button>
                                        </p>
                                    </div>
                                    <p className="text-sm text-green-700 mt-2 font-bold">
                                        Please copy and save the client secret. It will not be shown again!
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Registered Clients</h3>
                            <button
                                onClick={() => {
                                    setEditingClient(null);
                                    setIsModalOpen(true);
                                }}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Plus className="h-4 w-4 mr-2"/> Add Client
                            </button>
                        </div>
                        <div className="border-t border-gray-200">
                            <ul className="divide-y divide-gray-200">
                                {clients.map((client) => (
                                    <li key={id} className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-blue-600 truncate">{client.clientName}</p>
                                                <p className="mt-1 text-sm text-gray-500">{client.clientId}</p>
                                                {/*<p className="mt-1 text-sm text-gray-500">{client.redirectUris.map((item) => (*/}
                                                {/*    <div>*/}
                                                {/*        <span className="text-gray-900">{item}</span>*/}
                                                {/*    </div>*/}
                                                {/*))}</p>*/}
                                                <p className="mt-1 text-sm text-gray-500">{client.redirectUris}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingClient(client);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    <Edit className="h-4 w-4"/>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClient(client.clientId)}
                                                    className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    <Trash className="h-4 w-4"/>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {name: 'Total Clients', value: clients.length, icon: Users},
                            {name: 'Active Sessions', value: '56', icon: BarChart},
                            {name: 'Documents', value: '89', icon: FileText},
                            {name: 'Settings', value: '3', icon: Settings},
                        ].map((item) => (
                            <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true"/>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                                <dd>
                                                    <div
                                                        className="text-lg font-medium text-gray-900">{item.value}</div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
                     aria-modal="true">
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                             aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                              aria-hidden="true">&#8203;</span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {editingClient ? 'Edit Client' : 'Add New Client'}
                                </h3>
                                <div className="mt-2">
                                    <div className="mb-4">
                                        <label htmlFor="name"
                                               className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={editingClient ? editingClient.clientName : newClient.clientName}
                                            onChange={(e) => editingClient
                                                ? setEditingClient({...editingClient, clientName: e.target.value})
                                                : setNewClient({...newClient, clientName: e.target.value})
                                            }
                                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="redirectUri"
                                               className="block text-sm font-medium text-gray-700">Redirect URI</label>
                                        <input
                                            type="text"
                                            name="redirectUri"
                                            id="redirectUri"
                                            value={editingClient ? editingClient.redirectUris : newClient.redirectUris}
                                            onChange={(e) => editingClient
                                                ? setEditingClient({...editingClient, redirectUris: e.target.value})
                                                : setNewClient({...newClient, redirectUris: e.target.value})
                                            }
                                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={editingClient ? handleEditClient : handleAddClient}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    {editingClient ? 'Save Changes' : 'Add Client'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <footer className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">© 2023 OAuth2 Client App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}