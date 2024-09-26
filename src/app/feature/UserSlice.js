import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    jwt: localStorage.getItem("token"),
    isLogged: localStorage.getItem("isLoggedIn") === "true"
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSlice: (state, action) => {
            state.jwt = action.payload.jwt
            state.isLogged = true
        },
        logoutSlice: (state) => {
            state.jwt = null;
            state.isLogged = false
        }
    }
});

export default userSlice.reducer;

export const {loginSlice, logoutSlice} = userSlice.actions;