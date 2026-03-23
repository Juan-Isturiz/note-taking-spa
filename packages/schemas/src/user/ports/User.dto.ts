import z from 'zod';
import { UserSchema } from '../entities';

// DTO Types
export type RegisterUserDTO = z.infer<typeof RegisterUserDTOSchema>;
export type LoginUserDTO = z.infer<typeof LoginUserDTOSchema>;
export type AuthResponseDTO = z.infer<typeof AuthResponseDTOSchema>;
export type UpdateUserDTO = z.infer<typeof UpdateUserDTOSchema>;
export type FindUserDTO = z.infer<typeof FindUserDTOSchema>;
export type DeleteUserDTO = z.infer<typeof DeleteUserDTOSchema>;

// DTO
export const RegisterUserDTOSchema = UserSchema.omit({
  id: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  notes: true,
}).required({
  password: true,
});

export const LoginUserDTOSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const AuthResponseDTOSchema = z.object({
  user: UserSchema.omit({
    password: true,
    isActive: true,
  }),
  token: z.string().meta({
    description: 'User token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  }),
});

export const UpdateUserDTOSchema = UserSchema.pick({
  firstName: true,
  lastName: true,
});

export const FindUserDTOSchema = UserSchema.pick({
  id: true,
});

export const DeleteUserDTOSchema = UserSchema.pick({
  id: true,
});
