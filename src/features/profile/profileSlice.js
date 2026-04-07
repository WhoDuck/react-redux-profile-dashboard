import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProfilesApi } from './profileApi'

export const selectProfileState = (state) => state.profile
export const selectStatus = (state) => state.profile.status
export const selectError = (state) => state.profile.error

const profileAdapter = createEntityAdapter({
    selectId: (profile) => profile.id
})

export const fetchProfiles = createAsyncThunk(
    "profile/fetchProfiles",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchProfilesApi()
            return response
        } catch (error) {
            return rejectWithValue(error?.message || "Failed to fetch profiles")
        }
    },
    {
        condition: (_, { getState }) => {
            const { status } = getState().profile
            return status === "idle" || status === "failed"
        }
    }
)

const initialState = profileAdapter.getInitialState({
    status: "idle",
    error: null
})

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        addProfile: (state, action) => {
            profileAdapter.addOne(state, action.payload)
        },

        removeProfile: (state, action) => {
            profileAdapter.removeOne(state, action.payload)
        },

        followProfile: (state, action) => {
            const id = action.payload
            const profile = state.entities[id]
            if (profile) {
                profile.followers += 1
            }
        },

        toggleLike: (state, action) => {
            const id = action.payload
            const profile = state.entities[id]

            if (profile) {
                profile.liked = !profile.liked
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProfiles.pending, (state) => {
            state.status = "loading"
            state.error = null
        })

        .addCase(fetchProfiles.fulfilled, (state, action) => {
            state.status = "succeeded"
            profileAdapter.setAll(state, action.payload)
            state.error = null
        })

        .addCase(fetchProfiles.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload || action.error.message || "Failed to fetch profiles"
        })

    }
})

export const {
    addProfile,
    removeProfile,
    followProfile,
    toggleLike
} = profileSlice.actions

export const {
    selectAll: selectProfiles,
    selectById: selectProfileById,
    selectIds: selectProfileIds
} = profileAdapter.getSelectors(
    state => state.profile
)

export default profileSlice.reducer