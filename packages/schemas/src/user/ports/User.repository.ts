import { User } from '../entities';
import {
  DeleteUserDTO,
  FindUserDTO,
  LoginUserDTO,
  RegisterUserDTO,
  UpdateUserDTO,
} from './User.dto';

export interface UserRepository {
  create: (data: RegisterUserDTO) => Promise<User | undefined>;
  login: (data: LoginUserDTO) => Promise<User | undefined>;
  update: (data: UpdateUserDTO, id: FindUserDTO) => Promise<User | undefined>;
  delete: (data: DeleteUserDTO) => Promise<void>;
}
