import axios from 'axios'

axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: 'https://hospitalapi1212.pythonanywhere.com/api/'
})

export default api
