import { useContext, useRef } from 'react';
import { ThemeContext } from './Theme/ThemeContext';
import styled from 'styled-components';

const CheckBox = styled.span`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 4rem;
  cursor: pointer;
  /* width: 3rem; */
  background-color: #fff;
  border-color: transparent;
  border-width: 2px;
  border-radius: 15px;
  padding: 0.25rem;
  margin: 0 1rem;
  &:focus {
    box-shadow: 0 0 0 3px rgba(118, 169, 250, 0.45);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const Icon = styled.img`
  align-self: center;
`;

const ThemeIndicator = styled.span`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: inline-block;
  background-color: var(--color-primary);
  transition: all 0.15s ease-out;
  transform: ${({ colorMode }) =>
    colorMode === 'dark' ? `translateX(2.2rem)` : `translateX(0px)`};
`;

const ThemeToggle = () => {
  const { colorMode, setColorMode } = useContext(ThemeContext);

  const checkboxRef = useRef();

  const toggleCheckbox = e => {
    const state = checkboxRef.current
      .getAttribute('aria-checked')
      .toLowerCase();
    e.preventDefault();
    if (e.type === 'click' || (e.type === 'keydown' && e.keyCode === 32)) {
      if (state === 'true') {
        checkboxRef.current.setAttribute('aria-checked', 'false');
        setColorMode('light');
      } else {
        checkboxRef.current.setAttribute('aria-checked', 'true');
        setColorMode('dark');
      }
    }
  };

  return (
    <>
      <img
        style={{ display: 'block' }}
        src="/assets/desktop/icon-sun.svg"
        alt="Light Mode"
      />
      <CheckBox
        ref={checkboxRef}
        role="checkbox"
        aria-checked={colorMode === 'dark'}
        onClick={toggleCheckbox}
      >
        <ThemeIndicator aria-hidden="true" colorMode={colorMode} />
      </CheckBox>
      <img
        style={{ display: 'block' }}
        src="/assets/desktop/icon-moon.svg"
        alt="Dark Mode"
      />
    </>
  );
};

export default ThemeToggle;
