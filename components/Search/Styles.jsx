import theme from '@components/Theme/theme';
import styled from 'styled-components';

export const Wrapper = styled.div`
  transform: translateY(-50%);
  background-color: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  margin: 0 2rem;
`;

export const FormStyle = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

export const Child = styled.div`
  padding: 1rem;
  display: flex;
  flex: ${({ flex }) => flex};
  display: flex;
  align-items: center;
  @media screen and (min-width: 670px) {
    &:nth-child(1),
    &:nth-child(2) {
      border-right: 1px solid var(--color-grey-light);
    }
  }
`;

export const Icon = styled.img`
  align-self: Center;
  margin-right: 15px;
`;

export const CheckBoxStyle = styled.input`
  appearance: none;
  position: relative;
  display: inline-block;
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  outline: none;
  border: 1px solid var(--color-grey);
  color: #3f83f8;
  background-origin: border-box;
  border-radius: 0.25rem;
  transition: all 0.3s;
  margin-right: 20px;
  &:checked {
    background-color: var(--color-primary);
  }
  &::after {
    content: '';
    display: inline-block;
    font-size: 15px;
    margin-left: 2px;
    color: white;
    visibility: visible;
    padding-left: 3px;
    border-radius: 5px;
  }

  &:checked::after {
    content: '\\2713';
    font-weight: bold;
  }
`;
