import {
  AuthResponseDTO,
  LoginUserDTO,
  RegisterUserDTO,
  User,
  UserRepository,
} from '@repo/schemas';
import bcrypt from 'bcrypt';
import { thrower } from '@/plugins/errors/thrower';
import { jwtUtils } from '@/utils/jwts';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(data: RegisterUserDTO): Promise<User> {
    data.password = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create(data);
    if (!user) {
      throw thrower.exception('default', 'default');
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
  async login(data: LoginUserDTO): Promise<AuthResponseDTO> {
    if (!data.password) {
      throw thrower.exception('auth', 'invalid-credentials');
    }

    const user = await this.userRepository.login({ email: data.email });

    if (!user || !user.password) {
      throw thrower.exception('auth', 'invalid-credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw thrower.exception('auth', 'invalid-credentials');
    }

    const token = jwtUtils.generateUserToken(user);
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
