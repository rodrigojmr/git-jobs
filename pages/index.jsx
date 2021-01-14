import React, { useState, useEffect } from 'react';
import Search from '@components/Search/Search';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient, useInfiniteQuery } from 'react-query';
import Result from '@components/Results/Result';
import SkeletonResult from '@components/Skeleton/SkeletonResult';
import { Button } from '@components/styled';

const LoadButton = styled(Button)`
  grid-column: 1 / -1;
  justify-self: center;
`;

const Results = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 750px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1080px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  grid-column-gap: 2rem;
  grid-row-gap: 4rem;
  padding: 2rem;
`;

const Home = () => {
  const { register, handleSubmit, control, reset } = useForm();

  const [searchParams, setSearchParams] = useState({
    text: '',
    location: '',
    fullTime: false
  });

  const queryClient = useQueryClient();

  const fetchJobs = async ({ queryKey, pageParam = 1 }) => {
    const [_key, text, location, fullTime] = queryKey;
    console.log(
      `https://jobs.github.com/positions.json?description=${text}&location=${location}&full_time=${fullTime}&page=${pageParam}`
    );
    try {
      const res = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://jobs.github.com/positions.json?description=${text}&location=${location}&full_time=${fullTime}&page=${pageParam}`
        )}`,
        { credentials: 'include' }
      );
      const data = await res.json();
      const results = {
        jobs: JSON.parse(data.contents),
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

  const onSubmit = async data => {
    const { text, location, fullTime } = data;
    setSearchParams({
      text,
      location,
      fullTime
    });
  };

  console.table(data);
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
