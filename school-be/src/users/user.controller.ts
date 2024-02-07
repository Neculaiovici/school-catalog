import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./input/create-user.dto";
import JwtAuthGuard from "src/auth/guard/jwt-auth.guard";
import { RoleTypeEnum } from "./enum/role.enum";
import { GetUser } from "./user.interceptor";

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

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async userWithProfile(@GetUser() user) {
    try {
      return this.userService.getUserWithProfile(user.id);
    } catch (error) {
      throw new BadRequestException('Your account is not allowed to see the others profile!');
    }
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

  @Post()
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