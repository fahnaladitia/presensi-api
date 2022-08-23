export class AuthResponseDto<T> {
  success = true;
  data: T;
  access_token: string;
}
