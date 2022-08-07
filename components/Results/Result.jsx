import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';
import { randomBGIndex, timeDifference } from 'utils';
import { Dot } from '@components/styled';
import { signIn, signOut, useSession } from 'next-auth/client';
import HeartIcon from '../heart.svg';
import { useMutation } from 'react-query';
import axios from 'axios';

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
  p {
    color: white;
  }
`;

const Company = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 1.2rem;
  line-height: 1.5;
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

const StyledLink = styled.a`
  text-decoration: none;
`;

const SaveButton = styled.button`
  position: absolute;
  padding: 0.8rem;
  right: 0;
  top: 0;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ checked }) => (checked ? 'red' : 'rgba(237, 71, 59, 0.9)')};
  cursor: pointer;

  &:hover svg {
    fill: rgba(237, 71, 59, 0.8);
  }
`;

const Result = ({ job }) => {
  const [session, loading] = useSession();
  const createMutation = useMutation(newJob => axios.post(`/api/jobs`, newJob));
  const deleteMutation = useMutation(jobToDelete =>
    axios.delete(`/api/jobs`, jobToDelete)
  );

  return (
    <Container>
      <Badge bgIndex={randomBGIndex(job.company.charAt(0))}>
        <p>{job.company[0].toUpperCase()}</p>
      </Badge>
      {session && (
        <SaveButton
          aria-label="Save job"
          onClick={() => {
            createMutation.mutate(job);
          }}
        >
          <HeartIcon />
        </SaveButton>
      )}
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
        <Link href={`/jobs/${job.id}`} passHref>
          <StyledLink>{job.title}</StyledLink>
        </Link>
      </Title>
      <Company>{job.company}</Company>
      <Location>{job.location}</Location>
    </Container>
  );
};

export default Result;
