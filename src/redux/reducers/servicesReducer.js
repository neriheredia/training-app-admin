import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice
    (
        {
            name: 'services',
            initialState: {
                services: [],
                isFetching: false,
                error: false,
            },
            reducers: {
                //GET ALL USERS
                getAllServicesStart: (state) => {
                    state.isFetching = true
                    state.error = false
                },
                getAllServicesSuccess: (state, action) => {
                    state.isFetching = false
                    state.services = action.payload
                },
                getAllServicesFailure: (state) => {
                    state.isFetching = false
                    state.error = true
                },
            },
        }
    )

export const {
    getAllServicesStart,
    getAllServicesSuccess,
    getAllServicesFailure,
} = servicesSlice.actions

export default servicesSlice.reducer