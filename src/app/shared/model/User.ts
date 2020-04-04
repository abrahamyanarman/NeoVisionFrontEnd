
export interface User {
  id?: string;
  uuid?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  photoUri?: string;
  username?: string;
  access_token?: string;
  enabled?: boolean;
  accountExpired?: boolean;
  accountLocked?: boolean;
  passwordExpired?: boolean;

  authorities?: Array<Role>;

}


export interface Role {
  authority?: string;
}
