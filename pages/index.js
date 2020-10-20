import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Search from '../components/Search';
import { useForm, Controller } from 'react-hook-form';

const Home = () => {
  const { register, handleSubmit, control, reset } = useForm();

  return <Search ref={register} />;
};

export default Home;
