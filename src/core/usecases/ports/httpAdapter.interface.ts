import { AxiosRequestConfig } from 'axios';

export interface HttpAdapter {
  get(url: string, config: Object): Promise<any>;
  post(url: string, body: Object, options?: AxiosRequestConfig): Promise<any>;
  put(url: string, body: Object): Promise<any>;
  delete(url: string, options: AxiosRequestConfig): Promise<any>;
}
