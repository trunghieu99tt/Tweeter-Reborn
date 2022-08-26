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
