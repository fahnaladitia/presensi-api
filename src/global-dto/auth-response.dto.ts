export class AuthResponseDto<T> {
  success: boolean;
  data: T;
  access_token: string;
  constructor(data: T, access_token: string, success = true) {
    this.success = success;
    this.data = data;
    this.access_token = access_token;
  }
}
