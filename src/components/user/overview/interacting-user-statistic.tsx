import Modal from '@components/shared/modal';
import { BaseControlledRef } from '@type/app.type';
import { IUser } from '@type/user.type';
import { nFormatter } from '@utils/helper';
import { EFontSize, EFontWeight } from 'constants/style.constant';
import { EUserListType } from 'constants/user.constant';
import React, { Suspense, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import UserCard from '../card';
import UserCardSkeleton from '../card/skeleton';
import { VirtualInfinityList } from '@components/infinity-lists/virtual-infinity-list';

type Props = {
  user: IUser;
};

const InteractingUserStatistic = ({ user }: Props) => {
  const { t } = useTranslation();
  const [type, setType] = useState<EUserListType | ''>('');
  const userListModalRef = useRef<BaseControlledRef>(null);

  const modalUserListHeader = useMemo(() => {
    switch (type) {
      case EUserListType.Following:
        return t('followers');
      case EUserListType.Followed:
        return t('following');
    }
  }, [user, type, t]);

  const userList = useMemo(() => {
    let userListData: IUser[] = [];

    switch (type) {
      case EUserListType.Following:
        userListData = user.followers;
        break;
      case EUserListType.Followed:
        userListData = user.following;
        break;
    }

    return (
      <VirtualInfinityList
        Item={UserCard}
        hasNextPage={false}
        isNextPageLoading={false}
        loadNextPage={() => {
          return;
        }}
        items={userListData}
        height={400}
      />
    );
  }, [user, type]);

  const showUserListModal = useCallback(
    (userListType: EUserListType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setType(userListType);
        userListModalRef.current?.show();
      },
    [],
  );

  return (
    <React.Fragment>
      <Suspense fallback={<div>...Loading...</div>}>
        <Modal
          header={modalUserListHeader}
          body={userList}
          ref={userListModalRef}
        />
      </Suspense>
      <StyledButton onClick={showUserListModal(EUserListType.Followed)}>
        <span>{nFormatter(user?.following?.length || 0)}</span>
        {t('following')}
      </StyledButton>
      <StyledButton onClick={showUserListModal(EUserListType.Following)}>
        <span>{nFormatter(user?.followers?.length || 0)}</span>
        {t('follower')}
      </StyledButton>
    </React.Fragment>
  );
};

export default InteractingUserStatistic;

const StyledButton = styled.button`
  font-size: ${EFontSize.Font3};
  line-height: 1.8rem;
  color: ${({ theme }) => theme.textColor9};

  span {
    font-weight: ${EFontWeight.FontWeight600};
    color: ${({ theme }) => theme.textColor1};
    margin-right: 0.5rem;
  }
`;
