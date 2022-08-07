import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import Image from 'next/image';
import { Button, Flex, Heading, Dot, HighlightText } from '@components/styled';
import { timeDifference } from 'utils';
import SkeletonJobView from '@components/Skeleton/SkeletonJobView';
import { randomBGIndex } from 'utils';
import axios from 'axios';

const Main = styled.main`
  position: relative;
`;

const Container = styled.div`
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: 80%;
  width: 40rem;
  > * {
    margin-bottom: 1.5rem;

    border-radius: 5px;
    /* overflow: hidden; */
  }

  @media screen and (max-width: 41em) {
    top: -1rem;
  }
`;

const CompanyInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--bg-secondary);
  height: 100%;
`;

const Logo = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  width: 10rem;
  line-height: 1;
  background-color: ${({ theme, bgIndex }) => theme.bgColors[bgIndex]};

  @media screen and (max-width: 41em) {
    position: absolute;
    width: 5rem;
    height: 5rem;
    top: -2.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    border-radius: 2rem;

    span {
      margin-bottom: -0.5rem;
      line-height: 5rem;
    }
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 3.5rem 2.5rem;
  > p {
    color: #9297a2;
  }

  @media screen and (max-width: 41em) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding-top: 5rem;
  }
`;

const DescriptionWrapper = styled.div`
  padding: 3rem 2rem;
  background-color: var(--bg-secondary);

  strong {
    color: var(--color-contrast);
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
  li:last-child {
    margin-bottom: 1.25em;
  }
`;

const ApplySection = styled(DescriptionWrapper)`
  color: var(--bg-secondary);
  background-image: url('/assets/desktop/bg-pattern-detail-footer.svg');
  background-size: cover;
  word-wrap: break-word;

  p,
  span,
  a {
    color: white;
    line-height: 1.5;
  }
  /* a:hover {
    color: ;
  } */
`;

const JobDetails = () => {
  const router = useRouter();
  const jobId = router.query.id;

  const { isLoading, error, data } = useQuery(`job-${jobId}-data`, async () => {
    try {
      const res = await axios.get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://thingproxy.freeboard.io/fetch/https://jobs.github.com/positions/${jobId}.json`
        )}`
      );
      const data = await JSON.parse(res.data.contents);
      return data;
    } catch (error) {
      throw new Error('Could not fetch job.');
    }
  });

  const job = data;
  const url = data?.company_url?.replace(/(https:|http:|www.|\/)/g, '');
  const applyUrl = job?.how_to_apply.match(/href="(.*)"/)[1];

  if (isLoading) return <SkeletonJobView />;

  return (
    <Main>
      <Container>
        {data && (
          <>
            <CompanyInfo>
              <>
                <Logo bgIndex={randomBGIndex(job.company.charAt(0))}>
                  <span>{job.company.charAt(0).toUpperCase()}</span>
                </Logo>
                <Info>
                  <div
                    css={`
                      margin-right: auto;
                      @media screen and (max-width: 41em) {
                        margin-right: 0;
                        margin-bottom: 2rem;
                      }
                    `}
                  >
                    <Heading
                      css={`
                        color: var(--extra-constrast);
                        margin-bottom: 0.8rem;
                        line-height: 1;
                      `}
                      as="h3"
                    >
                      {data.company}
                    </Heading>
                    <p>{url}</p>
                  </div>
                  <Button
                    css={`
                      flex-shrink: 0;
                      margin-left: 1rem;
                    `}
                    as="a"
                    href={job.company_url}
                  >
                    Company Site
                  </Button>
                </Info>
              </>
            </CompanyInfo>
            <DescriptionWrapper>
              <Flex
                css={`
                  align-items: center;
                  @media screen and (max-width: 41em) {
                    flex-direction: column;
                  }
                `}
              >
                <div
                  css={`
                    margin-right: auto;
                    @media screen and (max-width: 41em) {
                      margin-bottom: 2rem;
                    }
                  `}
                >
                  <p>
                    <span>{timeDifference(job.created_at)}</span>
                    <Dot>·</Dot>
                    <span>{job.type}</span>
                  </p>
                  <Heading
                    css={`
                      color: var(--extra-constrast);
                      margin-top: 1rem;
                      margin-bottom: 1rem;
                    `}
                  >
                    {job.title}
                  </Heading>
                  <HighlightText>{job.location}</HighlightText>
                </div>
                <Button
                  css={`
                    @media screen and (max-width: 41em) {
                      width: 100%;
                      text-align: center;
                    }
                  `}
                  primary
                  as="a"
                  href={applyUrl}
                >
                  Apply Now
                </Button>
              </Flex>
              <Description
                dangerouslySetInnerHTML={{
                  __html: job.description || ''
                }}
              ></Description>
            </DescriptionWrapper>
            <ApplySection>
              <Heading
                css={`
                  color: white;
                  margin-bottom: 1rem;
                `}
                as="h4"
              >
                How to Apply
              </Heading>
              <div
                dangerouslySetInnerHTML={{
                  __html: job.how_to_apply || ''
                }}
              ></div>
            </ApplySection>
          </>
        )}
      </Container>
    </Main>
  );
};

export default JobDetails;
