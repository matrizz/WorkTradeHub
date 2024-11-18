//@ts-nocheck
import { User as UserModel } from "@prisma/client"


export type User = Omit<UserModel, "cuid">

export interface UserProps extends User {
  location: {
    city: string;
    uf: string;
    cep: string;
  };
}