import styled from 'styled-components';

// RecentVideo 컴포넌트 내부 스타일링

// 전체 박스
export const RecentVideoBox = styled.div`
  width: 45vw;
  height: 30vh;
  padding: 1.5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 2vmin;
  color: #111111;
  font-family: 'PretendardRegular';
  margin-top: 4vh;
`;

// 오른쪽 div
export const RecentVideoDataContainer = styled.div`
  width: 23vw;
  height: 22vh;
  margin-left: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 1vh 0.5vw;
`;

// 제목, 단계 등 텍스트 정보
export const RecentVideoTextContainer = styled.div`
  width: 23vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-bottom: 2vh;

  & p {
    margin: 0;
    font-family: 'PretendardRegular';
    font-size: 0.8vw;
  }
  & .video-title {
    font-family: 'PretendardBold';
    font-size: 1.2vw;
    margin-bottom: 1.5vh;
  }
`;

export const RecentVideoImg = styled.img`
  width: 18vw;
  height: 21vh;
  object-fit: cover;
  border-radius: 2vmin;
`;

// 최근 학습일
export const RecentData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 0.9vw;
  & .data-title {
    width: 5.5vw;
    height: 4vh;
    margin: 1vh 1vw 1vh 0.5vw;
    font-size: 0.7vw;
    color: white;
    background-color: #111111;
    border-radius: 1vmin;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// 최근 학습 단계 바
export const StudyProgressRegion = styled.div`
  display: flex;
  z-index: 5;
  justify-content: start;
  align-items: center;
  width: 18vw;
  height: 1.5vh;
  background-color: black;
  color: white;
  margin-left: 0.5vw;
  border-radius: 10vmin;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(0, 0, 0, 1) 25%
  );
`;

// 최근 단계 표시
export const ProgressBarIndicator = styled.div`
  position: absolute;
  height: 1.5vh;

  background-image: linear-gradient(
    90deg,
    rgba(74, 159, 255, 1) 0%,
    rgba(88, 172, 240, 1) 41%,
    rgba(176, 255, 145, 1) 100%
  );
  border-radius: 10vmin;
  &.indicator-READING {
    width: 6vw;
  }
  &.indicator-WRITING {
    width: 12vw;
  }
  &.indicator-SPEAKING {
    width: 18vw;
  }
`;

export const RecentVideoBtnContainer = styled.div`
  width: 23vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2vh;
  padding: 0 1vw;
`;

export const NoRecentVideoYet = styled.div`
  width: 100vw;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 7vh 0 1vh 0;
  & p {
    margin-bottom: 0.5vh;
    font-family: 'PretendardRegular';
  }

  & img {
    width: 15vw;
    height: 20vh;
  }
`;
