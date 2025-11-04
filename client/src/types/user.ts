import { AbstractBaseInterface } from "./base";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface UserInterface extends AbstractBaseInterface {
  email: string;
  role: UserRole;
  lastname: string;
  firstname: string;
  isVerified: boolean;
  phone: string | null;
}
