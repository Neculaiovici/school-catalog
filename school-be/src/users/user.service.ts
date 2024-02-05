import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreateUserDto } from "./input/create-user.dto";
import { ProfileEntity } from "./entity/profile.entity";
import * as bcrypt from "bcrypt";
import { RoleTypeEnum } from "./enum/role.enum";

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

  public getRoleEnumValue(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      try {
        const roleEnumValues = Object.keys(RoleTypeEnum)
          .filter(key => !isNaN(Number(RoleTypeEnum[key])))
          .map(key => Number(RoleTypeEnum[key]));
  
        resolve(roleEnumValues);
      } catch (error) {
        reject(error);
      }
    });
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