type FetchAccountDetailsResponse = {
  id: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  username: string;
  profile_picture: string;
  access_type: string;
  status: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

type ProfileDetail = {
  id: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  profilePicture: string;
  username: string;
  accessType?: string;
  status?: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type UpdateAccountDetails = {
  first_name: string;
  last_name: string;
  contact_number: string;
  email: string;
  profile_picture?: File;
};

type CreateAccountDetails = {
  first_name: string;
  last_name: string;
  contact_number: string;
  email: string;
  username: string;
  password: string;
  profile_picture?: File;
};
