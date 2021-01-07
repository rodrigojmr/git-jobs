import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import Image from 'next/image';
import {
  Button,
  Flex,
  Heading,
  Dot,
  HighlightText
} from '../../components/styled';
import { timeDifference } from '../../utils';

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
  background-color: white;
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
  background-color: white;
`;

const Description = styled.article`
  margin-top: 2rem;
  line-height: 1.5;
  p {
    margin-top: 1.25em;
    margin-bottom: 1.25em;
  }
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
                <div>
                  <p>
                    <span>{timeDifference(job.created_at)}</span>
                    <Dot>·</Dot>
                    <span>{job.type}</span>
                  </p>
                  <Heading
                    css={`
                      margin-top: 1rem;
                      margin-bottom: 1rem;
                    `}
                  >
                    {job.title}
                  </Heading>
                  <HighlightText>{job.location}</HighlightText>
                </div>
                <Button
                  primary
                  css={`
                    margin-left: auto;
                  `}
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
          </>
        )}
      </Container>
    </Main>
  );
};

export default JobDetails;
