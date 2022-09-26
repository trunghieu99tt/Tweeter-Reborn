import { IGetList } from '@type/app.type';
import {
  flattenInfinityList,
  generateInfinityQueryListConfig,
} from '@utils/query';
import { useMemo } from 'react';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

type Props<T> = {
  queryKey: string | string[];
  queryFunction: (context: QueryFunctionContext) => Promise<IGetList<T>>;
  queryConfig: {
    staleTime?: number;
    limit?: number;
  };
};

export const useInfinityList = <T>({
  queryFunction,
  queryKey,
  queryConfig,
}: Props<T>) => {
  const query = useInfiniteQuery(
    typeof queryKey === 'string' ? [queryKey] : queryKey,
    queryFunction,
    generateInfinityQueryListConfig(queryConfig.staleTime, queryConfig.limit),
  );

  const { data: fetchedData, isLoading, fetchNextPage } = query;

  const data = useMemo(() => {
    return flattenInfinityList<T>(fetchedData);
  }, [fetchedData]);

  const pages = fetchedData?.pages;
  const totalRecords = pages?.[0].total || 0;
  const hasMore = data.length < totalRecords;

  return {
    data,
    isLoading,
    fetchNextPage,
    hasMore,
  };
};
