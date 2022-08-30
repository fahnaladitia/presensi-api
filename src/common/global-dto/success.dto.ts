export class SuccessDto<T> {
  success = true;
  data: T;
  total: number;
}
