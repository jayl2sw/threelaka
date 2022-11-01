import styled from 'styled-components';

interface CommonDivProps {
  widthSize: string;
  heightSize: string;
  paddingSize: string;
  fontColor: 'white' | 'grey' | 'black' | 'blue';
  fontSize: string;
}

export const MainBox = styled.div<CommonDivProps>`
  width: ${(props) => props.widthSize};
  height: ${(props) => props.heightSize};
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
  background: #ffffff;
  box-shadow: 5px 5px 5px rgba(63, 39, 102, 0.25);
  border-radius: 2vmin;
`;

export const MainPaleBox = styled.div<CommonDivProps>`
  width: ${(props) => props.widthSize};
  height: ${(props) => props.heightSize};
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
  background: #ffffff;
  opacity: 0.35;
  box-shadow: 5px 5px 5px rgba(63, 39, 102, 0.25);
  border-radius: 2vmin;
  /* border-image: linear-gradient(
    106.62deg,
    #83bdff 8.18%,
    rgba(88, 172, 240, 0.861458) 45.03%,
    #c1ffa9 92.42%
  ); */
  &.gradient-border-2 {
    border: 3px
      linear-gradient(
        106.62deg,
        #83bdff 8.18%,
        rgba(88, 172, 240, 0.861458) 45.03%,
        #c1ffa9 92.42%
      )
      solid transparent;
  }
  &.gradient-border-4 {
  }
  &.gradient-border-6 {
  }
`;

export const BackBlurBox = styled.div<CommonDivProps>`
  width: ${(props) => props.widthSize};
  height: ${(props) => props.heightSize};
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
  background: #ffffff;
  box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
  border-radius: 2vmin;
`;

export const BackBlurPaleBox = styled.div<CommonDivProps>`
  width: ${(props) => props.widthSize};
  height: ${(props) => props.heightSize};
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
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
  border-radius: 2vmin;
`;

export const SentenceBox = styled.div<CommonDivProps>`
  width: ${(props) => props.widthSize};
  height: ${(props) => props.heightSize};
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
  background: rgba(192, 215, 240, 0.2);
`;

// export const GradientIconBox = styled.div<CommonDivProps>`

// `
