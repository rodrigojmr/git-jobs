import React from 'react';

const Box = styled.input`
  appearance: none;
  display: inline-block;
  height: 1.5rem;
  width: 1.5rem;

  background-origin: border-box;
  color: #3f83f8;
  border: 1px solid var(--color-grey);
  border-width: 1px;
  border-radius: 0.25rem;
  border-color: var(--color-primary);
  background-color: var(--bg-primary);
  cursor: pointer;
  outline: none;

  transition: all 0.3s;

  &:checked {
    background-color: var(--color-primary);
  }

  &:after {
    content: '';
    background-color: #fff;
    display: inline-block;
    margin-left: 10px;
    padding-bottom: 5px;
    color: #00bff0;
    width: 22px;
    height: 25px;
    visibility: visible;
    border: 1px solid #00bff0;
    padding-left: 3px;
    border-radius: 5px;
  }

  &:checked:after {
    content: '&#10003';
    padding: -5px;
    font-weight: bold;
  }
`;

const Checkbox = () => {
  return (
    <Box ref={ref} type="checkbox" id="fullTime-input" name="fullTime">
      <span></span>
      <label
        style={{ fontSize: '1.2rem', fontWeight: 600 }}
        htmlFor="fullTime-input"
      >
        Full Time Only
      </label>
    </Box>
  );
};

export default Checkbox;
