import config from "../config/config.js";
import axios from "axios";

class UserService {
    constructor() {
    }

    async createUser({username, password}) {
        try {
            const createUserUrl = config.backendUrl + config.createUserUrl;

            const response = await axios.post(createUserUrl, {
                username,
                password
            });

            if (response.data.status === 201) {
                localStorage.setItem("token", response.data.data);
                localStorage.setItem("isLoggedIn", "true");
                return response.data;
            } else {
                return response.data;
            }
        } catch (e) {
            console.log("User service :: createUser :: error", e);
            return false;
        }
    }

    async loginUser({username, password}) {
        try {
            const loginUserUrl = config.backendUrl + config.loginUserUrl;
            console.log(username)
            const response = await axios.post(loginUserUrl, {
                username,
                password
            });

            console.table(response);
            if (response.data.status === 200) {
                localStorage.setItem("token", response.data.data);
                localStorage.setItem("isLoggedIn", "true");
                return response.data;
            } else {
                return response.data;
            }
        } catch (e) {
            console.error("User service :: loginUser :: error", e);
            return false;
        }
    }

    async logoutUser() {
        try {
            localStorage.removeItem("token");
            return "User logged out successfully";
        } catch (e) {
            console.error("User service :: logoutUser :: error", e);
            return false;
        }
    }

    async getUserInfo() {
        try {
            const getUserInfoUrl = config.backendUrl + config.getUserInfoUrl;
            const response = await axios.get(getUserInfoUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data.status === 200) {
                return response.data;
            } else {
                return response.data;
            }
        } catch (e) {
            console.error("User service :: getUserInfo :: error", e);
            return false;
        }
    }
}

export default new UserService();