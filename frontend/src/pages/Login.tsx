import { zodResolver } from '@hookform/resolvers/zod';
import { LoginUserDTO, LoginUserDTOSchema } from '@repo/schemas';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput } from '@/atoms';
import { api } from '@/services/api';

export function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginUserDTO>({
    resolver: zodResolver(LoginUserDTOSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginUserDTO) => api.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      navigate('/', { replace: true });
    },
    onError: () => {
      setError('root', { message: 'Usuario o contraseña incorrectos' });
    },
  });

  const onSubmit = (data: LoginUserDTO) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-neutral-800 p-10 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-200">
            Welcome
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Log in to manage and track your notes
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <TextInput
              label="Email"
              placeholder="admin"
              className="flex justify-between"
              error={errors.email?.message}
              {...register('email')}
            />

            <TextInput
              label="Password"
              type="password"
              placeholder="••••••••"
              className="flex justify-between"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          {errors.root && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 text-center">
              {errors.root.message}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full py-2.5"
            isLoading={loginMutation.isPending}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
