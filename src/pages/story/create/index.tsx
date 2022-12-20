import { OneSideBarLayout } from '@layout/one-sidebar.layout';
import { EStoryType } from 'constants/story.constant';
import React, { useMemo, useState } from 'react';
import CreateStoryBar from './components/CreateStoryBar';
import {
  TextStoryForm,
  ImageStoryForm,
  EImageFormUploadType,
} from 'facebook-story';
import { useUploadService } from 'services/upload.service';
import { useCreateStory } from './useCreateStory';

const CreateStoryPage = () => {
  const {
    onCancelCreateStory,
    onSubmitStory,
    setStoryAudience,
    setStoryType,
    storyType,
  } = useCreateStory();
  const { uploadImage } = useUploadService();

  const content = useMemo(() => {
    switch (storyType) {
      case EStoryType.Text:
        return (
          <TextStoryForm
            onCancel={onCancelCreateStory}
            onSubmit={onSubmitStory}
          />
        );
      case EStoryType.Media:
        return (
          <ImageStoryForm
            height={500}
            width={300}
            onSubmit={onSubmitStory}
            uploadType={EImageFormUploadType.File}
            uploadFunction={uploadImage}
          />
        );
      default:
        return <div>Not found</div>;
    }
  }, [storyType]);

  return (
    <OneSideBarLayout
      isFullWidth
      sideBar={
        <CreateStoryBar
          onChangeAudience={setStoryAudience}
          onChangeStoryType={setStoryType}
        />
      }
      content={content}
    />
  );
};

export default CreateStoryPage;
