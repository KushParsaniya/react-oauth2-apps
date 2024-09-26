import {useEffect, useState} from "react";
import ClientService from "../service/ClientService.js";

export const ClientList = () => {

    const [clients, setClients] = useState([]);

    useEffect(() => {

        async function showClients() {
            const response = await ClientService.showClients()
            if (response.status === 200) {
                console.table(response.data);
                setClients(response.data);
            } else {
                console.error("ClientList :: useEffect :: error", clients);
            }
        }
        if (localStorage.getItem("token") != null) {
            showClients().then(r => r);
        }

    }, []);

    return (
        clients.length > 0 ? (

            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center">OAuth2 Clients</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    {clients.map((client) => (
                        <div key={client.clientId} className="bg-gray-900 p-4 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 text-white">{client.clientName}</h2>
                            <p className="text-lg mb-4 text-white">{client.clientId}</p>
                            <p className="text-lg mb-4 text-white">{client.redirectUri}</p>
                        </div>
                    ))}
                </div>
            </div>

        ) : (<h1>No clients found</h1>)
    )
}