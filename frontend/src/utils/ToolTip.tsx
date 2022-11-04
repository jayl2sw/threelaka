import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

// ToolTip prop type 지정
interface ToolTipType {
  message: string;
  paddingSize: string;
  fontSize: string;
  fontColor: 'white' | 'grey' | 'black' | 'blue';
  backgroundColor: 'blue' | 'gradient' | 'black';
  // theDirection: 'top' | 'right' | 'bottom' | 'left';
}

// ToolTip Styling을 위한 type 지정
interface ToolTipStyleProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  // widthSize: string;
  // heightSize: string;
  paddingSize: string;
  fontColor: 'white' | 'grey' | 'black' | 'blue';
  fontSize: string;
  backgroundColor: 'blue' | 'gradient' | 'black';
}

const ToolTip = ({
  children,
  message,
  paddingSize,
  fontSize,
  fontColor,
  backgroundColor,
}: PropsWithChildren<ToolTipType>) => {
  return (
    <ToolTipContainer
      paddingSize={paddingSize}
      fontSize={fontSize}
      fontColor={fontColor}
      backgroundColor={backgroundColor}
    >
      {children}
      <ToolTipContent className="tooltip">{message}</ToolTipContent>
    </ToolTipContainer>
  );
};

const ToolTipContainer = styled.div<ToolTipStyleProps>`
  padding: ${(props) => props.paddingSize};
  font-size: ${(props) => props.fontSize};
  color: ${(props) =>
    props.fontColor === 'white'
      ? '#ffffff'
      : props.fontColor === 'grey'
      ? '#9897a9'
      : props.fontColor === 'black'
      ? '#111111'
      : props.fontColor === 'blue'
      ? '#4a9fff'
      : '#111111'};
  background: ${(props) =>
    props.backgroundColor === 'blue'
      ? '#4a9fff'
      : props.backgroundColor === 'gradient'
      ? 'linear-gradient(106.62deg, #83BDFF 8.18%, rgba(136, 192, 255, 0.90051) 49.26%, #8DC2FF 69.16%, #C1FFA9 92.42%);'
      : props.backgroundColor === 'black'
      ? '#111111'
      : props.backgroundColor === 'grey'
      ? '#9897a9'
      : '#4a9fff'};
  position: relative;
  width: 5vw;
  height: fit-conttent;
  border-radius: 1vmin;

  :hover > .tooltip,
  :active > .tooltip {
    display: block;
  }

  @keyframes animate {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ToolTipContent = styled.div`
  display: none;
  position: absolute;
  z-index: 200;
`;

export default ToolTip;
