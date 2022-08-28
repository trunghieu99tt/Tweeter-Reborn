import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { useToggle } from '@hooks/useToggle';
import EmojiPicker, { IEmojiData } from 'emoji-picker-react';
import React, { memo, useEffect, useRef } from 'react';
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
    hide();
    if (typeof props.onEmojiClick === 'function') {
      props.onEmojiClick(data);
    }
  };

  useEffect(() => {
    console.log('render MyEmojiPicker');
  });

  return (
    <StyledRoot ref={ref}>
      <EmojiPicker
        onEmojiClick={onClickEmoji}
        pickerStyle={{
          position: 'absolute',
          bottom: '0',
          transform: 'translateY(-15%)',
          boxShadow: 'none',
          display: visible ? 'block' : 'none',
        }}
      />
      <button onClick={toggle}>
        <HiOutlineEmojiHappy />
      </button>
    </StyledRoot>
  );
};

export default memo(MyEmojiPicker);

const StyledRoot = styled.div``;
