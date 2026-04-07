import { configureStore } from '@reduxjs/toolkit'
import profileReducer from "../features/profile/profileSlice"
import profileUiReducer from "../features/profile/profileUiSlice"

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        profileUi: profileUiReducer
    }
})