import styled, { css } from 'styled-components';
import { Link } from 'next/link';

export const Heading = styled.h1`
  color: #222;
`;

export const Button = styled.button`
  text-decoration: none;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${props =>
    props.primary ? 'var(--color-primary)' : 'var(--bg-primary)'};
  color: ${props => (props.primary ? 'white' : 'var(--color-contrast)')};
  border: ${props =>
    `1px solid ${
      props.primary ? 'var(--color-primary) ' : 'var(--bg-primary)'
    }`};
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      filter: brightness(0.6);
    `}
`;

export const Flex = styled.div`
  display: flex;
`;

export const Dot = styled.span`
  margin: 0 10px;
  font-size: 2rem;
  line-height: 0;
  margin-bottom: 5px;
`;

export const HighlightText = styled.p`
  font-weight: 600;
  font-size: ${props => props.fontSize || '1rem'};
  color: var(--color-primary);
`;
