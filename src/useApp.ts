import { ELocalStorageKey, EUserQuery, LONG_STATE_TIME } from '@constants';
import { IUser } from '@type/user.type';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Subscription } from 'rxjs';
import EventBus, { EventBusName } from 'services/event-bus';
import useNotificationService from 'services/notification.service';
import useUserService from 'services/user.service';

export const useApp = () => {
  const { getMe } = useUserService();
  const { createNotificationMutation } = useNotificationService();

  const subscription = new Subscription();

  const registerEventBus = () => {
    subscription.add(
      EventBus.getInstance().events.subscribe((event: any) => {
        if (event.type === EventBusName.Logout) {
        }
        if (event.type === EventBusName.CreateNotification) {
          createNotificationMutation.mutate(event.payload);
        }
      }),
    );
  };

  const getMeQuery = useQuery<IUser | undefined>(EUserQuery.GetMe, getMe, {
    staleTime: LONG_STATE_TIME,
    retry: 0,
    onError: () => {
      localStorage.removeItem(ELocalStorageKey.AccessToken);
    },
  });

  useEffect(() => {
    registerEventBus();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user: getMeQuery.data,
    isLoadingUser: getMeQuery.isLoading,
  };
};
