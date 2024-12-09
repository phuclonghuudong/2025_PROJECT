import axios from "axios";
import queryString from "query-string";
import NProgress, { trickle } from "nprogress";
const baseURL = "http://localhost:8080";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 5000,
});
const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  config.headers = {
    Authorization: "",
    Accept: "application/json",
    ...config.headers,
  };
  return { ...config, data: config.data ?? null };
});

axiosClient.interceptors.response.use(
  function (response) {
    NProgress.done();

    return response?.data ? response.data : response;
  },
  function (error) {
    if (error?.response?.data) return error?.response?.data;

    return Promise.reject(error);
  }
  // (res) => {
  //   if (res.data && res.status >= 200 && res.status < 300) {
  //     return res.data;
  //   } else {
  //     return Promise.reject(res.data);
  //   }
  // },
  // (error) => {
  //   const { response } = error;
  //   return Promise.reject(response.data);
  // }
);

export default axiosClient;

// import axios from "axios";
// import NProgress, { trickle } from "nprogress";

// NProgress.configure({
//   showSpinner: false,
//   trickleSpeed: 5000,
// });
// const instance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
// });
// instance.defaults.withCredentials = true;

// instance.interceptors.response.use(
//   function (config) {
//     NProgress.start();

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   function (response) {
//     NProgress.done();

//     return response?.data ? response.data : response;
//   },
//   function (error) {
//     if (error?.response?.data) return error?.response?.data;

//     return Promise.reject(error);
//   }
// );

// export default instance;
