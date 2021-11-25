import axios, { AxiosRequestConfig } from 'axios';

interface RequestConfig extends AxiosRequestConfig {
  params?: any;
}

// 添加请求拦截器
axios.interceptors.request.use((request: RequestConfig) => {
  // 默认请求头
  request.headers['X-Requested-With'] = 'XMLHttpRequest';
  // 类似 jquery cache false
  if ((request.method || '').toLowerCase() === 'get') {
    Object.assign(request.params, { _t: Date.now() });
  }
  return request;
});

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
axios.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  async err => {
    return Promise.reject(err);
  }
);

export default class HttpHelper {
  /**
   * get
   * @param uri 请求链接
   * @param params 参数
   */
  static async get<T>(uri: string, params: any = {}, config?: AxiosRequestConfig<any>): Promise<T> {
    return axios.get<T>(uri, { ...config, params }).then(res => res.data);
  }

  /**
   * post
   * @param uri 请求链接
   * @param data 参数
   */
  static async post<T>(uri: string, data: any = {}, config?: AxiosRequestConfig<any>): Promise<T> {
    return axios.post<T>(uri, data, config).then(res => res.data);
  }
}
