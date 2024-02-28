import { configuration } from "#/config/api";
import { getDataApi, isApiSuccess, saveCredentialCookie } from "#/utils";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { AuthApi } from "./openapi";
import { message } from "#/hooks/message";

import { CMS_POSTS_PATH, HOME_PATH, LOGIN_PATH } from "#/config/constant";


const axiosIntance = axios.create();
const authApi = new AuthApi(configuration, undefined, axiosIntance);

interface Response {
  [k: string]: any;
}

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  console.info(`[request] [${JSON.stringify(config)}]`);
    const accessToken = Cookies.get('access_token');
    console.log("accessToken:: ",accessToken)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("có accessToken")
    }
    return config;
  }
  (error: AxiosError) => Promise.reject(error)
//   return config;
// };

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  message.error(JSON.stringify(error));
  return Promise.reject(error);
};

const onResponse = async (response: AxiosResponse):  Promise<AxiosResponse<Response, Response>> => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  // history.replaceState(undefined, undefined, CMS_POSTS_PATH);
    if (response.data?.error?.code === 6) {
      const refreshToken = Cookies.get("refreshToken");
      // if (!refreshToken) {
      //   return response;
      // }
      try {
        const data = await authApi.refreshToken({ refreshToken })
        if (isApiSuccess(data)) {
          saveCredentialCookie(getDataApi(data));
          return axiosIntance(response.config);
        } else {
          history.replaceState(undefined, "", LOGIN_PATH);
          window.location.replace(LOGIN_PATH);
          return response;
        }
      } catch (error) {
        return response;
      }
    }
    return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  message.error(JSON.stringify(error));
  return Promise.reject(error);
};

axiosIntance.interceptors.request.use(onRequest, onRequestError);
axiosIntance.interceptors.response.use(onResponse, onResponseError);

export default axiosIntance;
