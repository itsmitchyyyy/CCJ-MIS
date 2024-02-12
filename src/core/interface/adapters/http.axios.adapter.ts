import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import { AxiosInstance, AxiosResponse } from 'axios';

export default class HttpAxiosAdapter implements HttpAdapter {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  get = (url: string, options: Object): Promise<AxiosResponse> => {
    return this.axios.get(url, options);
  };

  post = async (url: string, body: Object): Promise<AxiosResponse> => {
    return await this.axios.post(url, body);
  };
}
