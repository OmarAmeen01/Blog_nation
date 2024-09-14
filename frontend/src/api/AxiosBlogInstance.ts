import axios from 'axios';
const BlogApiUrl = import.meta.env.VITE_POST_API_URL
const axiosBlogInstance = axios.create({
  baseURL:BlogApiUrl,
  withCredentials: true, 
});

axiosBlogInstance.interceptors.response.use(
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

export default axiosBlogInstance;