import styled, { css, keyframes } from 'styled-components';
import SkeletonElement from './SkeletonElement';
import { randomBGIndex } from 'utils';

const pulse = keyframes`
  0% {
		opacity: .5
	}

	50% {
	opacity: 1;
	}

	100% {
	opacity: .5;
	}
`;

const Container = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  padding-top: 0;
  min-height: 14rem;
  border-radius: 15px;
  background-color: var(--bg-secondary);
  animation: ${pulse} infinite 1.3s;
`;

const Badge = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  transform: translateY(-50%);
  font-weight: 800;
  background-color: ${({ theme, bgIndex }) => theme.bgColors[bgIndex]};
  line-height: 1;
`;

const SkeletonResult = () => {
  return (
    <Container>
      <Badge bgIndex={randomBGIndex()}></Badge>
      <div
        css={`
          display: flex;
          align-items: center;
          margin-bottom: 2;
        `}
      >
        <SkeletonElement type="text" width="130" />
      </div>
      <SkeletonElement type="title" />
      <SkeletonElement type="text" width="150" />
      <SkeletonElement type="text" width="100" />
    </Container>
  );
};

export default SkeletonResult;
