import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Headers = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.rawHeaders;
  },
);
