import { createSlice } from "@reduxjs/toolkit";

const monthlyStats = createSlice
    (
        {
            name: 'stats',
            initialState: {
                stats: [],
                isFetching: false,
                error: false,
            },
            reducers: {
                //GET MONTHLY USERS
                getMonthlyStatsStart: (state) => {
                    state.isFetching = true
                    state.error = false
                },
                getMonthlyStatsSuccess: (state, action) => {
                    state.isFetching = false
                    state.stats = [...state.stats, action.payload]
                },
                getMonthlyStatsFailure: (state) => {
                    state.isFetching = false
                    state.error = true
                },
            },
        }
    )

export const {
    getMonthlyStatsStart,
    getMonthlyStatsSuccess,
    getMonthlyStatsFailure,
} = monthlyStats.actions

export default monthlyStats.reducer