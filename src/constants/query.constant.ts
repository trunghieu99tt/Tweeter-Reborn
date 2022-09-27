export const SORT_STALE_TIME = 60 * 60 * 1000; // 1 hour
export const LONG_STATE_TIME = 60 * 60 * 1000 * 24; // 1 day
export const DEFAULT_LIST_LIMIT = 20;

export enum EUserQuery {
  GetMe = 'GetMe',
  GetUser = 'GetUser',
  GetPopularUser = 'GetPopularUser',
}

export enum ENotificationQuery {
  GetNotifications = 'GetNotifications',
  ReadNotification = 'ReadNotification',
}

export enum EAuthQuery {
  Login = 'Login',
  Register = 'Register',
  Logout = 'Logout',
}

export enum EStoryQuery {
  GetStories = 'GetStories',
}

export enum EHashTagQuery {
  GetPopularTags = 'GetPopularTags',
  UpdateHashTag = 'UpdateHashTag',
}

export enum ETweetQuery {
  CreateTweet = 'CreateTweet',
  UpdateTweet = 'UpdateTweet',
  GetLatestTweets = 'GetLatestTweets',
  GetNewsFeedTweets = 'GetNewsFeedTweets',
  GetSavedTweets = 'GetSavedTweets',
  GetPopularTweets = 'GetPopularTweets',
  GetTweetByHashTag = 'GetTweetByHashTag',
  GetTweetByUser = 'GetTweetByUser',
  GetTweetMediaByUser = 'GetTweetMediaByUser',
  GetLikedTweetByUser = 'GetLikedTweetByUser',
  Retweet = 'Retweet',
  ReactTweet = 'ReactTweet',
  SaveTweet = 'SaveTweet',
  ReportTweet = 'ReportTweet',
  GetTweetMedias = 'GetTweetMedias',
  GetBookmarkTweets = 'GetBookmarkTweets',
}

export enum ECommentQuery {
  GetTweetComments = 'GetTweetComments',
  CreateComment = 'CreateComment',
  ReactComment = 'ReactComment',
}
