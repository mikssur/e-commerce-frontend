import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://e-commerce-back-1v7z.onrender.com/api/v1/',
  headers: {
    Accept: 'application/json'
  }
})

export default instance
