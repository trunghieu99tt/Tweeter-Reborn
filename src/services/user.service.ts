import { EEndpoints, EUserQuery } from '@constants';
import { IUser } from '@type/user.type';
import client from 'api/client';
import { UserModel } from 'models/user.model';
import { useQueryClient } from 'react-query';

const useUserService = () => {
  const queryClient = useQueryClient();

  const validateUser = async (username: string): Promise<IUser> => {
    const users = await client.get(EEndpoints.User);
    const user = users.data.find((u: IUser) => u.username === username);
    return user;
  };

  const fetchMe = async (): Promise<IUser | undefined> => {
    const response = await client.get(`${EEndpoints.User}/me`);

    const data = new UserModel(response?.data?.data).getData();
    return data;
  };

  const getCurrentUser = (): IUser => {
    return new UserModel(queryClient.getQueryData(EUserQuery.GetMe)).getData();
  };

  const getPopularUsers = async (): Promise<IUser[]> => {
    try {
      const response = await client.get(`${EEndpoints.User}/popular`);
      return response.data.data.map((user: IUser) =>
        new UserModel(user).getData(),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    validateUser,
    getMe: fetchMe,
    getCurrentUser,
    getPopularUsers,
  };
};

export default useUserService;
