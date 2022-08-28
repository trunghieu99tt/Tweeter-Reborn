import CreateCommentForm from '@components/comment/create-comment-form';
import { shake, spin } from '@components/shared/shared-style';
import UserCard from '@components/user/user-card';
import { BaseControlledRef } from '@type/app.type';
import { ITweet } from '@type/tweet.type';
import { IUser } from '@type/user.type';
import { EBoxShadow, EFontSize, EFontWeight } from 'constants/style.constant';
import React, { memo, Suspense, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiBookmark, BiComment } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import useUserService from 'services/user.service';
import styled, { css } from 'styled-components';

const Modal = React.lazy(() => import('@components/shared/modal'));

type Props = {
  tweet: ITweet;
};

enum EUserListType {
  Liked = 'liked',
  Saved = 'saved',
  Retweeted = 'retweeted',
}

enum EInteractionButton {
  Like = 'like',
  Save = 'save',
  Comment = 'comment',
  Share = 'share',
}

const TweetInteraction = ({ tweet }: Props) => {
  const { getCurrentUser } = useUserService();
  const currentUser = getCurrentUser();

  const { t } = useTranslation();
  const userListModalRef = useRef<BaseControlledRef>(null);
  const commentFormRef = useRef<HTMLInputElement>(null);
  const [userListType, setUserListType] = useState<EUserListType>(null);

  let userListData: IUser[] = [];
  let modalUserListHeader = '';

  switch (userListType) {
    case EUserListType.Liked:
      userListData = tweet?.likes || [];
      modalUserListHeader = t('userLikedTweet');
      break;
    case EUserListType.Saved:
      userListData = tweet?.saved || [];
      modalUserListHeader = t('userSavedTweet');
      break;
    case EUserListType.Retweeted:
      userListData = tweet?.retweeted || [];
      modalUserListHeader = t('userRetweetedTweet');
      break;
  }

  const tweetLikeCount = tweet?.likes?.length || 0;
  const tweetSavedCount = tweet?.saved?.length || 0;
  const tweetRetweetCount = tweet?.retweeted?.length || 0;
  const totalTweetComments = 0;
  const retweeted =
    (currentUser?._id &&
      tweet?.retweeted?.findIndex((u: IUser) => u._id === currentUser?._id) !==
        -1) ||
    false;

  const liked =
    (currentUser?._id &&
      tweet.likes.findIndex((u: IUser) => u._id === currentUser?._id) !== -1) ||
    false;

  // current user saved this tweet or not
  const saved =
    (currentUser?._id &&
      tweet?.saved?.findIndex((u: IUser) => u._id === currentUser?._id) !==
        -1) ||
    false;

  const showUserListModal =
    (userListType: EUserListType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setUserListType(userListType);
      userListModalRef.current?.show();
    };

  const onRetweet = () => {
    // retweet tweet
  };
  const onReactTweet = () => {
    // react to tweet
  };
  const onSaveTweet = () => {
    // save tweet
  };

  const userList = useMemo(() => {
    return userListData.map((user: IUser) => {
      return <UserCard key={`user-list-card-${user._id}`} user={user} />;
    });
  }, [userListData]);

  return (
    <React.Fragment>
      <Suspense fallback={<div>...Loading...</div>}>
        <Modal
          header={modalUserListHeader}
          body={userList}
          ref={userListModalRef}
        />
      </Suspense>
      <StyledRoot>
        <StyledSummary>
          <StyledSummaryItem onClick={showUserListModal(EUserListType.Liked)}>
            {tweetLikeCount}
            {` ${t('like')}`}
          </StyledSummaryItem>
          <StyledSummaryItem>
            {totalTweetComments}
            {` ${t('comment')}`}
          </StyledSummaryItem>
          <StyledSummaryItem
            onClick={showUserListModal(EUserListType.Retweeted)}
          >
            {tweetRetweetCount} {t('retweeted')}
          </StyledSummaryItem>
          <StyledSummaryItem onClick={showUserListModal(EUserListType.Saved)}>
            {tweetSavedCount} {t('saved')}
          </StyledSummaryItem>
        </StyledSummary>

        <StyledInteractionButtonGroup>
          {/* <StyledInteractionButton
            onClick={focusOnCommentForm}
            interactionType={EInteractionButton.Comment}
          >
            <BiComment />
            <span>{t('comment')}</span>
          </StyledInteractionButton> */}
          <StyledInteractionButton
            onClick={onRetweet}
            retweeted={retweeted}
            interactionType={EInteractionButton.Share}
          >
            <FiRefreshCw />
            <span>{t('retweet')}</span>
          </StyledInteractionButton>
          <StyledInteractionButton
            onClick={onReactTweet}
            liked={liked}
            interactionType={EInteractionButton.Like}
          >
            <FaRegHeart />
            <span>{liked ? t('liked') : t('like')}</span>
          </StyledInteractionButton>
          <StyledInteractionButton
            onClick={onSaveTweet}
            saved={saved}
            interactionType={EInteractionButton.Save}
          >
            <BiBookmark />
            <span>{saved ? t('saved') : t('save')}</span>
          </StyledInteractionButton>
        </StyledInteractionButtonGroup>
      </StyledRoot>
      <CreateCommentForm tweet={tweet} />
    </React.Fragment>
  );
};

export default memo(TweetInteraction);

const StyledRoot = styled.div``;

const StyledSummary = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 0.8rem;

  @media (max-width: 576px) {
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

const StyledSummaryItem = styled.button`
  color: ${({ theme }) => theme.textColor7};
  font-size: ${EFontSize.Font3};
  font-weight: ${EFontWeight.FontWeight500};
  cursor: pointer;
`;

const StyledInteractionButtonGroup = styled.div`
  border-top: ${EBoxShadow.BoxShadow1};
  border-bottom: 1px solid ${({ theme }) => theme.backgroundColor4};
  padding: 0.4rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledInteractionButton = styled('button')<{
  customStyle?: string;
  liked?: boolean;
  saved?: boolean;
  retweeted?: boolean;
  interactionType?: EInteractionButton;
}>`
  cursor: pointer;
  padding: 1.1rem 4rem;
  border-radius: 0.8rem;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: ${EFontWeight.FontWeight500};

  ${(props) =>
    props.liked &&
    `
        color: ${({ theme }) => theme.textColor8};
    `}

  ${(props) =>
    props.saved &&
    `
        color: ${({ theme }) => theme.textColor2};
    `}

    ${(props) =>
    props.retweeted &&
    `
        color: ${({ theme }) => theme.textColor5};
    `}
    
    &:hover {
    background: ${({ theme }) => theme.backgroundColor4};
  }

  ${({ interactionType }) =>
    interactionType === EInteractionButton.Share &&
    css`
      &:hover {
        svg {
          animation: ${spin} 1s linear infinite;
        }
      }
    `}

  ${({ interactionType }) =>
    (interactionType === EInteractionButton.Like ||
      interactionType === EInteractionButton.Save ||
      interactionType === EInteractionButton.Comment) &&
    css`
      &:hover {
        svg {
          animation: ${shake} 1s linear infinite;
        }
      }
    `}

  @media (max-width: 576px) {
    padding: 1rem;
    span {
      display: none;
    }
  }
`;

export const AnimatedShareIcon = styled(FiRefreshCw)`
  &:hover {
    animation: ${spin} 1s linear infinite;
  }
`;
