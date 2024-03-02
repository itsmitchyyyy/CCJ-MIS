import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class HttpAxiosAdapter implements HttpAdapter {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  get = (url: string, options: Object): Promise<any> => {
    return this.axios.get(url, options);
  };

  post = async (
    url: string,
    body: Object,
    options?: AxiosRequestConfig,
  ): Promise<any> => {
    return await this.axios.post(url, body, options);
  };

  put = async (url: string, body: Object): Promise<any> => {
    return await this.axios.put(url, body);
  };
}
