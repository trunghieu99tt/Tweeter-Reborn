import { DEFAULT_LIST_LIMIT, EUserQuery } from '@constants';
import { useInfinityList } from '@hooks/useInfinityList';
import { IUser } from '@type/user.type';
import useUserService from 'services/user.service';
import React from 'react';
import UserCardSkeleton from '@components/user/card/skeleton';
import UserCard from '@components/user/card';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  queryKey: string;
};

const InfinityUserList = ({ queryKey }: Props) => {
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
    <React.Fragment>
      {isLoading && peopleData.length === 0 && <UserCardSkeleton />}
      <InfiniteScroll
        dataLength={peopleData.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={<UserCardSkeleton />}
      >
        {peopleData?.map((user: IUser) => (
          <UserCard user={user} key={`infinity-user-list-${user._id}`} />
        ))}
      </InfiniteScroll>
    </React.Fragment>
  );
};

export default InfinityUserList;
