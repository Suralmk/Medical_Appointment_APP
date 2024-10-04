import axios from 'axios'

axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: 'http://192.168.1.5:8000/api/'
})

export default api
