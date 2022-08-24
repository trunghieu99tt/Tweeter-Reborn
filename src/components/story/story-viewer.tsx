import React from 'react';
import { IStory } from '@type/story.type';
import { EStoryType } from 'constants/story.constant';
import ImageStoryViewer from './image-story-viewer';
import TextStoryViewer from './text-story-viewer';

type Props = {
  data: IStory;
};

const StoryViewer = ({ data }: Props) => {
  const content = JSON.parse(data.content);

  if (data.type === EStoryType.Text) return <TextStoryViewer data={content} />;

  return <ImageStoryViewer data={content} />;
};

export default StoryViewer;
