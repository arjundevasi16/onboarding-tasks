import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://web-clockin-clockout.onrender.com',
})

export default instance
