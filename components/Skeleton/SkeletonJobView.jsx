import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Button, Flex, Heading, Dot, HighlightText } from '@components/styled';
import { timeDifference } from 'utils';
import SkeletonElement from './SkeletonElement';

const Main = styled.main`
  position: relative;
`;

const Container = styled.div`
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 40rem;
  > * {
    border-radius: 5px;
    overflow: hidden;
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  background-color: var(--bg-secondary);
  height: 100%;
`;

const Logo = styled.div`
  align-self: stretch;
  width: 10rem;
  background-color: grey;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 3.5rem 2.5rem;
  > p {
    color: #9297a2;
  }
`;

const DescriptionWrapper = styled.div`
  padding: 3rem 2rem;
  background-color: var(--bg-secondary);

  strong {
    color: #222;
  }
  ul {
    list-style-position: inside;
  }
  li {
    padding-inline-start: 15px;
    color: #9297a2;
  }
  li::before {
    content: '';
    margin-left: 0.5rem;
  }
`;

const Description = styled.article`
  margin-top: 2rem;
  line-height: 1.5;
  p {
    margin-top: 1.25em;
    margin-bottom: 1.25em;
  }
`;

const ApplySection = styled(DescriptionWrapper)`
  color: var(--bg-secondary);
  background-color: var(--color-primary);
  p,
  span,
  a {
    color: white;
    line-height: 1.5;
  }
  a:hover {
    color: ;
  }
`;

const SkeletonJobView = () => {
  return (
    <Main>
      <Container>
        <CompanyInfo>
          <>
            <Logo />
            <Info>
              <div
                css={`
                  width: 70%;
                `}
              >
                <SkeletonElement type="title" width="70%" />
                <SkeletonElement type="text" width="30%" />
              </div>
              <SkeletonElement type="button" />
            </Info>
          </>
        </CompanyInfo>
        <DescriptionWrapper>
          <Flex
            css={`
              align-items: center;
            `}
          >
            <div
              css={`
                width: 70%;
              `}
            >
              <SkeletonElement type="text" width="30%" />
              <SkeletonElement type="title" width="70%" />
              <SkeletonElement type="text" width="30%" />
            </div>
            <SkeletonElement type="button" />
          </Flex>
          <Description>
            <SkeletonElement type="title" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <span
              css={`
                display: inline-block;
              `}
            ></span>
            <SkeletonElement type="title" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <span
              css={`
                display: inline-block;
              `}
            ></span>
            <SkeletonElement type="title" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
          </Description>
        </DescriptionWrapper>
        <ApplySection>
          <SkeletonElement type="title" />

          <div>
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
          </div>
        </ApplySection>
      </Container>
    </Main>
  );
};

export default SkeletonJobView;
