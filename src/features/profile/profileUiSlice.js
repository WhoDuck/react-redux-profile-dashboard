import { createSlice } from "@reduxjs/toolkit";

export const selectProfileUiState = (state) => state.profileUi
export const selectSearch = (state) => state.profileUi.search
export const selectRoleFilter = (state) => state.profileUi.roleFilter
export const selectSortBy = (state) => state.profileUi.sortBy
export const selectPage = (state) => state.profileUi.page

const initialState = {
    search: "",
    roleFilter: "all",
    sortBy: "followers",
    page: 1
}

const profileUiSlice = createSlice({
    name: "profileUi",
    initialState: initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
            state.page = 1
        },
        setRoleFilter: (state, action) => {
            state.roleFilter = action.payload
            state.page = 1
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
            state.page = 1
        },
        setPage: (state, action) => {
            const next = Number(action.payload)
            state.page = Number.isFinite(next) && next > 0 ? Math.floor(next) : 1
        },
        resetPage: (state) => {
            state.page = 1
        }
    }
})

export const {
    setSearch,
    setRoleFilter,
    setSortBy,
    setPage,
    resetPage
} = profileUiSlice.actions

export default profileUiSlice.reducer