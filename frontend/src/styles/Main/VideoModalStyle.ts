import { flexbox } from '@material-ui/system';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: 50vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vmin 2vmin;
  border: none;
  border-radius: 1rem;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background: linear-gradient(106.62deg, #83BDFF 8.18%, rgba(136, 192, 255, 0.90051) 49.26%, #8DC2FF 69.16%, #C1FFA9 92.42%);
  /* opacity: 0.5; */
  z-index: 10000;
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
`;

export const VideoTitle = styled.p`
  margin: 4vh 0;
  text-align: center;
  /* font-weight: bold; */
  font-size: 4vmin;
  font-weight: light;
`;

export const VideoThumbnail = styled.img`
  width: 65%;
  height: 65%;
  border-radius: 1rem;
`;

export const VideoSubtitleBox = styled.div`
  & button {
  }
`;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;
