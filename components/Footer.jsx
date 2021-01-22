import React from 'react';
import styled from 'styled-components';
import LinkedinLogo from './linkedin.svg';

const Container = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-primary);
  padding: 1rem 2rem;
`;

const Footer = () => {
  return (
    <Container>
      <a
        target="_blank"
        href="https://www.frontendmentor.io/challenges/github-jobs-api-93L-NL6rP"
      >
        Based on the Frontend Mentor challenge.
      </a>
      <span>
        Made by{' '}
        <a
          css={`
            margin-right: 10px;
          `}
          target="_blank"
          href="https://github.com/rodrigojmr"
        >
          Rodrigo Moura.
        </a>
        <a
          href="https://www.linkedin.com/in/rodrigo-jorge-moura/"
          target="_blank"
        >
          <LinkedinLogo width="20px" height="20px" stroke="var(--color-grey)" />
        </a>
      </span>
    </Container>
  );
};

export default Footer;
