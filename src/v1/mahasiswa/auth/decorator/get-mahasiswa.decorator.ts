import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetMahasiswa = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const req: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      return req.user[data];
    }
    return req.user;
  },
);
