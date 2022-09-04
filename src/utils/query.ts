import { DEFAULT_LIST_LIMIT, SORT_STALE_TIME } from '@constants';
import { IGetList, IPaginationParams } from '@type/app.type';
import client from 'api/client';

export const getList = async <T>(
  endpoint: string,
  pageParam = 0,
  configParams = {},
): Promise<IGetList<T>> => {
  const response = await client.get(endpoint, {
    params: {
      limit: DEFAULT_LIST_LIMIT,
      page: pageParam + 1,
      ...configParams,
    },
  });
  return {
    data: response?.data?.data || [],
    total: response?.data?.total || 0,
  };
};

export const flattenInfinityList = <T>(data: {
  pages: {
    data: T[];
    total: number;
  }[];
}): T[] => {
  return (
    data?.pages?.reduce(
      (
        res: T[],
        curr: {
          data: T[];
          total: number;
        },
      ) => [...res, ...curr.data],
      [],
    ) || []
  );
};

export const getPaginationFromInput = (input: any): IPaginationParams => {
  return {
    page: input.page || input.pageParam || 0,
    limit: input.limit || input.limitParam || DEFAULT_LIST_LIMIT,
  };
};

export const generateInfinityQueryListConfig = (
  staleTime = SORT_STALE_TIME,
  limit = DEFAULT_LIST_LIMIT,
) => {
  return {
    staleTime,
    getPreviousPageParam: (lastPage: any, pages: any) => {
      return pages.length - 1;
    },
    getNextPageParam: (lastPage: any, pages: any) => {
      const totalPage = lastPage.total / limit;
      return pages.length < totalPage ? pages.length : null;
    },
  };
};
