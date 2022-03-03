import { createSlice } from "@reduxjs/toolkit";

const trainerStats = createSlice
    (
        {
            name: 'trainerStats',
            initialState: {
                stats: [],
                isFetching: false,
                error: false,
            },
            reducers: {
                //GET MONTHLY TRAINERS
                getTrainerStatsStart: (state) => {
                    state.isFetching = true
                    state.error = false
                },
                getTrainerStatsSuccess: (state, action) => {
                    state.isFetching = false
                    state.stats = action.payload
                },
                getTrainerStatsFailure: (state) => {
                    state.isFetching = false
                    state.error = true
                },
            },
        }
    )

export const {
    getTrainerStatsStart,
    getTrainerStatsSuccess,
    getTrainerStatsFailure,
} = trainerStats.actions

export default trainerStats.reducer