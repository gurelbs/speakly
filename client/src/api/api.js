import axios from 'axios'
let url;

if (process.env.NODE_ENV === 'development'){
    url = 'http://localhost:5000/api/'
} else {
    url = 'https://speakly.cf/api/'
}


const api = axios.create({
    baseURL: url,
    responseType: "json"
})

export default api
