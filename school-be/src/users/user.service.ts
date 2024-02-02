import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreateUserDto } from "./input/create-user.dto";
import { ProfileEntity } from "./entity/profile.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService { 

  protected readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getAllUsers(): Promise<UserEntity[]> {
    return this.baseQuery().getMany();
  }

  public async getUserById(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne({where: {id: userId}});
  }

  public async getUserByUsername(userName: string): Promise<UserEntity> {    
    return await this.userRepository.findOneBy({username: userName});
  }

  public async createUser(input: CreateUserDto): Promise<UserEntity | undefined> {
    const user = new UserEntity();
    user.profile = new ProfileEntity();
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

  public async updateUser(): Promise<UserEntity> {
    return ;
  }

  public async deleteUser(): Promise<UserEntity> {
    return ;
  }

  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({where: {username: username}});

    if(!user) throw new UnauthorizedException(`User ${username} not found!`);

    if(!(await bcrypt.compare(pass, user.password))) throw new UnauthorizedException(`Invalid credential for user ${username}`);

    const {password, ...result } = user;

    return result;
  }

  public baseQuery(): SelectQueryBuilder<UserEntity> {
    const userQuery = this.userRepository
      .createQueryBuilder('u')
      .orderBy('u.id', 'ASC')
    return userQuery
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

}