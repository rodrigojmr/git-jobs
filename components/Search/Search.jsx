import React from 'react';
import FormInput from './Input';
import CheckBox from './CheckBox';
import { Wrapper, FormStyle, Child, Icon, CheckBoxStyle } from './Styles';
import Button from '../Button';

const Search = React.forwardRef(({ onSubmit }, ref) => {
  return (
    <Wrapper>
      <FormStyle onSubmit={onSubmit}>
        <Child>
          <Icon src="/assets/desktop/icon-search.svg" alt="Search" />
          <FormInput
            ref={ref}
            name="text"
            type="text"
            placeholder="Filter by text..."
          />
        </Child>
        <Child>
          <Icon src="/assets/desktop/icon-location.svg" alt="Search" />
          <FormInput
            ref={ref}
            name="location"
            type="text"
            placeholder="Filter by location..."
          />
        </Child>
        <Child>
          <CheckBoxStyle
            ref={ref}
            type="checkbox"
            id="fullTime-input"
            name="fullTime"
          />
          <label
            style={{ fontSize: '1.2rem', fontWeight: 600 }}
            htmlFor="fullTime-input"
          >
            Full Time Only
          </label>
        </Child>
        <Button primary={true}>Search</Button>
      </FormStyle>
    </Wrapper>
  );
});
export default Search;
