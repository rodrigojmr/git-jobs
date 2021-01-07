import styled from 'styled-components';
import { Link } from 'next/link';

export const Heading = styled.h1`
  color: #222;
`;

export const Button = styled.button`
  display: inline-block;
  padding: 1rem 1.25rem;
  font-weight: 600;
  border-radius: 5px;
  color: ${props => (props.primary ? 'white' : 'var(--color-primary)')};
  text-decoration: none;
  background-color: ${props =>
    props.primary ? 'var(--color-primary)' : '#EEEFFA'};
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
