import Link from 'next/link';
import styled from 'styled-components';
import ThemeToggle from './ThemeToggle';
import { signIn, signOut, useSession } from 'next-auth/client';
import Image from 'next/image';
import GithubIcon from './github.svg';

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  padding-bottom: 4rem;
  @media screen and (max-width: 41em) {
    padding-bottom: 6rem;
  }
  @media (min-width: 769px) {
    background-image: url('/assets/desktop/bg-pattern-header.svg');
  }
  @media (max-width: 768px) {
    background-image: url('/assets/tablet/bg-pattern-header.svg');
  }
  @media (max-width: 600px) {
    background-image: url('/assets/mobile/bg-pattern-header.svg');
  }
  background-size: cover;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 5px;
  background-color: #2a2f36;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
`;

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const [session, loading] = useSession();

  return (
    <Head>
      <Link href="/">
        <FlexCenter>
          <img
            style={{ cursor: 'pointer' }}
            src="/assets/desktop/logo.svg"
            alt="Logo"
          />
        </FlexCenter>
      </Link>
      <FlexCenter style={{ marginLeft: 'auto' }}>
        <ThemeToggle />
      </FlexCenter>
      {!session && (
        <>
          <Button onClick={() => signIn()}>
            <GithubIcon />
            <span style={{ marginLeft: '10px' }}>Sign in</span>
          </Button>
        </>
      )}
      {session && (
        <>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )}
    </Head>
  );
};

export default Header;
