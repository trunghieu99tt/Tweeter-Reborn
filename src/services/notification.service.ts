import { EEndpoints, ENotificationQuery } from '@constants';
import { IPaginationParams } from '@type/app.type';
import { INotification, INotificationDTO } from '@type/notification.type';
import { tryCatchFn } from '@utils/helper';
import { getList } from '@utils/query';
import client from 'api/client';
import { QueryFunctionContext, useMutation } from '@tanstack/react-query';

const useNotificationService = () => {
  const readNotification = async (notificationIds: string[]): Promise<void> => {
    try {
      await client.patch(`${EEndpoints.Notification}/read`, {
        ids: notificationIds,
      });
    } catch (error) {
      console.error(`${readNotification.name} error`);
    }
  };

  const readNotificationMutation = useMutation(
    [ENotificationQuery.ReadNotification],
    readNotification,
  );

  const getNotifications = (input: Partial<IPaginationParams>) => {
    return ({ pageParam }: QueryFunctionContext) => {
      return getList<INotification>(EEndpoints.Notification, pageParam, {
        limit: input.limit,
      });
    };
  };

  const createNotification = (input: INotificationDTO) =>
    tryCatchFn(async () => {
      try {
        const response = await client.post(EEndpoints.Notification, input);

        return response?.data;
      } catch (error) {}
    });

  const markAsRead = async (ids: string[]) => {
    await readNotificationMutation.mutateAsync(ids);
  };

  const createNotificationMutation = useMutation(createNotification);

  return {
    readNotification,
    getNotifications,
    createNotificationMutation,
    createNotification,
    markAsRead,
  };
};

export default useNotificationService;
