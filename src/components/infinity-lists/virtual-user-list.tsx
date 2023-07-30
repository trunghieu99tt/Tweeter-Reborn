import React from 'react';
import UserCard from '@components/user/card';
import { DEFAULT_LIST_LIMIT, EUserQuery } from '@constants';
import { useInfinityList } from '@hooks/useInfinityList';
import { IUser } from '@type/user.type';
import useUserService from 'services/user.service';
import { VirtualInfinityList } from './virtual-infinity-list';

type Props = {
  queryKey: string;
};

const VirtualUserList = ({ queryKey }: Props) => {
  const { getPopularUsers } = useUserService();

  let queryFunction = null;
  switch (queryKey) {
    case EUserQuery.GetPopularUser:
      queryFunction = getPopularUsers(DEFAULT_LIST_LIMIT);
      break;
  }

  const {
    data: peopleData,
    isLoading,
    hasMore,
    fetchNextPage,
  } = useInfinityList<IUser>({
    queryFunction,
    queryKey,
    queryConfig: {
      limit: DEFAULT_LIST_LIMIT,
    },
  });

  return (
    <VirtualInfinityList
      Item={UserCard}
      hasNextPage={hasMore}
      isNextPageLoading={isLoading}
      loadNextPage={() => {
        fetchNextPage();
      }}
      items={peopleData}
      height={window?.innerHeight * 0.95 ?? 800}
    />
  );
};

export default VirtualUserList;
