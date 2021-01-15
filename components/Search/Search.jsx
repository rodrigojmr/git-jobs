import React, { useState } from 'react';
import FormInput from './Input';
import CheckBox from './CheckBox';
import { Button } from '@components/styled';
import { Wrapper, FormStyle, Child, Icon, CheckBoxStyle } from './Styles';
import { useMediaQuery } from 'react-responsive';
import Modal from 'styled-react-modal';
import styled from 'styled-components';
import Image from 'next/image';

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
`;

const SearchLogoContainer = styled.div`
  padding: 1rem;
  cursor: pointer;
`;

const Search = React.forwardRef(({ onSubmit }, ref) => {
  const isSmallerThanLaptop = useMediaQuery({ query: '(max-width: 1240px)' });
  const isPhone = useMediaQuery({ query: '(max-width: 670px' });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Wrapper>
      <FormStyle onSubmit={onSubmit}>
        <Child flex="2">
          <Icon src="/assets/desktop/icon-search.svg" alt="Search" />
          <FormInput
            ref={ref}
            name="text"
            type="text"
            placeholder={
              isSmallerThanLaptop
                ? 'Filter by text...'
                : 'Filter by title, companies, expertise...'
            }
          />
        </Child>
        {!isPhone && (
          <>
            <Child flex="2">
              <Icon src="/assets/desktop/icon-location.svg" alt="Search" />
              <FormInput
                ref={ref}
                name="location"
                type="text"
                placeholder="Filter by location..."
              />
            </Child>
            <Child flex="1.2">
              <CheckBoxStyle
                ref={ref}
                type="checkbox"
                id="fullTime-input"
                name="fullTime"
              />
              <label
                style={{ fontSize: '1rem', fontWeight: 600 }}
                htmlFor="fullTime-input"
              >
                Full Time
              </label>
            </Child>
          </>
        )}
        {isPhone && (
          <>
            <SearchLogoContainer onClick={() => setModalIsOpen(!modalIsOpen)}>
              <Image
                src="/assets/mobile/icon-filter.svg"
                width="30"
                height="30"
              />
            </SearchLogoContainer>
            <StyledModal
              isOpen={modalIsOpen}
              onBackgroundClick={() => setModalIsOpen(!modalIsOpen)}
              onEscapeKeydown={() => setModalIsOpen(!modalIsOpen)}
            >
              <span>I am a modal!</span>
              <button onClick={() => setModalIsOpen(false)}>Close me</button>
            </StyledModal>
          </>
        )}
        <Button type="submit" primary>
          Search
        </Button>
      </FormStyle>
    </Wrapper>
  );
});
export default Search;
