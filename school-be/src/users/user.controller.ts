import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./input/create-user.dto";

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
  async findOne(@Param('id', ParseIntPipe) userId: number) {
    return await this.userService.getUser(userId);
  }

  @Post()
  async create(@Body() input: CreateUserDto) {
    return await this.userService.createUser(input)
  }

  @Patch()
  async update() {

  }

  @Delete()
  async delete() {

  }
}