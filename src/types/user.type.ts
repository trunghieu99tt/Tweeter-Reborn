export interface IUser {
  _id: string;
  bio: string;
  name: string;
  role: string;
  email: string;
  gender: number;
  avatar: string;
  birthday: Date;
  username: string;
  followers: IUser[];
  following: IUser[];
  coverPhoto: string;
  storyAudience: number;
  isThirdParty?: boolean;
}

export interface ILogin {
  username: string;
  password: string;
}
