
export interface UserInfo {
   id?: number;
   uuid?: string;
   firstName?: string;
   lastName?: string;
   email?: string;
   photoUri?: string;
   username?: string;
   token?: string;
   enabled?: boolean;
   accountExpired?: boolean;
   accountLocked?: boolean;
   passwordExpired?: boolean;

   authorities?: Array<Role>;

}


export interface Role {
  authority?: string;
}
