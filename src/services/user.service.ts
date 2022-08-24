import { EEndpoints, EUserQuery } from '@constants';
import { IUser } from '@type/user.type';
import client from 'api/client';
import { UserModel } from 'models/user.model';
import { useQueryClient } from 'react-query';

const useUserService = () => {
  const queryClient = useQueryClient();

  const validateUser = async (username: string): Promise<IUser> => {
    const users = await client.get(EEndpoints.USERS);
    const user = users.data.find((u: IUser) => u.username === username);
    return user;
  };

  const getMe = async (): Promise<IUser | undefined> => {
    const response = await client.get(`${EEndpoints.USERS}/me`);
    console.log('response', response);

    return new UserModel(response?.data?.data).parseUser();
  };

  const getCurrentUser = (): IUser => {
    return new UserModel(
      queryClient.getQueryData(EUserQuery.GetMe),
    ).parseUser();
  };

  return {
    validateUser,
    getMe,
    getCurrentUser,
  };
};

export default useUserService;
