import { IUser } from './user.type';

export interface INotification {
  _id: string;
  url: string;
  text: string;
  type: string;
  image?: string;
  sender: IUser;
  isRead: string[];
  content?: string;
  createdAt: Date;
  receiver: string[];
}

export interface INotificationDTO {
  url?: string;
  text: string;
  type: string;
  receivers: string[];
  image?: string;
}
