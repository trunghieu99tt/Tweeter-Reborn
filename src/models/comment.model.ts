import { IComment } from '@type/comment.type';
import {
  eliminateSerializeType,
  transformFieldToObjectWithId,
} from '@utils/helper';
import { TweetModel } from './tweet.model';
import { UserModel } from './user.model';

const defaultComment: IComment = {
  _id: '',
  author: new UserModel(null).getData(),
  content: '',
  isEdited: false,
  likes: [],
  media: '',
  replies: [],
  tweet: new TweetModel(null).getData(),
  createdAt: new Date().toLocaleDateString(),
  modifiedAt: new Date().toLocaleDateString(),
  isChild: false,
};

export class CommentModel {
  private data: IComment = defaultComment;
  private shouldHaveIdFields: (keyof IComment)[] = ['author', 'tweet'];

  constructor(comment: IComment | undefined | null) {
    Object.keys(comment).forEach((key) => {
      this.data[key] = comment?.[key] || defaultComment[key];
    });
    this.shouldHaveIdFields.forEach((key) => {
      transformFieldToObjectWithId(key, this.data);
    });
  }

  public getData = (): IComment | undefined => {
    return eliminateSerializeType(this.data) as IComment;
  };
}
