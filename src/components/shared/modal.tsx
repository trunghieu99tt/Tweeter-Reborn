import { useToggle } from '@hooks/useToggle';
import { BaseControlledRef } from '@type/app.type';
import { EBorder, EFontSize, EFontWeight } from 'constants/style.constant';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
} from 'react';
import styled from 'styled-components';
import Button from './button';

interface Props {
  body?: React.ReactNode;
  okText?: React.ReactNode;
  header?: React.ReactNode;
  cancelText?: React.ReactNode;
  customHeaderStyles?: string;
  zIndex?: number;

  onOk?: () => void;
  onCancel?: () => void;
}

const config = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1, transformOrigin: 'center center' },
  exit: { opacity: 0, scale: 0 },
};

const Modal = (
  {
    body,
    header,
    okText,
    zIndex,
    cancelText,

    onOk,
    onCancel,

    customHeaderStyles,
  }: Props,
  ref: Ref<BaseControlledRef>,
): JSX.Element => {
  const { hide, show, visible } = useToggle();

  useImperativeHandle(ref, () => ({ show, hide }), []);

  const onDismiss = useCallback(() => {
    hide();
    if (onCancel && typeof onCancel === 'function') {
      onCancel();
    }
  }, [onCancel]);

  return (
    <AnimatePresence>
      {visible && (
        <StyledRoot zIndex={zIndex} {...config}>
          <StyledMask onClick={onDismiss} />
          <StyledMainContent>
            <StyledHeader customHeaderStyles={customHeaderStyles}>
              {header}
            </StyledHeader>
            <StyledBody>{body}</StyledBody>
            {onOk && onCancel && (
              <StyledFooter>
                <Button onClick={onOk}>{okText || 'OK'}</Button>
                <StyledCancelButton onClick={onDismiss}>
                  {cancelText || 'Cancel'}
                </StyledCancelButton>
              </StyledFooter>
            )}
          </StyledMainContent>
        </StyledRoot>
      )}
    </AnimatePresence>
  );
};

export default forwardRef(Modal);

export const StyledRoot = styled(motion.div)<{
  zIndex?: number;
}>`
  display: flex;
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
