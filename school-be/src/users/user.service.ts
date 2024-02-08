import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreateUserDto } from "./input/create-user.dto";
import { ProfileEntity } from "../profile/entity/profile.entity";
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from "./input/update-user.dto";

@Injectable()
export class UserService { 

  protected readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>
  ) {}

  public async getAllUsers(): Promise<UserEntity[]> {
    return this.baseQuery().getMany();
  }

  public async getUserById(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne({where: {id: userId}});
  }

  public async getUserWithProfile(userId: number): Promise<UserEntity | undefined> {
    const user = this.userAndProfileQuery(userId).getOne();
    if(user) {
      return user;
    } 
    else {
      throw new Error('Profile not found')
    }
  }

  public async getUserByUsername(userName: string): Promise<UserEntity> {    
    return await this.userRepository.findOneBy({username: userName});
  }

  public async createUser(input: CreateUserDto): Promise<UserEntity | undefined> {
    const user = new UserEntity();
    const profile = new ProfileEntity();

    if(input.password !== input.retypedPassword) throw new BadRequestException(['Password are not identical!']);

    const existingUsername = await this.userRepository.findOne({ where: { username: input.username }});
    if(existingUsername) throw new BadRequestException([`Username ${existingUsername.username} is already taken!`]);

    const existingEmail = await this.userRepository.findOne({ where: { profile: { email:  input.profile.email }}});
    if(existingEmail) throw new BadRequestException([`Username ${existingUsername.username} is already taken!`]);

    user.username = input.username;
    user.password = await bcrypt.hash(input.password, 10);
    user.role = input.role;

    profile.firstname = input.profile.firstname;
    profile.lastname = input.profile.lastname;
    profile.email = input.profile.email;
    profile.age = input.profile.age;
    profile.profileAvatar = input.profile.profileAvatar;
    
    user.profile = profile;

    return {
      ...(await this.userRepository.save(user))
    }
  }

  public async updateUserPassword(userDto: UpdateUserDto, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({where: {username: userDto.username}});
    if(!user) throw new BadRequestException('User not found!');

    user.password = await bcrypt.hash(password, 10);

    return await this.userRepository.save(user);
  }

  private baseQuery(): SelectQueryBuilder<UserEntity> {
    const userQuery = this.userRepository
      .createQueryBuilder('u')
      .orderBy('u.id', 'ASC')
    return userQuery
  }

  private userAndProfileQuery(userId: number): SelectQueryBuilder<UserEntity> {
    const userQuery = this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.profile', 'profile')
      .where('u.id = :userId', {userId})
    return userQuery;
  }

}