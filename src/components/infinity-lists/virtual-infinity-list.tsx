import React, { CSSProperties } from 'react';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

type VirtualInfinityListProps<T> = {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: T[];
  loadNextPage: () => void;
  Item: any;
  ItemSkeleton?: any;
  height?: number;
  width?: number;
  itemSize?: number;
};

export const VirtualInfinityList = <
  T extends {
    _id: string;
  },
>({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  Item,
  ItemSkeleton,
  height,
  width,
  itemSize,
}: VirtualInfinityListProps<T>) => {
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading
    ? () => {
        return;
      }
    : loadNextPage;
  const isItemLoaded = (idx: number) => !hasNextPage || idx < items.length;

  const WrappedItem = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }) => {
    if (!isItemLoaded(index)) {
      return !!ItemSkeleton ? (
        <ItemSkeleton style={style} />
      ) : (
        <div>Loading...</div>
      );
    }

    return (
      <Item
        style={style}
        key={items[index]?._id || `item-${index}`}
        data={items[index]}
      />
    );
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          className="List"
          height={height ?? 800}
          itemCount={itemCount}
          itemSize={itemSize ?? 200}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width={width ?? 800}
        >
          {WrappedItem}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
};
