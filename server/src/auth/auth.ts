import { UserDetails } from "src/helpers";
import { User } from "src/models";

export interface IAuth {
  registerUser: (userDetails: UserDetails) => Promise<User>;
  validateUser: (username: string, password: string) => Promise<User>;
}
