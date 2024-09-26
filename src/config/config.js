    const config = {
    backendUrl: String(import.meta.env.VITE_BACKEND_URL),
    createUserUrl: String(import.meta.env.VITE_CREATE_USER_ENDPOINT),
    loginUserUrl: String(import.meta.env.VITE_LOGIN_USER_ENDPOINT),
    createClientUrl: String(import.meta.env.VITE_CREATE_CLIENT_ENDPOINT),
    showClientsUrl: String(import.meta.env.VITE_SHOW_CLIENT_ENDPOINT),
}

export default config