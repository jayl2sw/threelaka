import React from 'react';
import styled from 'styled-components';
import EnglishOnlyZone from './EOZ/EnglishOnlyZone';

// 기본 틀 짜기용 (나중에 옮기기)
const MyGuildBlock = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
`;

const MyGuildTitle = styled.div`
  height: 5vh;
`;

const MyGuildBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 60vw;
  height: 75vh;
`;

const MyGuildLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 32vw;
  border: 1px solid green;

  & .left-top {
    width: 32vw;
    border: 1px solid green;
  }

  & .left-bottom {
    width: 32vw;
    border: 1px solid green;
  }
`;

const MyGuildRightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 28vw;
  border: 1px solid blue;
  padding: 2vh 2vh;

  & .right-top {
    width: 24vw;
    height: 36vh;
    border: 1px solid blue;
  }

  & .right-bottom {
    width: 24vw;
    height: 33vh;
    margin-top: 2vh;
    border: 1px solid blue;
  }
`;

const MyGuild = () => {
  return (
    <MyGuildBlock>
      <MyGuildTitle>길드 인사 페이지</MyGuildTitle>
      <MyGuildBox>
        <MyGuildLeftBox>
          <div className="left-top">왼쪽 상단</div>
          <div className="left-bottom">왼쪽 하단</div>
        </MyGuildLeftBox>
        <MyGuildRightBox>
          <div className="right-top"></div>
          <EnglishOnlyZone />
        </MyGuildRightBox>
      </MyGuildBox>
    </MyGuildBlock>
  );
};

export default MyGuild;
