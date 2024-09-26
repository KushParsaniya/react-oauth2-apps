import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./feature/UserSlice.js";

export const store = configureStore({
    reducer: {
        user: userSlice
    }
})