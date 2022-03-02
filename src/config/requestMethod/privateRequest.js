import axios from 'axios'

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxODBiMjYxOC04MmJiLTRkZGYtYmRmMi0wNTQwYzJjNDg1YTgiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDYyMzIwMjMsImV4cCI6MTY0NjMxODQyM30.OmVJ2Q105aMu1mMYOYFYowkv0wguxs8loQq6CsKLjFs"
console.log(TOKEN);

export const privateRequest = axios.create({
    baseURL: "http://localhost:8200/api/",
    headers: { token: `${TOKEN}` }
})