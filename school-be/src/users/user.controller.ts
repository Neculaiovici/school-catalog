import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./input/create-user.dto";
import JwtAuthGuard from "src/auth/guard/jwt-auth.guard";

@Controller('user')
@SerializeOptions({strategy: 'excludeAll'})
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {

  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseIntPipe) userId: number) {
    return await this.userService.getUserById(userId);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() input: CreateUserDto) {
    return await this.userService.createUser(input)
  }

  @Patch()
  @UseInterceptors(ClassSerializerInterceptor)
  async update() {

  }

  @Delete()
  @UseInterceptors(ClassSerializerInterceptor)
  async delete() {

  }
}