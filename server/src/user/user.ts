import { User } from "src/models";
import { UserDetails } from "src/helpers/interfaces";

export interface IUser {
  createUser: (userDetails: UserDetails) => Promise<User>;
  findUsers: () => Promise<User[]>;
  findUserByUsername: (username: string) => Promise<User>;
  findUserById: (id: number) => Promise<User>;
  updateUserProfilePhoto: (
    id: number,
    photo: Express.Multer.File,
  ) => Promise<User>;
  updateUserScore: (id: number, score: number) => Promise<User>;
}
