import {AuthorityModel} from './models';

export interface MessageResponse extends Response {
  readonly 'language'?: number;
}

export interface Response {
  readonly 'message'?: string;
  readonly 'success'?: boolean;
}


export interface UserEntity {
  message: string;
  success: boolean;
  token: string;
  username: string;
  userId: null;
  email: string;
  authorities: Array<AuthorityModel>;
}
