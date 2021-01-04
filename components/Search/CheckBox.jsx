import React from 'react';
import { CheckBoxStyle } from './Styles';

const CheckBox = ({ ref }) => {
  return (
    <CheckBoxStyle
      ref={ref}
      type="checkbox"
      id="fullTime-input"
      name="fullTime"
    />
  );
};

export default CheckBox;
