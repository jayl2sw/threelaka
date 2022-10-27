import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';
// const customAxios = axios.create({
//   baseURL: "http://localhost:8080/",   
//   // baseURL: "http://k7e202.p.ssafy.io/",   
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8',    
//   },
// });

// // Interceptors
// customAxios.interceptors.request.use(function (config: AxiosRequestConfig) {
//   // Do something before request is sent
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// // Add a response interceptor
// customAxios.interceptors.response.use(function (response: AxiosResponse) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   return response.data;
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error);
// });

// export default customAxios;


const customAxios = axios.create({
  baseURL: "http://localhost:8080/",   
  // baseURL: "http://k7e202.p.ssafy.io/",   
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',    
  },
});

// Interceptors
customAxios.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
   
    if (token) {
      customAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
    }
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);


function getLocalAccessToken() {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken = window.localStorage.getItem("refreshToken");
  return refreshToken;
}

function refreshToken() {
  return customAxios.post("api/v1/user/auth/refresh", {
    refreshToken: getLocalRefreshToken(),
    accessToken: getLocalAccessToken()
  });
}
// Add a response interceptor
customAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await refreshToken();
          console.log(rs)
          const { accessToken } = rs.data;
          window.localStorage.setItem("accessToken", accessToken);
          // customAxios.defaults.headers.common["x-access-token"] = accessToken;
          console.log(customAxios.defaults.headers)
          //갱신된 토큰이 들어간상태로 바로 요청이 안감
          customAxios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          return customAxios(originalConfig);
        } catch (_error) {

          alert("리프레쉬 토큰도 만료됐으니 재로그인하세요")
          // if (_error.response && _error.response.data) {
          //   return Promise.reject(_error.response.data);
          // }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);


export default customAxios;














// const customAxios = axios.create({
//   baseURL: 'http://localhost:8080/',
//   // baseURL: "http://k7e202.p.ssafy.io/",
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8',
//   },
// });

// // Interceptors
// customAxios.interceptors.request.use(
//   function (config: AxiosRequestConfig) {
//     // 요청이 전달되기 전에 작업 수행
//     try {
//       const accessToken = localStorage.getItem('accessToken')
//         ? localStorage.getItem('accessToken')
//         : null;
//       if (accessToken) {
//         console.log('이거되는중?');
//         customAxios.defaults.headers.common[
//           'Authorization'
//         ] = `Bearer ${accessToken}`;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );



// // Interceptors
// // customAxios.interceptors.request.use(
  
// //   async (config: AxiosRequestConfig) => {
// //     const originalRequest = config;
// //       let refreshToken = await getRefreshToken();
// //       let accessToken = await getToken();

// //       const tokenData: ItokenInfo = {
// //         refreshToken: refreshToken,
// //         accessToken: accessToken,
// //       };
// //       console.log("얘가잘가고있나",tokenData)

// //       const response = await (
// //         await fetch('/api/v1/user/auth/refresh', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           credentials: 'include',
// //           body: JSON.stringify(tokenData),
// //         })
// //       ).json();

// //       console.log("이렇게확인하는게 맞나",response);
// //     // 요청이 전달되기 전에 작업 수행
// //     await saveToken(response.accessToken);
// //     console.log('새 토큰 저장됌');
// //     customAxios.defaults.headers.common[
// //                 'Authorization'
// //               ] = `Bearer ${accessToken}`;
// //     try {
// //       const accessToken = localStorage.getItem('accessToken')
// //         ? localStorage.getItem('accessToken')
// //         : null;
// //       if (accessToken) {
// //         console.log('이거되는중?');
// //         customAxios.defaults.headers.common[
// //           'Authorization'
// //         ] = `Bearer ${accessToken}`;
        
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //     // Do something before request is sent
// //     return config;
// //   },
// //   function (error) {
// //     // Do something with request error
// //     return Promise.reject(error);
// //   }
// // );


// // Add a response interceptor


// function getLocalAccessToken() {
//   const accessToken = window.localStorage.getItem("accessToken");
//   return accessToken;
// }

// function getLocalRefreshToken() {
//   const refreshToken = window.localStorage.getItem("refreshToken");
//   return refreshToken;
// }

// function refreshToken() {
//   console.log("얘되나")
//   return customAxios.post("/api/v1/user/auth/refresh", {
//     accessToken: getLocalAccessToken(),
//     refreshToken: getLocalRefreshToken(),
//   });
// }

// customAxios.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;

//     if (err.response) {
//       console.log(err.response)
//       // Access Token was expired
//       if (err.response.status === 401) {
//         originalConfig._retry = true;

//         try {
//           console.log("반응")

//           const rs = await refreshToken();
//           console.log(rs)
//           console.log("아니얘는왜안됨")
//           const {accessToken} = rs.data;
//           window.localStorage.setItem("accessToken", accessToken);
//           customAxios.defaults.headers.common[
//             'Authorization'
//           ] = `Bearer ${accessToken}`;

//           return customAxios(originalConfig);
//         } catch (_error:any) {
//           if (_error.response && _error.response.data) {
//             return Promise.reject(_error.response.data);
//           }

//           return Promise.reject(_error);
//         }
//       }

//       if (err.response.status === 403 && err.response.data) {
//         return Promise.reject(err.response.data);
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// export default customAxios;
