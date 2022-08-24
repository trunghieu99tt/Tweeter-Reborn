import { EEndpoints } from '@constants';
import { IPaginationParams } from '@type/app.type';
import { IStory, IStoryGroup } from '@type/story.type';
import { getList } from '@utils/query';
import { QueryFunctionContext } from 'react-query';

export const useStoryService = () => {
  const getStoryList = (input: Partial<IPaginationParams>) => {
    return ({ pageParam }: QueryFunctionContext) => {
      return getList<any>(EEndpoints.STORY, pageParam, {
        limit: input.limit,
      });
    };
  };

  const groupStoryByUser = (stories: IStory[]): IStoryGroup => {
    return stories?.reduce(
      (
        res: {
          [key: string]: IStory[];
        },
        curr: IStory,
      ) => {
        const { owner } = curr;
        if (owner?._id) {
          if (res.hasOwnProperty(owner._id)) {
            res[owner._id].push(curr);
          } else {
            res[owner._id] = [curr];
          }
        }
        return res;
      },
      {},
    );
  };

  return {
    getStoryList,
    groupStoryByUser,
  };
};
