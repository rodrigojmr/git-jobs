import React from 'react';
import styled from 'styled-components';
import FormInput from './Input';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2rem;
  padding: 0 0.5rem;
  transform: translateY(-50%);
  background-color: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
`;

const Child = styled.div`
  padding: 1rem 0.7rem;
  display: flex;
  flex: 1 1;
  display: flex;
  align-items: center;
`;
const Icon = styled.img`
  align-self: Center;
  margin-right: 15px;
`;

const Search = React.forwardRef((props, ref) => {
  return (
    <Wrapper>
      <Child>
        <Icon src="/assets/desktop/icon-search.svg" alt="Search" />
        <FormInput
          ref={ref}
          label="text"
          type="text"
          placeholder="Filter by text..."
        />
      </Child>
      <Child>
        <Icon src="/assets/desktop/icon-location.svg" alt="Search" />
        <FormInput
          ref={ref}
          label="location"
          type="text"
          placeholder="Filter by location..."
        />
      </Child>
      <Child>
        <input ref={ref} type="checkbox" id="fullTime-input" name="fullTime" />
        <label
          style={{ fontSize: '1.2rem', fontWeight: 600 }}
          htmlFor="fullTime-input"
        >
          Full Time Only
        </label>
      </Child>
    </Wrapper>
  );
});
export default Search;
