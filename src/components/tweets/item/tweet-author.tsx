import BaseSelector from '@components/shared/base-selector';
import Modal from '@components/shared/modal';
import { StyledFlex } from '@components/shared/shared-style';
import UserAvatarSmall from '@components/shared/small-avatar';
import { EFormType } from '@constants';
import { EProfileScreen } from '@pages/profile';
import { BaseControlledRef } from '@type/app.type';
import { ITweet } from '@type/tweet.type';
import { calcDiffTimeString } from '@utils/helper';
import { EFontSize, EFontWeight } from 'constants/style.constant';
import React, { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineRetweet,
} from 'react-icons/ai';
import { BiDotsVertical } from 'react-icons/bi';
import { MdReportProblem } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import useUserService from 'services/user.service';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import TweetForm from '../form';

type Props = {
  tweet: ITweet;
};

const TweetItemHeader = ({ tweet }: Props) => {
  const { t } = useTranslation();
  const { getCurrentUser } = useUserService();
  const currentUser = getCurrentUser();
  const editTweetModalRef = useRef<BaseControlledRef>(null);

  const isAuthor = currentUser?._id === tweet?.author?._id;

  const authorOptions = useMemo(() => {
    return [
      {
        value: EFormType.Update,
        label: t('tweet.update'),
        id: uuid(),
        icon: <AiOutlineEdit />,
      },
      {
        value: EFormType.Delete,
        label: t('tweet.delete'),
        id: uuid(),
        icon: <AiOutlineDelete />,
      },
    ];
  }, [t]);

  const nonAuthorOptions = useMemo(() => {
    return [
      {
        value: EFormType.Report,
        label: t('tweet.report'),
        id: uuid(),
        icon: <MdReportProblem />,
      },
    ];
  }, [t]);

  const renderTweetActionMenu = useCallback(() => {
    return (
      <StyledDropdownButton>
        <BiDotsVertical />
      </StyledDropdownButton>
    );
  }, [t]);

  const onCloseEditModal = useCallback(() => {
    editTweetModalRef.current?.show();
  }, []);

  const onOpenEditModal = useCallback(() => {
    editTweetModalRef.current?.hide();
  }, []);

  const onSelectTweetActionItem = useCallback(async (value: EFormType) => {
    switch (value) {
      case EFormType.Update:
        onOpenEditModal();
        break;
      case EFormType.Delete:
        break;
      case EFormType.Report:
        break;
    }
  }, []);

  const profileUrl = `/profile/${tweet?.author?._id}?screen=${EProfileScreen.Home}`;
  return (
    <React.Fragment>
      {isAuthor && (
        <Modal
          ref={editTweetModalRef}
          header={<h3>{t('tweet.edit')}</h3>}
          body={
            <TweetForm
              type={EFormType.Update}
              data={tweet}
              onCancel={onCloseEditModal}
            />
          }
        />
      )}
      <StyledHeader>
        {tweet?.isRetweet && tweet?.retweetedBy && (
          <StyledRetweetedBy to={`${routes.profile}/${tweet?.retweetedBy._id}`}>
            <AiOutlineRetweet /> {`${tweet?.retweetedBy.name} retweeted`}
          </StyledRetweetedBy>
        )}
        <StyledFlex align="center" justify="space-between">
          <StyledAuthorWrapper>
            <Link to={profileUrl}>
              <UserAvatarSmall user={tweet?.author} />
            </Link>
            <div>
              <Link to={profileUrl}>
                <StyledAuthorName>{tweet?.author?.name || ''}</StyledAuthorName>
              </Link>
              <StyledDateCreated>
                {(tweet?.createdAt && calcDiffTimeString(tweet?.createdAt)) ||
                  ''}
              </StyledDateCreated>
            </div>
          </StyledAuthorWrapper>
          {currentUser?._id && (
            <BaseSelector
              options={isAuthor ? authorOptions : nonAuthorOptions}
              renderValue={renderTweetActionMenu}
              onChange={onSelectTweetActionItem}
            />
          )}
        </StyledFlex>
      </StyledHeader>
    </React.Fragment>
  );
};

export default TweetItemHeader;

const StyledHeader = styled.header`
  position: relative;
`;

const StyledAuthorWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StyledAuthorName = styled.h4`
  font-weight: 600;
  font-size: 1.6rem;
`;

const StyledDateCreated = styled.p`
  color: var(--gray-4);
  font-weight: 500;
`;

const StyledDropdownButton = styled.button`
  cursor: pointer;
`;

const StyledRetweetedBy = styled(Link)`
  margin-bottom: 1rem;
  display: flex;
  font-size: ${EFontSize.Font5};
  gap: 1rem;
  align-items: center;
  font-weight: ${EFontWeight.FontWeight500};
  color: ${({ theme }) => theme.textColor2};
`;
