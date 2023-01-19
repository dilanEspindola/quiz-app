import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/models";
import { CreateUserDto, LoginDto } from "./dto";
import { encriptPassoword, comparePassword } from "src/helpers";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const passwordHashed = await encriptPassoword(userData.password);
    userData.password = passwordHashed;

    const user = this.userRepository.create(userData);
    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }

  async findUser(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username: username });

    return user;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUsername(username);

    return user;
  }
}
