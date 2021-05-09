const  axios = require('axios')
let url;

if (process.env.NODE_ENV === 'development'){
    url = 'http://localhost:5000/api/'
} else {
    url = '/api'
}


const api = axios.create({
    baseURL: url
})

module.exports = api
