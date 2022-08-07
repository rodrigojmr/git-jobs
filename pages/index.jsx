import Result from '@components/Results/Result';
import Search from '@components/Search/Search';
import SkeletonResult from '@components/Skeleton/SkeletonResult';
import { Button } from '@components/styled';
import theme from '@components/Theme/theme';
import { useSession } from 'next-auth/client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import axios from 'axios';

const LoadButton = styled(Button)`
  grid-column: 1 / -1;
  justify-self: center;
`;

const Results = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${theme.breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: ${theme.breakpoints[2]}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: ${theme.breakpoints[3]}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  grid-column-gap: 2rem;
  grid-row-gap: 4rem;
  padding: 2rem;
`;

const Home = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const [session, loading] = useSession();

  const [searchParams, setSearchParams] = useState({
    text: '',
    location: '',
    fullTime: false
  });

  const queryClient = useQueryClient();

  const fetchJobs = async ({ queryKey, pageParam = 1 }) => {
    const [_key, text = '', location = '', fullTime = ''] = queryKey;

    try {
      const res = await axios.get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://jobs.github.com/positions.json?description=${text}&location=${location}&full_time=${fullTime}&page=${pageParam}`
        )}`,
        { withCredentials: true }
      );
      const data = await JSON.parse(res.data.contents);
      const results = {
        jobs: data,
        page: pageParam + 1
      };
      return results;
    } catch (error) {
      throw new Error('Could not fetch Jobs');
    }
  };

  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
    ['jobs', searchParams.text, searchParams.location, searchParams.fullTime],
    fetchJobs,
    {
      getNextPageParam: ({ jobs, page }) => {
        if (jobs.length === 50) {
          return page;
        }
        return false;
      }
    }
  );

  const getDbJobs = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await axios.get(`/api/jobs/${session.user.email}`);
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error("Couldn't fetch your saved jobs.");
    }
  };

  const sabedJobsQuery = useQuery('saved-jobs', getDbJobs);

  const onSubmit = async data => {
    const { text, location, fullTime } = data;
    setSearchParams({
      text,
      location,
      fullTime
    });
  };

  return (
    <>
      <Search onSubmit={handleSubmit(onSubmit)} ref={register} />
      <Results>
        {isFetching && (
          <>
            <SkeletonResult />
            <SkeletonResult />
            <SkeletonResult />
            <SkeletonResult />
            <SkeletonResult />
            <SkeletonResult />
            <SkeletonResult />
            <SkeletonResult />
            <SkeletonResult />
            <SkeletonResult />
            <SkeletonResult />
            <SkeletonResult />
          </>
        )}
        {data?.pages && (
          <>
            {data.pages.map(page =>
              page.jobs.map(job => <Result key={job.id} job={job} />)
            )}
            <LoadButton
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              primary
            >
              {hasNextPage ? 'Load More' : 'Loaded All Jobs!'}
            </LoadButton>
          </>
        )}
      </Results>
    </>
  );
};

export default Home;
