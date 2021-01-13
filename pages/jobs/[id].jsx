import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import Image from 'next/image';
import { Button, Flex, Heading, Dot, HighlightText } from '@components/styled';
import { timeDifference } from 'utils';
import SkeletonJobView from '@components/Skeleton/SkeletonJobView';

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
    margin-bottom: 1.5rem;

    border-radius: 5px;
    overflow: hidden;
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
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
  /* a:hover {
    color: ;
  } */
`;

const JobDetails = () => {
  const router = useRouter();
  const jobId = router.query.id;

  const { isLoading, error, data } = useQuery(`job-${jobId}-data`, async () => {
    try {
      const res = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://thingproxy.freeboard.io/fetch/https://jobs.github.com/positions/${jobId}.json`
        )}`
      );
      const data = await res.json();
      if (data.status.http_code === 200) {
        console.log('JSON.parse(data.contents): ', JSON.parse(data.contents));
        return JSON.parse(data.contents);
      }
    } catch (error) {
      console.log('error: ', error);
      throw new Error('Could not fetch job.');
    }
  });

  const job = data;
  const url = data?.company_url?.replace(/(https:|http:|www.|\/)/g, '');
  const applyUrl = job?.how_to_apply.match(/href="(.*)"/)[1];
  console.log('applyUrl: ', applyUrl);

  if (isLoading) return <SkeletonJobView />;

  return (
    <Main>
      <Container>
        {data && (
          <>
            <CompanyInfo>
              <>
                <Logo />
                <Info>
                  <div>
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
                      margin-left: auto;
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
                `}
              >
                <div
                  css={`
                    margin-right: auto;
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
                <Button primary as="a" href={applyUrl}>
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
