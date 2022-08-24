import { EBorder, EFontSize, EFontWeight } from 'constants/style.constant';
import React from 'react';
import styled from 'styled-components';
import Button from './button';

interface Props {
  isOpen: boolean;
  body?: React.ReactNode;
  okText?: React.ReactNode;
  header?: React.ReactNode;
  cancelText?: React.ReactNode;
  customHeaderStyles?: string;
  zIndex?: number;

  onOk?: () => void;
  onCancel?: () => void;
}

const Modal = ({
  body,
  header,
  isOpen,
  okText,
  zIndex,
  cancelText,

  onOk,
  onCancel,

  customHeaderStyles,
}: Props): JSX.Element => {
  return (
    <StyledRoot isOpen={isOpen} zIndex={zIndex}>
      <StyledMask onClick={onCancel} />
      <StyledMainContent>
        <StyledHeader customHeaderStyles={customHeaderStyles}>
          {header}
        </StyledHeader>
        <StyledBody>{body}</StyledBody>
        {onOk && onCancel && (
          <StyledFooter>
            <Button onClick={onOk}>{okText || 'OK'}</Button>
            <StyledCancelButton onClick={onCancel}>
              {cancelText || 'Cancel'}
            </StyledCancelButton>
          </StyledFooter>
        )}
      </StyledMainContent>
    </StyledRoot>
  );
};

export default Modal;

export const StyledRoot = styled('div')<{
  isOpen: boolean;
  zIndex?: number;
}>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: ${(props) => (props.zIndex ? props.zIndex : '100')};
`;

export const StyledMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const StyledMainContent = styled.div`
  max-width: 70%;
  background: #fff;
  z-index: 1;
  border-radius: 8px;
  padding: 2rem;
`;

export const StyledHeader = styled('div')<{
  customHeaderStyles?: string;
}>`
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  font-weight: ${EFontWeight.FontWeight500};
  font-size: ${EFontSize.Font3};
  border-bottom: ${EBorder.Border1};
  ${(props) => props.customHeaderStyles};
`;

export const StyledBody = styled.div`
  max-height: 50rem;
  overflow: auto;
  overflow-x: hidden;
`;

export const StyledFooter = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: end;
  border-top: 1px solid var(--gray-4);
  margin-top: 2rem;
  gap: 1rem;
`;

export const StyledCancelButton = styled.button`
  background: var(--red);
  color: #fff;
  font-weight: ${EFontWeight.FontWeight500};
  border-radius: 5px;
  padding: 0.5rem 2rem;
`;
