import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/models";
import { IUser } from "./user";
import { encriptPassoword } from "src/helpers";
import { CreateUserDto } from "./dto";

@Injectable()
export class UserService implements IUser {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const passwordHashed = await encriptPassoword(userData.password);
    userData.password = passwordHashed;

    const user = this.userRepository.create(userData);
    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }

  async findUsers(): Promise<User[]> {
    const users = await this.userRepository.find({
      select: { id: true, username: true, email: true, photo: true },
    });
    return users;
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username: username });
  }

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
}
