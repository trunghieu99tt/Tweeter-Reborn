import { NewAnimatePresenceProps } from '@type/app.type';
import { AnimatePresence, motion } from 'framer-motion';
import React, { memo } from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  items: JSX.Element[];
  isVisible?: boolean;
}

const motionConfig = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transformOrigin: 'top center',
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

const Dropdown = ({ isVisible, items, children }: Props) => {
  const NewAnimatePresence: React.FC<NewAnimatePresenceProps> = AnimatePresence;

  return (
    <NewAnimatePresence>
      {isVisible && (
        <motion.div {...motionConfig}>
          <StyledWrapper>
            <StyledDropdownList>
              {items?.map((item: any, idx: number) => {
                return (
                  <StyledDropdownListItem
                    key={item.id || `dropdown-item-${idx}`}
                  >
                    {item}
                  </StyledDropdownListItem>
                );
              })}
              {children}
            </StyledDropdownList>
          </StyledWrapper>
        </motion.div>
      )}
    </NewAnimatePresence>
  );
};

export default memo(Dropdown);

const StyledWrapper = styled.div`
  position: absolute;
  right: 0;
  width: 100%;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  box-shadow: var(--box-shadow-1);
  border-radius: 12px;
  padding: 1.5rem;
  transform: translateY(1rem);
  background: #fff;
  min-width: 20rem;
  z-index: 2;
`;

const StyledDropdownList = styled.ul``;

const StyledDropdownListItem = styled.li`
  padding: 1rem 1.5rem;
  transition: all 0.5s;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background: #f2f2f2;
  }

  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--gray-2);

    svg {
      --size: 1.6rem;
      width: var(--size);
      height: var(--size);
    }

    p {
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
`;
