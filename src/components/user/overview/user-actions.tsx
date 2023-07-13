import Button from '@components/shared/button';
import Modal from '@components/shared/modal';
import { BaseControlledRef } from '@type/app.type';
import React, { Suspense, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useUserService from 'services/user.service';
import styled from 'styled-components';

type Props = {
  userId: string;
};

const UserActions = ({ userId }: Props) => {
  const { t } = useTranslation();

  const { getCurrentUser } = useUserService();
  const currentUser = getCurrentUser();

  const editUserInfoFormRef = useRef<BaseControlledRef>(null);

  const showEditUserInfoForm = () => {
    editUserInfoFormRef.current?.show();
  };

  const onGoToChat = (userId: string) => (event: MouseEvent) => {
    // TODO: Handle go to chat function
  };

  const onReportUser = (userId: string) => (event: MouseEvent) => {
    // TODO: Handle go to chat function
  };

  const content = useMemo(() => {
    const isMe = currentUser?._id === userId;
    if (isMe) {
      return <Button onClick={showEditUserInfoForm}>{t('edit')}</Button>;
    }

    return (
      <React.Fragment>
        <Button onClick={onGoToChat}>{t('sendMessage')}</Button>
        <Button onClick={onReportUser}>{t('reportUser')}</Button>
      </React.Fragment>
    );
  }, [userId, currentUser, t]);

  return (
    <React.Fragment>
      <Suspense fallback={<div>...Loading...</div>}>
        <Modal
          header={t('editProfile')}
          body={<div>Edit profile form</div>}
          ref={editUserInfoFormRef}
          customRootStyles="top: 0;
                              left: 50%;
                              transform: translate(-50%, -25%) !important;"
        />
      </Suspense>
      <StyledRoot>{content}</StyledRoot>
    </React.Fragment>
  );
};

export default UserActions;

const StyledRoot = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 576px) {
    position: static;
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;
