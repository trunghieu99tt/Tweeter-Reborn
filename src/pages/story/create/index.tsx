import { OneSideBarLayout } from '@layout/one-sidebar.layout';
import { EStoryType } from 'constants/story.constant';
import {
  EImageFormUploadType,
  ImageStoryForm,
  TextStoryForm,
} from 'facebook-story';
import React from 'react';
import { useUploadService } from 'services/upload.service';
import CreateStoryBar from './components/CreateStoryBar';
import { useCreateStory } from './useCreateStory';
import './style.css';

const CreateStoryPage = () => {
  const {
    onCancelCreateStory,
    onSubmitStory,
    setStoryAudience,
    setStoryType,
    storyType,
  } = useCreateStory();
  const { uploadImage } = useUploadService();

  const content = React.useMemo(() => {
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
