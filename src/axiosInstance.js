import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
});

axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default axiosInstance;