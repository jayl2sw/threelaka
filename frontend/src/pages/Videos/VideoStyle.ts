import styled from 'styled-components';

interface TagThumbnailProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  url: string;
}

// 스티키 배경
export const StickyBackDiv = styled.div<TagThumbnailProps>`
  min-width: 100vw;
  min-height: 100vh;
  background: url(${(props) => props.url}) center no-repeat;
  background-color: black;
  background-size: 100vw 100vh;
  position: fixed;
  z-index: -2;
`;

export const BlackBlurDiv = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: black;
  opacity: 0.7;
  position: fixed;
  z-index: -1;
`;
