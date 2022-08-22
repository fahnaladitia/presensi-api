export class SuccessDto<T> {
  success = true;
  data: T;
  constructor(data: T) {
    this.data = data;
  }
}
