import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const HeaderRequired = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request?.headers?.[data]) throw new BadRequestException(`Header \"${data}\" is required for request`);
    return data ? request?.headers?.[data] : null;
});
