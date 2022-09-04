import { IUser } from './user.type';

export interface IStory {
  _id: string;
  owner: IUser;
  type: string;
  content: string;
  audience: number;
  viewerIds: string[];
  createdAt: Date;
}

export interface IStoryCreate {
  type: string;
  content: string;
  audience: number;
}

export interface IStoryGroup {
  [key: string]: IStory[];
}
