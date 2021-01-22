import Link from 'next/link';
import styled from 'styled-components';
import ThemeToggle from './ThemeToggle';

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

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <Head>
      <Link href="/">
        <img
          style={{ cursor: 'pointer' }}
          src="/assets/desktop/logo.svg"
          alt="Logo"
        />
      </Link>
      <FlexCenter>
        <ThemeToggle />
      </FlexCenter>
    </Head>
  );
};

export default Header;
