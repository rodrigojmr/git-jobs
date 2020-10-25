import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Search from '../components/Search/Search';
import { useForm, Controller } from 'react-hook-form';
import { useInfiniteQuery, queryCache, useQueryCache } from 'react-query';

import React, { useState } from 'react';

const Home = () => {
  const cache = useQueryCache();
  const { register, handleSubmit, control, reset } = useForm();
  const [page, setPage] = useState(0);

  const [searchParams, setSearchParams] = useState({
    text: '',
    location: '',
    fullTime: false
  });

  const fetchJobs = (key, page = 0) => {
    console.log('searchParams: ', searchParams);
    const { text, location, fullTime } = searchParams;
    return fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://jobs.github.com/positions.json?description=${text}&page=${page}&location=${location}&full_time=${fullTime}`
      )}`
    )
      .then(res => res.json())
      .then(data => JSON.parse(data.contents));
  };

  const useJobs = () => {
    return useInfiniteQuery('jobs', fetchJobs, {
      getFetchMore: (lastGroup, allGroups) => page + 1
    });
  };

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  } = useJobs(searchParams);

  const onSubmit = async data => {
    const { text, location, fullTime } = data;
    setSearchParams({
      text,
      location,
      fullTime
    });
    cache.refetchQueries(['jobs']);
  };

  console.log(data);

  return (
    <>
      <Search onSubmit={handleSubmit(onSubmit)} ref={register} />
      {isFetching && <p>Loading...</p>}
      {data && <p>Got data</p>}
    </>
  );
};

export default Home;
