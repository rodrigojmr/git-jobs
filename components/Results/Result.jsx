import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';
import { randomBGIndex, timeDifference } from '../../utils';

const Container = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  padding-top: 0;
  min-height: 14rem;
  border-radius: 15px;
  background-color: var(--bg-secondary);
`;

const Badge = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  transform: translateY(-50%);
  font-weight: 800;
  background-color: ${({ theme, bgIndex }) => theme.bgColors[bgIndex]};
  line-height: 1;
`;

const Company = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 1.2rem;
`;

const Location = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-top: auto;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  line-height: 1.5;
  margin-top: 1.5rem;
  text-decoration: none;
`;

const Dot = styled.span`
  margin: 0 10px;
  font-size: 2rem;
  line-height: 0;
  margin-bottom: 5px;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const Result = ({ job }) => {
  return (
    <Container>
      <Badge bgIndex={randomBGIndex()}>
        <p>{job.company[0].toUpperCase()}</p>
      </Badge>
      <div
        css={`
          display: flex;
          align-items: center;
          margin-bottom: 2;
        `}
      >
        <p>{timeDifference(job.created_at)}</p>
        <Dot>·</Dot>
        <p>{job.type}</p>
      </div>
      <Title>
        <Link prefetch href={`/jobs/${job.id}`} passHref>
          <StyledLink>{job.title}</StyledLink>
        </Link>
      </Title>
      <Company>{job.company}</Company>
      <Location>{job.location}</Location>
    </Container>
  );
};

export default Result;
