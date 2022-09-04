import { EEndpoints, EHashTagQuery } from '@constants';
import { IHashtag, IUpdateHashtagDTO } from '@type/hash-tag.type';
import client from 'api/client';
import { useMutation, useQueryClient } from 'react-query';

export const useHashTagService = () => {
  const queryClient = useQueryClient();
  const getMostPopularHashTags = async (): Promise<IHashtag[]> => {
    try {
      const response = await client.get(`${EEndpoints.HashTag}/most-popular`);
      return response.data?.data || [];
    } catch (error) {
      console.error(`${getMostPopularHashTags.name} error`);
    }
  };

  const updateHashtag = async ({ name, count }: IUpdateHashtagDTO) => {
    try {
      const response = await client.patch(`${EEndpoints.HashTag}/${name}`, {
        count,
      });
      return response.data;
    } catch (error) {
      console.error(`${updateHashtag.name} error`);
    }
  };

  const updateHashtagMutation = useMutation(
    EHashTagQuery.UpdateHashTag,
    updateHashtag,
    {
      onMutate: (data) => {
        console.log('data', data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(EHashTagQuery.GetPopularTags);
      },
    },
  );

  const getTagsExistenceMap = (
    tags: string[] = [],
  ): {
    [key: string]: boolean;
  } => {
    const tagsExistenceMap: {
      [key: string]: boolean;
    } = {};
    tags &&
      tags.forEach((tag) => {
        tagsExistenceMap[tag] = true;
      });
    return tagsExistenceMap;
  };

  const updateHashTags = async (
    oldHashtags: string[],
    newHashtags: string[],
  ) => {
    const oldTagsExistenceMap = getTagsExistenceMap(oldHashtags);
    const newTagsExistenceMap = getTagsExistenceMap(newHashtags);

    const updateHashtagObjects: IUpdateHashtagDTO[] = [];

    newHashtags?.forEach((tag: string) => {
      if (!oldTagsExistenceMap[tag]) {
        updateHashtagObjects.push({ name: tag, count: 1 });
      }
    });

    oldHashtags?.forEach((tag: string) => {
      if (!newTagsExistenceMap[tag]) {
        updateHashtagObjects.push({ name: tag, count: -1 });
      }
    });

    const updateHashtagResponse = await Promise.all(
      updateHashtagObjects.map(async (updateObj: IUpdateHashtagDTO) => {
        return updateHashtagMutation.mutateAsync(updateObj);
      }),
    );

    return updateHashtagResponse;
  };

  return {
    updateHashTags,
    updateHashtagMutation,
    getMostPopularHashTags,
  };
};
