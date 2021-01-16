import React, { useState, useEffect, useRef } from 'react';
import FormInput from './Input';
import CheckBox from './CheckBox';
import { Button } from '@components/styled';
import { Wrapper, FormStyle, Child, Icon, CheckBoxStyle } from './Styles';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import Modal from 'styled-react-modal';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import useWindowWidth from 'utils/useWindowWidth';
import iseMediaQuery from 'utils/isMediaQuery';

const StyledModal = Modal.styled`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-color: var(--bg-primary);
`;

const ModalInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  input {
    background-color: transparent;
    padding: 0.3rem 0.5rem;
    border-bottom: 2px solid var(--color-grey-light);
  }

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const ModalCheckbox = styled(CheckBoxStyle)`
  border-bottom: 1px solid black;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    margin-top: -3px;
    margin-left: 3px;
  }
`;

const SearchLogoContainer = styled.div`
  padding: 1rem;
  cursor: pointer;
`;

const Search = React.forwardRef(({ onSubmit }, ref) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const refForm = useRef(null);
  const { handleSubmit } = useForm();

  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [fullTime, setFulltime] = useState(false);

  // Old attempt at conditional rendering media query
  // const width = useWindowWidth(0);
  // const [show, setShow] = useState(false);

  // useEffect(() => {
  //   setShow(width > 669);
  // }, [width]);

  const ModalFormSubmit = e => {
    handleSubmit(onSubmit)();
    setModalIsOpen(false);
  };

  const isSmallerThanLaptop = iseMediaQuery(1240);
  const isMobile = iseMediaQuery(669);

  return (
    <Wrapper>
      <FormStyle id="search-form" ref={refForm} onSubmit={onSubmit}>
        <Child flex="2">
          <Icon src="/assets/desktop/icon-search.svg" alt="Search" />
          <FormInput
            ref={ref}
            value={text}
            onChange={e => setText(e.target.value)}
            name="text"
            type="text"
            placeholder={
              isSmallerThanLaptop
                ? 'Filter by text...'
                : 'Filter by title, companies, expertise...'
            }
          />
        </Child>
        {!isMobile && (
          <>
            <Child flex="2">
              <Icon src="/assets/desktop/icon-location.svg" alt="Search" />
              <FormInput
                ref={ref}
                value={location}
                onChange={e => {
                  setLocation(e.target.value);
                }}
                name="location"
                type="text"
                placeholder="Filter by location..."
              />
            </Child>
            <Child flex="1.2">
              <CheckBoxStyle
                ref={ref}
                checked={fullTime}
                onChange={e => setFulltime(e.target.checked)}
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
        {isMobile && (
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
              <ModalInput>
                <Icon src="/assets/desktop/icon-location.svg" alt="Search" />
                <FormInput
                  value={location}
                  onChange={e => {
                    setLocation(e.target.value);
                  }}
                  ref={ref}
                  name="location"
                  type="text"
                  placeholder="Filter by location..."
                />
              </ModalInput>
              <ModalInput
                css={`
                  justify-content: center;
                  padding: 1rem;
                `}
              >
                <ModalCheckbox
                  ref={ref}
                  checked={fullTime}
                  onChange={e => setFulltime(e.target.checked)}
                  type="checkbox"
                  id="fullTime-input"
                  name="fullTime"
                />
                <label style={{ fontWeight: 600 }} htmlFor="fullTime-input">
                  Full Time
                </label>
              </ModalInput>
              <Button primary type="submit" onClick={ModalFormSubmit}>
                Search
              </Button>
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
