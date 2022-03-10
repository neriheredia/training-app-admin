import axios from 'axios'
export const baseUrlDev = axios.create({
    baseURL: "https://contra-reloj.herokuapp.com/api/"
})
