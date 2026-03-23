import {
  DeleteUserDTO,
  FindUserDTO,
  LoginUserDTO,
  RegisterUserDTO,
  UpdateUserDTO,
  UserRepository,
} from '@repo/schemas';
import { prisma } from '@/config/prisma';
export class PrismaUserRepository implements UserRepository {
  async create(data: RegisterUserDTO) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
  async login(data: LoginUserDTO) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return;
    }
    return user;
  }

  async update(data: UpdateUserDTO, id: FindUserDTO) {
    return prisma.user.update({
      where: {
        id: id.id,
      },
      data,
    });
  }
  async delete(data: DeleteUserDTO) {
    prisma.user.delete({
      where: {
        id: data.id,
      },
    });
  }
}
