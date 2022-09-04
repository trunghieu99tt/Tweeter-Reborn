import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { EFontSize } from 'constants/style.constant';
import React, { useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';
import Dropdown from './drop-down';

type TOptions<T> = {
  id: string | number;
  value: T;
  label: string;
  icon?: React.ReactNode;
};

type Props<T> = {
  value?: T;
  onChange: (input: T) => void;
  options: TOptions<T>[];
  renderValue?: (value: T) => React.ReactNode;
};

const BaseSelector = <T,>({
  value,
  onChange,
  options,
  renderValue,
}: Props<T>) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.appState.language,
  );
  const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);
  const dropdownRef = useRef() as React.RefObject<HTMLDivElement>;

  const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

  useOnClickOutside(dropdownRef, () => setVisibleDropdown(false));

  const selections = useMemo(() => {
    return options.map((option) => {
      return (
        <SelectedItemSelectionItem
          onClick={() => onChange(option.value)}
          key={option.id}
        >
          {option?.icon}
          <span>{option?.label}</span>
        </SelectedItemSelectionItem>
      );
    });
  }, [options, currentLanguage]);

  const SelectedItem = options.find((option) => option.value === value);

  const selectedItem = useMemo(() => {
    if (renderValue && typeof renderValue === 'function') {
      return renderValue(value);
    }

    return (
      <React.Fragment>
        <StyledSelectedItemIcon>{SelectedItem?.icon}</StyledSelectedItemIcon>
        <StyledSelectedItemText>{SelectedItem?.label}</StyledSelectedItemText>
      </React.Fragment>
    );
  }, [renderValue]);

  return (
    <Wrapper ref={dropdownRef}>
      <StyledSelectedItem onClick={toggleDropdown}>
        {selectedItem}
      </StyledSelectedItem>
      <Dropdown isVisible={visibleDropdown} items={selections} />
    </Wrapper>
  );
};

export default BaseSelector;

export const Wrapper = styled.div`
  position: relative;
  z-index: 2;
`;

export const StyledSelectedItem = styled.div`
  font-size: ${EFontSize.Font3};
  font-weight: 500;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  border: var(--border-1);

  svg {
    --size: 1.6rem;
    width: var(--size);
    height: var(--size);
  }
`;

export const StyledSelectedItemText = styled.p``;

export const StyledSelectedItemIcon = styled.div``;

export const SelectedItemDropdown = styled.div``;

export const SelectedItemSelectionItem = styled.div`
  font-size: ${EFontSize.Font3};
  display: flex;
  gap: 1rem;
  align-items: center;

  svg {
    --size: 1.6rem;
    width: var(--size);
    height: var(--size);
  }
`;
