import React from 'react';

const Auth = React.lazy(() => import('@pages/auth'));
const NewsFeed = React.lazy(() => import('@pages/news-feed'));
const NotificationPage = React.lazy(() => import('@pages/notifications'));
const Explore = React.lazy(() => import('@pages/explore'));
const Bookmark = React.lazy(() => import('@pages/bookmarks'));
const SearchPage = React.lazy(() => import('@pages/search'));
const TweetDetailPage = React.lazy(() => import('@pages/tweet-detail'));
const HashtagTweets = React.lazy(() => import('@pages/hash-tag-tweets'));
const ProfilePage = React.lazy(() => import('@pages/profile'));
const CreateStoryPage = React.lazy(() => import('@pages/story/create'));

export const ROUTES = {
  home: '/',
  auth: '/auth',
  notifications: '/notifications',
  explore: '/explore',
  bookmark: '/bookmark',
  search: '/search',
  profile: '/profile',
  hashTags: '/hashtag',
  tweet: '/tweet',
  story: {
    create: '/story/create',
  },
};

export const routes: {
  path: string;
  Element: React.LazyExoticComponent<React.FC> | React.FC;
  isPrivate?: boolean;
  isLazy?: boolean;
}[] = [
  {
    path: ROUTES.auth,
    Element: Auth,
    isLazy: true,
  },
  {
    path: ROUTES.home,
    Element: NewsFeed,
    isLazy: true,
  },
  {
    path: ROUTES.notifications,
    Element: NotificationPage,
    isLazy: true,
    isPrivate: true,
  },
  {
    path: ROUTES.explore,
    Element: Explore,
    isLazy: true,
  },
  {
    path: ROUTES.bookmark,
    Element: Bookmark,
    isLazy: true,
    isPrivate: true,
  },
  {
    path: ROUTES.search,
    Element: SearchPage,
    isLazy: true,
  },
  {
    path: `${ROUTES.tweet}/:tweetId`,
    Element: TweetDetailPage,
    isLazy: true,
  },
  {
    path: `${ROUTES.hashTags}/:hashTag`,
    Element: HashtagTweets,
    isLazy: true,
  },
  {
    path: `${ROUTES.profile}/:userId`,
    Element: ProfilePage,
    isLazy: true,
  },
  {
    path: ROUTES.story.create,
    Element: CreateStoryPage,
    isLazy: true,
  },
];
