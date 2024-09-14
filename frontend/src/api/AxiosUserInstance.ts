import axios from 'axios';
const userApiUrl = import.meta.env.VITE_USER_API_URL
const axiosUserInstance = axios.create({
  baseURL:userApiUrl ,
  withCredentials: true, 
});
 

axiosUserInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
 if (error.response.status === 404) {

       console.log("404 not found")

      }
     
    }
    return Promise.reject(error);
  }
);

export default axiosUserInstance;