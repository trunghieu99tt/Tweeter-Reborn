import React, { ComponentType, CSSProperties, RefObject, useMemo } from 'react';
import { QueryFunctionContext, QueryKey, useInfiniteQuery } from 'react-query';
import { useVirtual } from '@tanstack/react-virtual';
import { IGetList } from '@type/app.type';
import {
  flattenInfinityList,
  generateInfinityQueryListConfig,
} from '@utils/query';
import styled from 'styled-components';

/**
 * Notes: Tried using react-virtual but it was too slow.
 */
type Props<T> = {
  ItemComponent: ComponentType<{
    isLoading: boolean;
    data: T;
    customStyles?: CSSProperties;
  }>;
  queryFunction: (
    limit: number,
  ) => ({
    pageParam,
  }: QueryFunctionContext<QueryKey, any>) => Promise<IGetList<T>>;
  queryKey: string;
  limit: number;
};

const InfinityList = <
  T extends {
    _id: string;
  },
>({
  ItemComponent,
  queryFunction,
  queryKey,
  limit,
}: Props<T>) => {
  const parentRef = React.useRef();

  const {
    hasNextPage,
    data,
    isFetchingNextPage,
    fetchNextPage,
    error,
    isFetching,
  } = useInfiniteQuery(
    queryKey,
    queryFunction(limit),
    generateInfinityQueryListConfig(null, limit),
  );

  const items = useMemo(() => {
    return flattenInfinityList<T>(data);
  }, [data]);

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    useObserver: React.useCallback(() => ({ height: 300, width: 300 }), []),
    paddingStart: 50,
    paddingEnd: 50,
  });

  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.virtualItems.reverse()];

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= items.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    items.length,
    isFetchingNextPage,
    rowVirtualizer.virtualItems,
  ]);

  return (
    <StyledRoot ref={parentRef}>
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => {
          const isLoaderRow = virtualRow.index > items.length - 1;
          const data = items[virtualRow.index];

          return (
            <div
              ref={virtualRow.measureRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
              key={data?._id}
            >
              <ItemComponent data={data} isLoading={false} />
            </div>
          );
        })}
      </div>
    </StyledRoot>
  );
};

export default InfinityList;

const StyledRoot = styled.div`
  height: 70vh;
  width: 100%;
  overflow: auto;

  /* &::-webkit-scrollbar {
    display: none;
  } */
`;
