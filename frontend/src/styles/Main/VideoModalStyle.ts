import { flexbox } from '@material-ui/system';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: 50vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 2vw;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
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
  margin: 2vh 0;
  text-align: center;
  font-weight: bold;
`;

export const VideoThumbnail = styled.img`
  width: 80%;
  height: 60%;
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
