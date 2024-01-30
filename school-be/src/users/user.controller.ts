import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Patch, Post, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./input/create-user.dto";
import { User } from "./user.entity";

@Controller('user')
@SerializeOptions({strategy: 'excludeAll'})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {

  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne() {

  }

  @Post()
  async create(@Body() input: CreateUserDto, user: User) {
    return await this.userService.createUser(input)
  }

  @Patch()
  async update() {

  }

  @Delete()
  async delete() {

  }
}