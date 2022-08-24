import { IUser } from '@type/user.type';
import { eliminateSerializeType } from '@utils/helper';

const defaultUser = {
  _id: '',
  name: '',
  bio: '',
  avatar: '',
  gender: 0,
  email: '',
  username: '',
  following: [],
  followers: [],
  coverPhoto: '',
  isThirdParty: false,
  birthday: new Date(),
  storyAudience: 0,
  role: 'user',
};

export class UserModel {
  _id: string;
  bio: string;
  name: string;
  avatar: string;
  email: string;
  gender: number;
  birthday: Date;
  username: string;
  coverPhoto: string;
  following: IUser[];
  followers: IUser[];
  isThirdParty: boolean;
  storyAudience: number;
  role: string;

  constructor(user: IUser | undefined | null) {
    this.bio = user?.bio || defaultUser.bio;
    this._id = user?._id || defaultUser._id;
    this.name = user?.name || defaultUser.name;
    this.email = user?.email || defaultUser.email;
    this.avatar = user?.avatar || defaultUser.avatar;
    this.gender = user?.gender || defaultUser.gender;
    this.username = user?.username || defaultUser.username;
    this.birthday = user?.birthday || defaultUser.birthday;
    this.coverPhoto = user?.coverPhoto || defaultUser.coverPhoto;
    this.storyAudience = user?.storyAudience || defaultUser.storyAudience;
    this.isThirdParty = user?.isThirdParty || defaultUser.isThirdParty;
    this.role = user?.role || defaultUser.role;

    this.followers = [];
    this.following = [];

    if (user && user?.followers?.length > 0) {
      this.followers = user.followers.map((user) => {
        return this.normalizeUser(user);
      });
    }
    if (user && user?.following?.length > 0) {
      this.following = user.following.map((user) => {
        return this.normalizeUser(user);
      });
    }
  }

  private normalizeUser = (user: 'string' | IUser): IUser => {
    if (typeof user === 'string')
      return {
        ...defaultUser,
        _id: user,
      };
    return user;
  };

  public parseUser = (): IUser | undefined => {
    if (this.followers?.length > 0) {
      this.followers = this.followers.map((follower) =>
        new UserModel(follower).getData(),
      );
    }
    if (this?.following?.length > 0) {
      this.following = this.following.map((following) =>
        new UserModel(following).getData(),
      );
    }
    return eliminateSerializeType(new UserModel(this).getData()) as IUser;
  };

  private getData(): IUser {
    return {
      _id: this._id,
      bio: this.bio,
      role: this.role,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      gender: this.gender,
      username: this.username,
      birthday: this.birthday,
      followers: this.followers,
      following: this.following,
      coverPhoto: this.coverPhoto,
      isThirdParty: this.isThirdParty,
      storyAudience: this.storyAudience,
    };
  }
}
