import { extractMetadata } from '@utils/helper';
import React, { ChangeEvent, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsTrash } from 'react-icons/bs';
import styled from 'styled-components';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const TextAreaWithLinks = ({ onChange: onChangeProps, value }: Props) => {
  const { t } = useTranslation();
  const [urls, setUrls] = useState<string[]>([]);

  const updateUrls = (content: string) => {
    const { urls } = extractMetadata(content);
    if (urls && urls?.length > 0) {
      setUrls(urls);
    }
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    updateUrls(newValue);
    onChangeProps(newValue);
  };

  useEffect(() => {
    if (value) {
      updateUrls(value);
    }

    if (!value) {
      setUrls([]);
    }
  }, [value]);

  const removeLinks = () => setUrls([]);
  return (
    <StyledRoot>
      <StyledTextArea
        value={value}
        onChange={onChange}
        placeholder={t('whatOnYourMind')}
      ></StyledTextArea>
      {urls?.length > 0 && (
        <StyledLinkPreviewWrapper>
          <StyledRemoveLinkBtn onClick={removeLinks}>
            <BsTrash />
          </StyledRemoveLinkBtn>
        </StyledLinkPreviewWrapper>
      )}
    </StyledRoot>
  );
};

export default memo(TextAreaWithLinks);

const StyledRoot = styled.div``;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 10rem;
  border: none;
  resize: none;
  outline: none;
`;

const StyledLinkPreviewWrapper = styled.div`
  position: relative;
  min-height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: gray;
  color: #fff;
`;

const StyledRemoveLinkBtn = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${({ theme }) => theme.backgroundColor3};
  color: ${({ theme }) => theme.textColor1};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  --size: 3rem;
  height: var(--size);
  width: var(--size);
`;
