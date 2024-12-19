import axios from "axios";
export const API = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

export const setAuthToken = (token?: string) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// export const axiosRequest = async (
//   url: string,
//   method: string,
//   body: any,
//   header: object
// ) => {
//   var config = {
//     method,
//     url,
//     headers: { ...header },
//     data: body,
//   };

//   const response = await axios(config);
//   return response.data;
// };
