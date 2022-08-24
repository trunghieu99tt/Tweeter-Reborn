import React from 'react';
import mergeClasses from '@utils/mergeClasses';
import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

import defaultClasses from './input.module.css';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classes?: any;
  value?: string | number;
  icon?: string;
  invalid?: boolean;
  filter?: RegExp | undefined;
  label?: string;
  onChange?: (el?: any, value?: any) => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      classes: propsClasses,
      icon = undefined,
      filter = undefined,
      label,
      onChange,
      ...otherProps
    },
    ref,
  ) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (
        !filter ||
        (event?.target?.value && filter.test(event.target.value))
      ) {
        onChange && onChange(event);
      }
    };

    return (
      <div className={classes.wrapper}>
        <label>{label}</label>
        <div>
          {icon && <div className={classes.icon}>{icon}</div>}
          <StyledInput {...otherProps} onChange={handleChange} ref={ref} />
        </div>
      </div>
    );
  },
);

Input.displayName = 'MyInput';

export default Input;

const StyledInput = styled.input`
  padding: 1rem;
  border: 1px solid var(--gray-4);
  border-radius: 0.5rem;
  font-size: 1.3rem;
  outline: none;
  width: 100%;
`;
