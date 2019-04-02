import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-2e665.firebaseio.com/'
});

export default instance;
