import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_URL,
} from '@config/secret';
import { EEndpoints } from '@constants';
import { EUploadFileType } from '@type/app.type';
import client from 'api/client';
import axios from 'axios';
import { EventBusName, onPushEventBus } from './event-bus';

export const useUploadService = () => {
  const uploadImage = async (file: File) => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await client.post(
        `${EEndpoints.Upload}/image`,
        formData,
      );
      return response?.data?.url || '';
    } catch (error: any) {
      console.log('upload image error: ', error, error.message);
    }
  };

  const uploadImages = async (files: FileList | never[]) => {
    if (!files || !files?.length) return;
    return Promise.all(
      Array.from(files).map(async (file) => {
        return uploadImage(file);
      }),
    );
  };

  const uploadSingleMedia = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);
    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data?.secure_url || '';
  };

  const uploadMultiMedia = async (files: File[]) => {
    const mediaUrls = await Promise.all(
      Array.from(files).map(async (file: File) => {
        return await uploadSingleMedia(file);
      }),
    );
    return mediaUrls;
  };

  const uploadMedia = async (
    file: File,
    type: EUploadFileType = EUploadFileType.Tweet,
  ): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('files', file);
      formData.append('type', type);
      const response = await client.post(EEndpoints.Upload, formData);
      return response?.data?.[0] || '';
    } catch (error: any) {
      onPushEventBus({
        type: EventBusName.Error,
        payload: error?.response?.data?.message,
      });
      console.error(`${uploadMedia.name} error: `, error?.response);
    }

    return '';
  };

  const uploadMedias = async (
    files: File[],
    type: EUploadFileType = EUploadFileType.Tweet,
  ): Promise<string[]> => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('type', type);
      const response = await client.post(EEndpoints.Upload, formData);
      return response?.data || [];
    } catch (error: any) {
      onPushEventBus({
        type: EventBusName.Error,
        payload: error?.response?.data?.message,
      });
      console.error(`${uploadMedias.name} error: `, error, error.message);
    }
    return [];
  };

  return {
    uploadSingleMedia,
    uploadMultiMedia,
    uploadImage,
    uploadImages,

    uploadMedia,
    uploadMedias,
  };
};
