import Modal from '@components/shared/modal';
import { BaseControlledRef } from '@type/app.type';
import { IUser } from '@type/user.type';
import { nFormatter } from '@utils/helper';
import { EFontSize, EFontWeight } from 'constants/style.constant';
import { EUserListType } from 'constants/user.constant';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import UserCard from '../card';

type Props = {
  user: IUser;
};

const InteractingUserStatistic = ({ user }: Props) => {
  const { t } = useTranslation();
  const [type, setType] = useState<EUserListType | ''>('');
  const userListModalRef = useRef<BaseControlledRef>(null);

  const [userList, modalUserListHeader] = useMemo(() => {
    let userListData: IUser[] = [];
    let modalUserListHeader = '';

    switch (type) {
      case EUserListType.Following:
        userListData = user.followers;
        modalUserListHeader = t('followers');
        break;
      case EUserListType.Followed:
        userListData = user.following;
        modalUserListHeader = t('following');
        break;
    }

    return [
      userListData.map((user: IUser) => (
        <UserCard data={user} key={`user-card-${user._id}`} />
      )),
      modalUserListHeader,
    ];
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
