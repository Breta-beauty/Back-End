import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

export const passwordMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  console.log({
    ctx: ctx,
    args: ctx.args,
    context: ctx.context,
    info: ctx.info,
    source: ctx.source,
  });
  next();
};
