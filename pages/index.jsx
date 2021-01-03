import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Search from '../components/Search/Search';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient, useInfiniteQuery } from 'react-query';

import React, { useState, useEffect } from 'react';

const Results = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 4rem;
  padding: 0 2rem;
`;

const Result = styled.article`
  padding: 0 1rem 1rem 1rem;
  min-height: 14rem;
  border-radius: 15px;
  background-color: var(--bg-secondary);
  &:not(:last-child) {
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;

const Home = () => {
  const { register, handleSubmit, control, reset } = useForm();

  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    text: '',
    location: '',
    fullTime: false
  });

  const queryClient = useQueryClient();

  const fetchJobs = async ({ queryKey, pageParams = 0 }) => {
    const [_key, text, location, fullTime] = queryKey;
    const res = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://jobs.github.com/positions.json?description=${text}&page=${pageParams}&location=${location}&full_time=${fullTime}`
      )}`
    );
    const data = await res.json();
    return JSON.parse(data.contents);
  };

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  } = useInfiniteQuery(
    ['jobs', searchParams.text, searchParams.location, searchParams.fullTime],
    fetchJobs,
    {
      getFetchMore: (lastGroup, allGroups) => lastGroup.nextPage
    }
  );

  const onSubmit = async data => {
    const { text, location, fullTime } = data;
    setSearchParams({
      text,
      location,
      fullTime
    });
    // Want to make a new query call to fetch new Jobs with different parameters

    // Using refetchOnWindowFocus uses the parameters from the new searchParams state,
    // but using useQueryCache.refetchQueries() here does not, as fetchJobs uses initial searchParams object
  };

  console.dir(data);

  return (
    <>
      <Search onSubmit={handleSubmit(onSubmit)} ref={register} />
      {data && (
        <Results>
          {data.pages[0].map(result => (
            <Result key={result.id} />
          ))}
        </Results>
      )}
    </>
  );
};

export default Home;
