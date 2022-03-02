import axios from 'axios'

//const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZDViNzUzYS1hMGJhLTQ0OGMtYjUxMS05M2E5YjZmNjhlMDciLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDYxOTMzNjEsImV4cCI6MTY0NjI3OTc2MX0.fnlIBbFLJzcAISU6Qlx0TLbKh62SamLqR8hYiGA-WGk"
console.log(TOKEN);

export const privateRequest = axios.create({
    baseURL: "http://localhost:8200/api/",
    headers: { token: `${TOKEN}` }
})