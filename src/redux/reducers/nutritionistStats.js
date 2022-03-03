import { createSlice } from "@reduxjs/toolkit";

const nutritionistsStats = createSlice
    (
        {
            name: 'nutritionistStats',
            initialState: {
                stats: [],
                isFetching: false,
                error: false,
            },
            reducers: {
                //GET MONTHLY NUTRITIONISTS
                getNutritionistsStatsStart: (state) => {
                    state.isFetching = true
                    state.error = false
                },
                getNutritionistsStatsSuccess: (state, action) => {
                    state.isFetching = false
                    state.stats = action.payload
                },
                getNutritionistsStatsFailure: (state) => {
                    state.isFetching = false
                    state.error = true
                },
            },
        }
    )

export const {
    getNutritionistsStatsStart,
    getNutritionistsStatsSuccess,
    getNutritionistsStatsFailure,
} = nutritionistsStats.actions

export default nutritionistsStats.reducer