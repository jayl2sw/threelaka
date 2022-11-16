import styled from 'styled-components';

// export const ModalContainer = styled.div`
//   width: 50vw;
//   height: 70vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 2vmin 2vmin;
//   border: none;
//   border-radius: 1rem;
//   box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
//   box-sizing: border-box;
//   padding: 2vh 2vw;
//   /* background: linear-gradient(
//     106.62deg,
//     #83bdff 8.18%,
//     rgba(136, 192, 255, 0.90051) 49.26%,
//     #8dc2ff 69.16%,
//     #c1ffa9 92.42%
//   ); */
//   /* opacity: 0.5; */

//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;
export const ModalContainer = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  flex-direction: column;
  padding: 1vw;
  /* width: 20vw; */
  width: 50vw;
  height: 70vh;

  display: flex;
  background: #ffffff;
  box-shadow: 5px 5px 5px rgba(63, 39, 102, 0.25);
  border-radius: 2vmin;
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

export const CloseModalBtn = styled.div`
  cursor: pointer;
  width: 3vmin;
  height: 3vmin;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1vh;
  right: 1vw;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
  }
  &:active {
    transform: scale(0.9);
    transition: transform 0.2s;
  }
`;
