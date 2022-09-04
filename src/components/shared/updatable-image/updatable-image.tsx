import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipLoader } from 'react-spinners';
import Button from '../button';
import FileInput from '../file-input';
import {
  ActionButtons as StyledActionButtons,
  CancelButton as StyledCancelButton,
  LoadingStyle as StyledLoadingWrapper,
  MainImage as StyledImage,
  UpdateWrapper as StyledUpdateArea,
  Wrapper as StyledRoot,
} from './updatable-image.style';

interface Props {
  id: string;
  src: string;
  label: string;
  updatable: boolean;
  wrapperCustomStyles?: string;

  onOk: (file: File) => Promise<void>;
}

const UpdatableImage = ({
  onOk,
  src,
  id,
  updatable,
  wrapperCustomStyles,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const [newSrc, setNewSrc] = useState<{
    file: File | null;
    preview: string;
  }>({
    file: null,
    preview: src,
  });

  useEffect(() => {
    setNewSrc({
      file: null,
      preview: src,
    });
  }, [src]);

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      onOk && typeof onOk === 'function' && (await onOk(newSrc.file));
    } catch (error) {}
    setLoading(false);
  };

  const onChange = (files: FileList) => {
    const file = files?.[0];
    if (!file) {
      return;
    }
    setNewSrc({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const onCancel = () => {
    setNewSrc({
      file: null,
      preview: src,
    });
  };

  return (
    <StyledRoot customStyles={wrapperCustomStyles}>
      {loading && (
        <StyledLoadingWrapper>
          <ClipLoader />
        </StyledLoadingWrapper>
      )}
      <StyledImage src={newSrc.preview} alt={`updatable-image`} />
      {updatable && (
        <StyledUpdateArea>
          {!newSrc?.file ? (
            <FileInput htmlFor={`updatable-image-${id}`} onChange={onChange} />
          ) : (
            <StyledActionButtons>
              {onOk && (
                <Button onClick={onSubmit} disabled={loading}>
                  {t('update')}
                </Button>
              )}
              <StyledCancelButton onClick={onCancel} disabled={loading}>
                {t('cancel')}
              </StyledCancelButton>
            </StyledActionButtons>
          )}
        </StyledUpdateArea>
      )}
    </StyledRoot>
  );
};

export default UpdatableImage;
