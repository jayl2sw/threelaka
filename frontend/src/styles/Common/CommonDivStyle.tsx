import styled from 'styled-components';

interface CommonDivProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  widthSize: string;
  heightSize: string;
  paddingSize: string;
  fontColor: 'white' | 'grey' | 'black' | 'blue';
  fontSize: string;
}
interface ToastDivProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  widthSize: string;
  heightSize: string;
  paddingSize: string;
  fontColor: 'white' | 'grey' | 'black' | 'blue';

  top: string;
  left: string;
}

interface CommonCircleProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  widthSize: string;
  heightSize: string;
  paddingSize: string;
  fontColor: 'white' | 'grey' | 'black' | 'blue';
  fontSize: string;
  backgroundUrl: string;
}

interface TransparentFlexDivProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  widthSize: string;
  heightSize: string;
  paddingSize: string;
  justifyContent:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems: 'stretch' | 'center' | 'start' | 'end';
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  IsBorder: 'none' | 'is';
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
  background-color: rgba(255, 255, 255, 0.5);
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
  /* box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1); */
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

export const FlexTransparentDiv = styled.div<TransparentFlexDivProps>`
  width: ${(props) => props.widthSize};
  height: ${(props) => props.heightSize};
  padding: ${(props) => props.paddingSize};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  background-color: transparent;
  border: ${(props) =>
    props.IsBorder === 'none' ? 'none' : '1px solid black'};
`;

export const FlexFadeInOutDiv = styled.div<TransparentFlexDivProps>`
  width: ${(props) => props.widthSize};
  height: ${(props) => props.heightSize};
  padding: ${(props) => props.paddingSize};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  background-color: transparent;
  border: ${(props) =>
    props.IsBorder === 'none' ? 'none' : '1px solid black'};
  &.hidden {
    display: none;
    opacity: 0;
  }

  &.appear {
    animation: fade-in 0.5s;
    animation-fill-mode: forwards;
    display: flex;
  }

  &.disappear {
    animation: fade-out 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const GradientCircleDiv = styled.div<CommonCircleProps>`
  width: ${(props) => props.widthSize};
  height: ${(props) => props.heightSize};
  padding: ${(props) => props.paddingSize};
  font-size: ${(props) => props.fontSize};
  border: 5px solid transparent;
  border-radius: 50%;
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
  background-image: url(${(props) => props.backgroundUrl}),
    linear-gradient(
      106.62deg,
      #83bdff 8.18%,
      rgba(88, 172, 240, 0.861458) 45.03%,
      #c1ffa9 92.42%
    );

  background-size: ${(props) => props.widthSize} ${(props) => props.heightSize};
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin: 10px;
  position: relative;
`;

// export const GradientIconBox = styled.div<CommonDivProps>`

// `

export const ToastContainer = styled.div<ToastDivProps>`
  width: ${(props) => props.widthSize};
  height: ${(props) => props.heightSize};
  padding: ${(props) => props.paddingSize};

  top: ${(props) => props.top};
  left: ${(props) => props.left};
  box-shadow: 5px 5px 5px rgba(63, 39, 102, 0.25);
  position: fixed;
  z-index: 20;
  border-radius: 2vmin;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: smoothAppear 1s ease-in-out;
  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
