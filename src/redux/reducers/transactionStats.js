import { createSlice } from "@reduxjs/toolkit";

const transactionStats = createSlice
    (
        {
            name: 'transactionStats',
            initialState: {
                stats: [],
                isFetching: false,
                error: false,
            },
            reducers: {
                //GET MONTHLY TRANSACTIONS
                getTransactionStatsStart: (state) => {
                    state.isFetching = true
                    state.error = false
                },
                getTransactionStatsSuccess: (state, action) => {
                    state.isFetching = false
                    state.stats = action.payload
                },
                getTransactionStatsFailure: (state) => {
                    state.isFetching = false
                    state.error = true
                },
            },
        }
    )

export const {
    getTransactionStatsStart,
    getTransactionStatsSuccess,
    getTransactionStatsFailure,
} = transactionStats.actions

export default transactionStats.reducer