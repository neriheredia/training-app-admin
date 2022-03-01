import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET ALL USERS
        getUsersStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false
            state.users = action.payload
        },
        getUsersFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //DELETE USERS
        deleteUsersStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        deleteUsersSuccess: (state, action) => {
            state.isFetching = false
            state.users.splice(
                state.users.findIndex((item) => item._id === action.payload),
                1
            )
        },
        deleteUsersFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //ADD
        addUsersStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addUsersSuccess: (state, action) => {
            state.isFetching = false
            state.users = action.payload
        },
        addUsersFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //UPDATE
        updateUsersStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        updateUsersSuccess: (state, action) => {
            state.isFetching = false
            state.products[state.users.findIndex((item) => item._id === action.payload.id)] = action.payload.users
        },
        updateUsersFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
    }
})

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    deleteUsersStart,
    deleteUsersSuccess,
    deleteUsersFailure,
    addUsersStart,
    addUsersSuccess,
    addUsersFailure,
    updateUsersStart,
    updateUsersSuccess,
    updateUsersFailure
} = usersSlice.actions

export default usersSlice.reducer