import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Search from '../components/Search/Search';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import {
  useInfiniteQuery,
  queryCache,
  useQueryCache,
  useMutation
} from 'react-query';

import React, { useState, useEffect } from 'react';

const Results = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 4rem;
`;

const Result = styled.article`
  padding: 0 1rem 1rem 1rem;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: var(--bg-secondary);
  &:not(:last-child) {
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;

const Home = () => {
  const cache = useQueryCache();
  const { register, handleSubmit, control, reset } = useForm();

  // const fetchJobs = (key, page = 0) => {
  //   const { text, location, fullTime } = searchParams;
  //   return fetch(
  //     `https://api.allorigins.win/get?url=${encodeURIComponent(
  //       `https://jobs.github.com/positions.json?description=${text}&page=${page}&location=${location}&full_time=${fullTime}`
  //     )}`
  //   )
  //     .then(res => res.json())
  //     .then(data => JSON.parse(data.contents));
  // };

  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    text: '',
    location: '',
    fullTime: false
  });

  const [mutate, { isLoading, error, data }] = useMutation(
    async (params = searchParams) => {
      const { text, location, fullTime } = params;
      const res = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://jobs.github.com/positions.json?page=${page}&description=${text}&location=${location}&full_time=${fullTime}`
        )}`
      );
      const data = await res.json();
      return JSON.parse(data.contents);
    }
  );

  // * useInfiniteQuery attempt
  // const fetchJobs = async (key, page = 1, searchParams) => {
  //   const { text, location, fullTime } = searchParams;
  //   console.log('searchParams: ', searchParams);
  //   try {
  //     const res = await fetch(
  //       `https://api.allorigins.win/get?url=${encodeURIComponent(
  //         `https://jobs.github.com/positions.json?description=${text}&page=${page}&location=${location}&full_time=${fullTime}`
  //       )}`
  //     );
  //     const json = await res.json();
  //     const results = JSON.parse(await json.contents);
  //     return {
  //       results,
  //       nextPage: page + 1
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const {
  //   status,
  //   data,
  //   error,
  //   isFetching,
  //   isFetchingMore,
  //   fetchMore,
  //   canFetchMore
  // } = useInfiniteQuery('jobs', () => fetchJobs('jobs', page, searchParams), {
  //   getFetchMore: (lastGroup, allGroups) => lastGroup.nextPage
  // });

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

  console.log(data);

  return (
    <>
      <Search onSubmit={handleSubmit(onSubmit)} ref={register} />
      {data && (
        <Results>
          {data[0].results.map(result => (
            <Result key={result.id} />
          ))}
        </Results>
      )}
    </>
  );
};

export default Home;
