import config from "../config/config.js";
import axios from "axios";

class ClientService {
    constructor() {
    }

    async createClient({clientName, redirectUris}) {
        try {
            const createClientUrl = config.backendUrl + config.createClientUrl;

            const response = await axios.post(createClientUrl, {
                clientName,
                redirectUris: [redirectUris]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log("Client service :: createClient :: response", response);
            if (response.data.status === 201) {
                return response.data;
            } else {
                return response.data;
            }
        } catch (e) {
            console.log("Client service :: createClient :: error", e);
            return false;
        }
    }

    async showClients() {
        try {
            const showClientsUrl = config.backendUrl + config.showClientsUrl;
            const response = await axios.get(showClientsUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data.status === 200) {
                return response.data;
            } else {
                return response.data;
            }
        } catch
            (e) {
            console.error("Client service :: showClients :: error", e);
            return false;
        }
    }
}

export default new ClientService();