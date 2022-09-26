import { EEndpoints, EUserQuery } from '@constants';
import { ITweet } from '@type/tweet.type';
import { IUser } from '@type/user.type';
import { tryCatchFn } from '@utils/helper';
import { getList } from '@utils/query';
import client from 'api/client';
import { UserModel } from 'models/user.model';
import {
  QueryFunctionContext,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { IGetList } from '@type/app.type';

const useUserService = () => {
  const queryClient = useQueryClient();

  const validateUser = async (username: string): Promise<IUser> => {
    const users = await client.get(EEndpoints.User);
    const user = users.data.find((u: IUser) => u.username === username);
    return user;
  };

  const getMe = async (): Promise<IUser | undefined> => {
    const response = await client.get(`${EEndpoints.User}/me`);
    const data = new UserModel(response?.data?.data || {}).getData();
    return data;
  };

  const getCurrentUser = (): IUser => {
    return new UserModel(
      queryClient.getQueryData([EUserQuery.GetMe]),
    ).getData();
  };

  const getUser = async ({ queryKey }: QueryFunctionContext) =>
    tryCatchFn<IUser>(async () => {
      const [_, id] = queryKey;
      const response = await client.get(`${EEndpoints.User}/${id}`);
      return new UserModel(response?.data?.data).getData();
    });

  const getUserMedias =
    (limit: number) =>
    ({ pageParam, queryKey }: QueryFunctionContext) => {
      const userId = queryKey[1];
      return getList<ITweet>(
        `${EEndpoints.Tweet}/user-medias/${userId}`,
        pageParam,
        {
          limit,
        },
      );
    };

  const getPopularUsers =
    async (limit: number) =>
    ({ pageParam }: QueryFunctionContext): Promise<IGetList<IUser>> =>
      getList<IUser>(`${EEndpoints.User}/popular`, pageParam, {
        limit,
      });

  const updateUser = async ({
    userId,
    updatedUser,
  }: {
    updatedUser: Partial<IUser>;
    userId: string;
  }): Promise<IUser | void> => {
    if (!userId) return;
    const response = await client.patch(
      `${EEndpoints.User}/${userId}`,
      updatedUser,
    );
    return response?.data?.data;
  };

  const updateUserMutation = useMutation(updateUser);

  return {
    validateUser,
    getMe,
    getUser,
    getUserMedias,
    getCurrentUser,
    getPopularUsers,

    updateUserMutation,
  };
};

export default useUserService;
