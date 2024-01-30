import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./input/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService { 

  protected readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async createUser(input: CreateUserDto): Promise<User> {
    const user = new User();

    if(input.password !== input.retypedPassword) throw new BadRequestException(['Password are not identical!']);

    const existingUsername = await this.userRepository.findOne({ where: { username: input.username }});
    if(existingUsername) throw new BadRequestException([`Username ${existingUsername.username} is already taken!`]);

    //const existingEmail = await this.userRepository.findOne({ where: { email:  input.profile.email }})
    //if(existingEmail) throw new BadRequestException([`Username ${existingUsername.username} is already taken!`]);

    user.username = input.username;

    return user;
  }

  public async getUser(userId: number): Promise<User>{
    return await this.userRepository.findOneBy({id: userId});
  }

  public async validateUser(username: string, password: string): Promise<User> {
    const user = await await this.userRepository.findOneBy({username: username});

    if(!user) throw new UnauthorizedException(`User ${username} not found!`);

    if(!(await bcrypt.compare(password, user.password))) throw new UnauthorizedException(`Invalid credential for user ${username}`);

    return user;
  }

}