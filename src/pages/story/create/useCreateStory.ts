import { EStoryType } from 'constants/story.constant';
import { useState } from 'react';

export const useCreateStory = () => {
  const [storyAudience, setStoryAudience] = useState<number>(0);
  const [storyType, setStoryType] = useState<EStoryType>(EStoryType.Text);

  const onCancelCreateStory = () => {
    console.log('cancel');
  };

  const onSubmitStory = (text: string) => {
    console.log('storyAudience', storyAudience);
    console.log('submit', text);
  };

  return {
    storyAudience,
    setStoryAudience,
    storyType,
    setStoryType,
    onCancelCreateStory,
    onSubmitStory,
  };
};
