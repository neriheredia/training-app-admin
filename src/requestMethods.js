import axios from 'axios'

const BASE_URL = "https://back-ecomerce.herokuapp.com/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken;

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDRhYWI3ZDUxNjliZWIyNTU5ZGIzYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NDUyMzI2MiwiZXhwIjoxNjQ0NzgyNDYyfQ.n16ops9xycRF_FJqKWbPQl9P6_7v3rspiPMAd7A0mxE"
export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
})