import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserEntity } from "src/users/entity/user.entity";

export const getCurrentUserByContext = (context: ExecutionContext): UserEntity => {
  if (context.getType() === 'http') {
    const request = context.switchToHttp().getRequest();
    return request.body;
  }
  return null;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getCurrentUserByContext(context),
);