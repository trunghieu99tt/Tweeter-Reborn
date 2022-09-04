import { IComment } from './comment.type';
import { IUser } from './user.type';

export interface ITweet {
  _id: string;
  author: IUser;
  save: IUser[];
  tags: string[];
  saved: IUser[];
  likes: IUser[];
  media: string[];
  content: string;
  location: string;
  audience: number;
  isRetweet: boolean;
  retweeted: IUser[];
  retweetedBy: IUser;
  comments: IComment[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateTweetDTO {
  content: string;
  audience: number;
  tags?: string[];
  media?: string[];
}

export interface IReportTweetDTO {
  userId: string;
  reportTime: Date;
}
