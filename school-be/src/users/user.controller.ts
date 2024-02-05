import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./input/create-user.dto";
import JwtAuthGuard from "src/auth/guard/jwt-auth.guard";
import { RoleTypeEnum } from "./enum/role.enum";

@Controller('user')
@SerializeOptions({strategy: 'excludeAll'})
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseIntPipe) userId: number) {
    const user = await this.userService.getUserById(userId);
    if(user.role == RoleTypeEnum.Admin || user.role == RoleTypeEnum.Teacher)
      return user;

    throw new BadRequestException([`Your account: ${user.username} with role "${RoleTypeEnum[user.role]}" is not allowed!`]);
  }

  @Get('role-enum')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getRoleEnumValues(): Promise<number[]> {
    return this.userService.getRoleEnumValue();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() input: CreateUserDto) {
    return await this.userService.createUser(input)
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async update() {

  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async delete() {

  }
}