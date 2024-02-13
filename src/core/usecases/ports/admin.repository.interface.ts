export default interface AdminRepositoryInterface {
  fetchAccountDetails(): Promise<FetchAccountDetailsResponse>;
}
