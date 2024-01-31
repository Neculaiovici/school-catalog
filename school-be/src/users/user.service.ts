import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreateUserDto } from "./input/create-user.dto";
import { Profile } from "./entity/profile.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService { 

  protected readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getAllUsers(): Promise<User[]> {
    return this.baseQuery().getMany();
  }

  public async getUserById(userId: number): Promise<User> {
    return await this.userRepository.findOne({where: {id: userId}});
  }

  public async getUserByUsername(userName: string): Promise<User> {    
    return await this.userRepository.findOneBy({username: userName});
  }

  public async createUser(input: CreateUserDto): Promise<User | undefined> {
    const user = new User();
    user.profile = new Profile();
    const currentDateTimeString = new Date();

    if(input.password !== input.retypedPassword) throw new BadRequestException(['Password are not identical!']);

    const existingUsername = await this.userRepository.findOne({ where: { username: input.username }});
    if(existingUsername) throw new BadRequestException([`Username ${existingUsername.username} is already taken!`]);

    const existingEmail = await this.userRepository.findOne({ where: { profile: { email:  input.profile.email }}});
    if(existingEmail) throw new BadRequestException([`Username ${existingUsername.username} is already taken!`]);

    user.createdAt = currentDateTimeString;
    user.username = input.username;
    user.password = await this.hashPassword(input.password);
    user.role = input.role;

    user.profile.firstName = input.profile.firstName;
    user.profile.lastName = input.profile.lastName;
    user.profile.email = input.profile.email;
    user.profile.age = input.profile.age;
    user.profile.profileAvatar = input.profile.profileAvatar;
    user.profile.createdAt = currentDateTimeString;

    return {
      ...(await this.userRepository.save(user))
    }
  }

  public async updateUser(): Promise<User> {
    return ;
  }

  public async deleteUser(): Promise<User> {
    return ;
  }

  public baseQuery(): SelectQueryBuilder<User> {
    const userQuery = this.userRepository
      .createQueryBuilder('u')
      .orderBy('u.id', 'ASC')
    return userQuery
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

}