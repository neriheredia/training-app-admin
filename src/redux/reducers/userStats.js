import { createSlice } from "@reduxjs/toolkit";

const userStats = createSlice
    (
        {
            name: 'userStats',
            initialState: {
                stats: [],
                isFetching: false,
                error: false,
            },
            reducers: {
                //GET MONTHLY USERS
                getUserStatsStart: (state) => {
                    state.isFetching = true
                    state.error = false
                },
                getUserStatsSuccess: (state, action) => {
                    state.isFetching = false
                    state.stats = action.payload
                },
                getUserStatsFailure: (state) => {
                    state.isFetching = false
                    state.error = true
                },
            },
        }
    )

export const {
    getUserStatsStart,
    getUserStatsSuccess,
    getUserStatsFailure,
} = userStats.actions

export default userStats.reducer