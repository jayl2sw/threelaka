import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: 50vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vmin 2vmin;
  border: none;
  border-radius: 1rem;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  padding: 2vh 2vw;
  /* background: linear-gradient(
    106.62deg,
    #83bdff 8.18%,
    rgba(136, 192, 255, 0.90051) 49.26%,
    #8dc2ff 69.16%,
    #c1ffa9 92.42%
  ); */
  /* opacity: 0.5; */
  z-index: 10000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const VideoDataContainer = styled.div`
  display: block;
  background: white;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const VideoTitle = styled.p`
  margin: 4vh 0;
  text-align: center;
  font-size: 3vmin;
  font-weight: light;
  font-family: 'PretendardBold';
`;

export const VideoThumbnail = styled.img`
  width: 65%;
  height: 50%;
  border-radius: 1rem;
`;

export const VideoSubtitleBox = styled.div`
  & button {
  }
`;
