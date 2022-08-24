import { ELocalStorageKey, EUserQuery, LONG_STATE_TIME } from '@constants';
import { IUser } from '@type/user.type';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { routes } from 'routes';
import { Subscription } from 'rxjs';
import EventBus, { EventBusName } from 'services/event-bus';
import useUserService from 'services/user.service';

export const useApp = () => {
  const { getMe } = useUserService();
  const navigate = useNavigate();

  const subscription = new Subscription();

  const registerEventBus = () => {
    subscription.add(
      EventBus.getInstance().events.subscribe((event: any) => {
        if (event.type === EventBusName.Logout) {
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
  const user = getMeQuery.data;

  useEffect(() => {
    registerEventBus();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!getMeQuery.isLoading) {
      if (!user._id) {
        navigate(routes.auth);
      }
    }
  }, [user, getMeQuery.isLoading]);

  return {
    user,
    isLoadingUser: getMeQuery.isLoading,
  };
};
