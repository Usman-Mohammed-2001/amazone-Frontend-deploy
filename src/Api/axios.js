import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://127.0.0.1/",


     //Deployed version of amazon server on render.com 
    baseURL: "https://amazon-api-deploy-aang.onrender.com",


});

export {axiosInstance}