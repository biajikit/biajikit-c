import axios, {
    type AxiosInstance,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from "axios";
import {deleteStorage, getStorage} from "@/core/publicFn";

// 扩展 axios 类型
declare module "axios" {
    interface AxiosRequestConfig {
        whiteApi?: boolean;
        isLocationHref?: boolean;
    }
}

interface CustomRequestConfig extends InternalAxiosRequestConfig {
    whiteApi?: boolean;
    isLocationHref?: boolean;
}

export const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_URL,
    timeout: 100000,
});

// 请求拦截器
service.interceptors.request.use(
    (config: CustomRequestConfig) => {
        appendHeader(config);

        if (config.isLocationHref) {
            window.location.href = `${import.meta.env.VITE_PUBLIC_API_URL}${config.url}`;
            return config;
        }

        if (
            config.data &&
            config.headers["Content-Type"] === "application/x-www-form-urlencoded"
        ) {
            config.data = JSON.stringify(config.data);
        }

        return config;
    },
    (err) => Promise.reject(err)
);

// 响应拦截器
service.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res.data.code !== 200 && res.data.msg) {
            const clearTokenList: number[] = [10000003, 10000004, 10000005, 10000006];
            if (clearTokenList.includes(res.data.code)) {
                deleteStorage("token");
                window.location.reload();
            }
        }
        return res.data;
    },
    (err) => Promise.reject(err)
);

const appendHeader = (config: CustomRequestConfig) => {
    const token = getStorage<string | null>("token");
    const locale = getStorage<string | null>("lang");

    if (!config.whiteApi) {
        config.headers["Token"] = token ?? null;
    }
    config.headers["Locale"] = locale ?? "EN";
    config.headers["Domain"] = 'http://dianpu1.biajikit.com';
    config.headers['Menu-Id'] = import.meta.env.VITE_PUBLIC_MENU_ID
};