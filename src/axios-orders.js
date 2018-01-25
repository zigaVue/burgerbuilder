import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myburgerzv.firebaseio.com/'
});

export default instance;