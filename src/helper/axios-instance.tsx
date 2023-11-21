import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.mercadolibre.com',
});

export default axiosInstance;
