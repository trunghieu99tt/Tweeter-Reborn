import { ITweet } from '@type/tweet.type';
import { eliminateSerializeType } from '@utils/helper';

const defaultTweet: ITweet = {
  _id: '',
  author: null,
  save: [],
  tags: [],
  saved: [],
  likes: [],
  media: [],
  content: '',
  location: '',
  audience: 0,
  isRetweet: false,
  retweeted: [],
  retweetedBy: null,
  comments: [],
};

export class TweetModel {
  private data: ITweet = defaultTweet;

  constructor(tweet: ITweet | undefined | null) {
    Object.keys(defaultTweet).forEach((key) => {
      this.data[key] = tweet?.[key] || defaultTweet[key];
    });
  }

  public getData(): ITweet {
    return eliminateSerializeType(this.data) as ITweet;
  }
}
