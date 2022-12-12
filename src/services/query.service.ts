import { EUpdateType } from '@constants';
import { useQueryClient } from '@tanstack/react-query';
import { IInfinityListData, IInfinityListDataPage } from '@type/app.type';

export const useQueryService = () => {
  const queryClient = useQueryClient();

  const optimisticUpdateInfinityList = async <
    T extends {
      _id: string;
    },
  >({
    data,
    queryKey,
    type,
  }: {
    type: EUpdateType;
    queryKey: string | string[];
    data: T;
  }): Promise<void> => {
    await queryClient.cancelQueries([queryKey]);
    const cachedData: IInfinityListData<T> | undefined =
      queryClient.getQueryData([queryKey]);

    let updatedPages: IInfinityListDataPage<T>[];

    switch (type) {
      case EUpdateType.Create:
        {
          updatedPages = cachedData?.pages?.map(
            (page: IInfinityListDataPage<T>, idx: number) => {
              if (idx === 0) {
                return {
                  ...page,
                  data: [data, ...page.data],
                };
              }

              return page;
            },
          );
        }
        break;

      case EUpdateType.Update:
        {
          updatedPages = cachedData?.pages?.map(
            (page: IInfinityListDataPage<T>) => {
              return {
                ...page,
                data: page.data.map((item: any) => {
                  if (item?._id === data?._id) {
                    return {
                      ...item,
                      ...data,
                    };
                  }
                  return item;
                }),
              };
            },
          );
        }
        break;

      case EUpdateType.Delete:
        {
          updatedPages = cachedData?.pages?.map(
            (page: IInfinityListDataPage<T>) => {
              return {
                ...page,
                data: page?.data?.filter((item: any) => {
                  return item?._id !== data?._id;
                }),
              };
            },
          );
        }
        break;
    }

    console.log({
      ...cachedData,
      pages: updatedPages,
    });
    queryClient.setQueryData([queryKey], {
      ...cachedData,
      pages: updatedPages,
    });
  };

  return {
    optimisticUpdateInfinityList,
  };
};
