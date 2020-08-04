import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-bfc7c.firebaseio.com/'
})


export default instance