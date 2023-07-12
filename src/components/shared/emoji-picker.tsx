import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { useToggle } from '@hooks/useToggle';
import EmojiPicker, { IEmojiData } from 'emoji-picker-react';
import React, { memo, useMemo, useRef } from 'react';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import styled from 'styled-components';

type Props = {
  onEmojiClick: (data: IEmojiData) => void;
};

const MyEmojiPicker = (props: Props): JSX.Element => {
  const { hide, visible, toggle } = useToggle();

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, hide);

  const onClickEmoji = (event: React.MouseEvent, data: IEmojiData) => {
    event.preventDefault();
    if (typeof props.onEmojiClick === 'function') {
      props.onEmojiClick(data);
    }
  };

  const emoji = useMemo(() => {
    return (
      <EmojiPicker
        onEmojiClick={onClickEmoji}
        pickerStyle={{
          position: 'absolute',
          top: '0',
          left: '100%',
          boxShadow: 'none',
        }}
      />
    );
  }, []);

  return (
    <StyledRoot ref={ref}>
      {visible && (
        <StyledEmojiWrapper visible={visible}>{emoji}</StyledEmojiWrapper>
      )}
      <StyledButton onClick={toggle} type="button">
        <HiOutlineEmojiHappy />
      </StyledButton>
    </StyledRoot>
  );
};

export default memo(MyEmojiPicker);

const StyledRoot = styled.div``;

const StyledEmojiWrapper = styled.div<{
  visible: boolean;
}>`
  transition: opacity 0.2s ease-in-out;
  position: relative;
  z-index: 1;
`;

const StyledButton = styled.button`
  cursor: pointer;
`;
