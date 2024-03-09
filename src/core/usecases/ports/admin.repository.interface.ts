export default interface AdminRepositoryInterface {
  fetchAccountDetails(): Promise<FetchAccountDetailsResponse>;
  updateAccountDetails(
    id: string,
    data: UpdateAccountDetails,
    hasPutMethod?: boolean,
  ): Promise<FetchAccountDetailsResponse>;
  createAccount(data: CreateAccountDetails): Promise<void>;
}
