import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: none;
`;

const Input = styled.input`
  position: relative;
  width: 100%;
  padding: 0.5rem;
  line-height: 2;
  background-color: var(--bg-secondary);
  color: var(--color-grey);
  border: none;
  outline: none;
  font-size: 1.1rem;
  border-bottom: 2px solid var(--bg-secondary);
  &::-webkit-input-placeholder {
    color: var(--color-grey-light);
  }

  &:focus::-webkit-input-placeholder {
    color: var(--color-primary);
  }

  &:focus {
    border-color: var(--color-primary);
  }
`;

const FormInput = React.forwardRef(
  (
    {
      className = '',
      name,
      placeholder = '',
      type = text,
      checkboxValue = false,
      onChange,
      value,
      children
    },
    ref
  ) => {
    return (
      <>
        <Label htmlFor={`${name}-input`}>{name}</Label>
        <Input
          id={`${name}-input`}
          ref={ref}
          onChange={onChange}
          value={value || ''}
          className={className}
          type={type}
          name={name}
          checkboxValue={checkboxValue || null}
          placeholder={placeholder}
        />
      </>
    );
  }
);

export default FormInput;
