import { IComment } from '@type/comment.type';
import { eliminateSerializeType } from '@utils/helper';
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

  constructor(comment: IComment | undefined | null) {
    Object.keys(comment).forEach((key) => {
      this.data[key] = comment?.[key] || defaultComment[key];
    });
  }

  public getData = (): IComment | undefined => {
    return eliminateSerializeType(this.data) as IComment;
  };
}
