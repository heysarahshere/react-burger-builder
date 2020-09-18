import axios from 'axios';

const intance = axios.create({
    baseURL: 'https://burger-builder-b2cc9.firebaseio.com/'
})

export default intance;