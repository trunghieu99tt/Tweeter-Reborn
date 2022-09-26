import { EAuthQuery, EEndpoints, EUserQuery } from '@constants';
import { ILogin, IUser } from '@type/user.type';
import client from 'api/client';
import { UserModel } from 'models/user.model';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAuthService = () => {
  const queryClient = useQueryClient();

  const login = async (
    input: ILogin,
  ): Promise<{
    accessToken: string;
    user: IUser;
  }> => {
    try {
      const response = await client.post(`${EEndpoints.Auth}/signin`, input);
      const { accessToken, user } = response?.data;
      const userModel = new UserModel(user);

      return {
        accessToken,
        user: userModel.getData(),
      };
    } catch (error) {
      console.error(`${login.name} error`);
    }

    return null;
  };

  const register = async (input: any) => {
    try {
      const response = await client.post(`${EEndpoints.Auth}/signup`, input);
      return response?.data?.accessToken || '';
    } catch (error) {
      console.error(`${register.name} error`);
    }
  };

  const refreshGetMe = async () => {
    await queryClient.invalidateQueries([EUserQuery.GetMe]);
  };

  const logout = async () => {
    try {
      await client.post(`${EEndpoints.Auth}/logout`);
    } catch (error) {
      console.error(`${logout.name} error`);
    }
  };

  const loginMutation = useMutation([EAuthQuery.Login], login);
  const registerMutation = useMutation([EAuthQuery.Register], register);
  const logoutMutation = useMutation([EAuthQuery.Logout], logout);

  return {
    logout,
    refreshGetMe,
    logoutMutation,
    loginMutation,
    registerMutation,
  };
};
