export interface IUpdateHashtagDTO {
  name: string;
  count: number;
}

export interface IHashtag extends IUpdateHashtagDTO {
  _id: string;
}
