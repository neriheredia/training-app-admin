import axios from 'axios'
export const baseUrlDev = axios.create({
    baseURL: "https://training-app-back-end.herokuapp.com/api/"
})