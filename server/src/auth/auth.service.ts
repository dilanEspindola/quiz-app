import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/models";
import { CreateUserDto } from "./dto";
import { encriptPassoword } from "src/helpers";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const passwordHashed = await encriptPassoword(userData.password);
    userData.password = passwordHashed;

    const user = this.userRepository.create(userData);
    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }
}
