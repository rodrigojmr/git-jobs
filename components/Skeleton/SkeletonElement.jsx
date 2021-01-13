import styled, { keyframes, css } from 'styled-components';
import { randomNum } from 'utils';

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

const Skeleton = styled.div`
  background: #ddd;
  margin: 10px 0;
  border-radius: 4px;
  animation: ${pulse} infinite 1.3s;

  ${props => {
    switch (props.type) {
      case 'text':
        return `
        width: ${props.width ? `${props.width}` : `${randomNum(80, 100)}%`};
        height: 12px;
        `;
      case 'title':
        return `
        width: ${props.width ? `${props.width}` : `50%`};
        height: 20px;
        margin-bottom: 15px;
        `;
      case 'avatar':
        return `
        width: 100px;
        height: 100px;
        border-radius: 50%;
        `;
      case 'thumbnail':
        return `
        width: 100px;
        height: 100px;
        `;
      case 'button':
        return `
        width: 150px;
        height: 50px;
        `;
      default:
        break;
    }
  }}
`;

const SkeletonElement = ({ type, width }) => {
  return <Skeleton type={type} width={width} />;
};

export default SkeletonElement;
