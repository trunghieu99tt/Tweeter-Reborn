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

enum EUserField {
  Followers = 'followers',
  Following = 'following',
}
export class UserModel {
  private data: IUser = { ...defaultUser };

  constructor(user: IUser | undefined | null) {
    Object.keys(defaultUser).forEach((key) => {
      this.data[key] = user?.[key] || defaultUser[key];
    });

    this.normalizeNestedUser(EUserField.Followers, user?.followers || []);
    this.normalizeNestedUser(EUserField.Following, user?.following || []);
  }

  private normalizeUser = (user: 'string' | IUser): IUser => {
    if (typeof user === 'string')
      return {
        ...defaultUser,
        _id: user,
      };
    return user;
  };

  private normalizeNestedUser = (key: EUserField, values: any[]): void => {
    if (this.data[key] && Array.isArray(this.data[key])) {
      const normalizedUser = values.map((user: any) =>
        this.normalizeUser(user),
      );
      this.data[key] = normalizedUser;
    }
  };

  public getData = (): IUser | undefined => {
    this.normalizeNestedUser(EUserField.Followers, this.data.followers);
    this.normalizeNestedUser(EUserField.Following, this.data.following);
    return eliminateSerializeType(this.data) as IUser;
  };
}
