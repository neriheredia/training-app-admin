import axios from 'axios'

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken

console.log(TOKEN);

export const privateRequest = axios.create({
    baseURL: "http://localhost:8200/api/",
    headers: { token: `${TOKEN}` }
})