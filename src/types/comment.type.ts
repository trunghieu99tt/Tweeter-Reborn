import { ITweet } from './tweet.type';
import { IUser } from './user.type';

export interface IComment {
  _id: string;
  tweet: ITweet;
  media: string;
  author: IUser;
  likes: string[];
  content: string;
  isChild?: boolean;
  isEdited: boolean;
  createdAt: string;
  modifiedAt: string;
  replies: IComment[];
}

export interface ICreateCommentDTO {
  content: string;
  media?: string;
}

export enum EAddCommentType {
  CreateTweetComment = 'CreateTweetComment',
  ReplyComment = 'ReplyComment',
}

export type TCreateTweetComment = {
  type: EAddCommentType.CreateTweetComment;
  tweetId: string;
  comment: ICreateCommentDTO;
};

export type TReplyComment = {
  type: EAddCommentType.ReplyComment;
  commentId: string;
  comment: ICreateCommentDTO;
};
