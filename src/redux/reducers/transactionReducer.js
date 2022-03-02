import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice(
    {
        name: 'transaction',
        initialState: {
            transaction: [],
            createTransaction: {},
            isFetching: false,
            error: false
        },
        reducers: {
            //GET ALL USERS
            getTransactionStart: (state) => {
                state.isFetching = true
                state.error = false
            },
            getTransactionSuccess: (state, action) => {
                state.isFetching = false
                state.transaction = action.payload
            },
            getTransactionFailure: (state) => {
                state.isFetching = false
                state.error = true
            },
            //POST TRANSACTION
            postCreateTransactionStart: (state) => {
                state.isFetching = true
            },
            postCreateTransactionSuccess: (state, action) => {
                state.isFetching = false
                state.createTransaction = action.payload
            },
            postCreateTransactionError: (state) => {
                state.isFetching = false
                state.error = true
            }
        }
    }
)

export const
    {
        getTransactionStart,
        getTransactionSuccess,
        getTransactionFailure,
        postCreateTransactionStart,
        postCreateTransactionSuccess,
        postCreateTransactionError
    } = transactionSlice.actions

export default transactionSlice.reducer