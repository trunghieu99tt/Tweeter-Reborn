import CreateCommentForm from '@components/comment/form/create-comment-form';
import { shake, spin } from '@components/shared/shared-style';
import UserCard from '@components/user/card';
import { ITweet } from '@type/tweet.type';
import { IUser } from '@type/user.type';
import { EBoxShadow, EFontSize, EFontWeight } from 'constants/style.constant';
import switchRenderIfAuthenticated from 'hoc/switchRenderIfAuthenticated';
import React, { memo, Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BiBookmark } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import styled, { css } from 'styled-components';
import { useTweetInteraction } from './use-tweet-interaction';

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
  const {
    saved,
    liked,
    retweeted,
    userListData,
    tweetLikeCount,
    tweetSavedCount,
    userListModalRef,
    tweetRetweetCount,
    totalTweetComments,
    modalUserListHeader,
    onRetweet,
    onSaveTweet,
    onReactTweet,
    showUserListModal,
  } = useTweetInteraction({
    tweet,
  });

  const { t } = useTranslation();

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
          <StyledInteractionButton
            onClick={onRetweet}
            retweeted={retweeted}
            interactionType={EInteractionButton.Share}
          >
            <FiRefreshCw />
            <span>{retweeted ? t('retweeted') : t('retweet')}</span>
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

export default switchRenderIfAuthenticated(memo(TweetInteraction), null);

const StyledRoot = styled.div``;

const StyledSummary = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  justify-content: flex-end;
  margin: 0.8rem 0;

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

const StyledInteractionButton = styled.button<{
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

  color: ${(props) => {
    if (props.liked) {
      return props.theme.textColor8;
    }
    if (props.saved) {
      return props.theme.textColor2;
    }
    if (props.retweeted) {
      return props.theme.textColor5;
    }
  }};

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
    
  
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor4};
  }

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
