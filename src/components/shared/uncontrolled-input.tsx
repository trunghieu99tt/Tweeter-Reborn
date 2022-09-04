import { EFontSize, EFontWeight } from 'constants/style.constant';
import React, { forwardRef, InputHTMLAttributes, memo, useState } from 'react';

import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classes?: any;
  icon?: JSX.Element;
  invalid?: boolean;
  filter?: RegExp | undefined;
  label?: string;
}

const UncontrolledInput = forwardRef<HTMLInputElement, Props>(
  ({ icon = undefined, filter = undefined, label, ...otherProps }, ref) => {
    const [value, setValue] = useState<any>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return (
      <StyledRoot>
        <StyledLabel>
          {label} {icon}
        </StyledLabel>
        <StyledInput
          value={value}
          {...otherProps}
          onChange={onChange}
          ref={ref}
        />
      </StyledRoot>
    );
  },
);

UncontrolledInput.displayName = 'MyInput';

export default memo(UncontrolledInput);

const StyledRoot = styled.div`
  margin-bottom: 2rem;
`;

const StyledLabel = styled.label`
  display: flex;
  gap: 1rem;
  font-size: ${EFontSize.Font4};
  text-transform: capitalize;
  font-weight: ${EFontWeight.FontWeight500};
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.borderColor1};
  border-radius: 0.5rem;
  font-size: 1.3rem;
  width: 100%;
  color: ${({ theme }) => theme.textColor};
`;
