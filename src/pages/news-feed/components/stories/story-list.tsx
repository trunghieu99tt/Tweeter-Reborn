import { EStoryQuery } from '@constants';
import {
  flattenInfinityList,
  generateInfinityQueryListConfig,
} from '@utils/query';
import _ from 'lodash';
import React, { memo } from 'react';
import { useInfiniteQuery } from 'react-query';
import EventBus, { EventBusName } from 'services/event-bus';
import { useStoryService } from 'services/story.service';
import styled from 'styled-components';
import CreateStoryLink from './create-story-link';
import StoryItem from './story-item';

const MAX_SHOWN_STORY_COUNT = 5;

const StoryList = () => {
  const { getStoryList } = useStoryService();
  const { data } = useInfiniteQuery(
    EStoryQuery.GetStories,
    getStoryList({
      limit: MAX_SHOWN_STORY_COUNT * 10,
    }),
    {
      ...generateInfinityQueryListConfig(),
      retry: 0,
      onError: (error) => {
        EventBus.getInstance().post({
          type: EventBusName.Error,
          error,
        });
      },
    },
  );

  const stories = flattenInfinityList(data);
  const groupedStoryByUsers = _.groupBy(stories, 'userId');

  // TODO: Add show more btn
  // const totalReocords = data?.pages?.[0]?.total || 0;

  return (
    <StyledRoot>
      <StyledItemWrapper>
        <CreateStoryLink />
      </StyledItemWrapper>
      {stories?.length > 0 && (
        <StyledItemWrapper>
          {Object.keys(groupedStoryByUsers)
            ?.slice(0, MAX_SHOWN_STORY_COUNT)
            .map((key: string) => {
              const values = groupedStoryByUsers[key];
              return (
                <StoryItem
                  data={values?.[0]}
                  key={`story-item-${values[0]._id}`}
                />
              );
            })}
        </StyledItemWrapper>
      )}
    </StyledRoot>
  );
};

export default memo(StoryList);

const StyledRoot = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StyledItemWrapper = styled.article`
  background-color: rgb(36, 37, 38);
  width: 10rem;
  height: 17rem;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;
