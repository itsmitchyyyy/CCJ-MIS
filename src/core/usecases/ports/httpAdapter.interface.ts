export interface HttpAdapter {
  get(url: string, config: Object): Promise<any>;
  post(url: string, body: Object): Promise<any>;
}
