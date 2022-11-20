import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../utils/hooks';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
import { Link } from 'react-router-dom';

import { IAlertDropDownProps } from './AlertDropDown';
export const CardContainer = styled.div`
  display: grid;
  /* grid-template-columns: repeat(3, 7vw); */
  grid-template-columns: 4.5vw 10.1vw 6vw;
  height: 10vh;
  align-items: center;

  background: #f1f1f1;

  border-radius: 2vmin;
`;

export const CardImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .isBadAlert {
    background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/blue.png')
      no-repeat center;
    background-size: 9vmin 9vmin;
  }
`;
const CardImgCenter = styled.div`
  width: 100%;
  height: 100%;
`;

const Card = ({
  setModalToggleVideoId,
  setToggleDropDown,
}: IAlertDropDownProps) => {
  const userAlertList = useAppSelector((state) => state.auth.userAlertList);

  return (
    <div>
      {userAlertList.length !== 0 ? (
        <div>
          {userAlertList.map((item, idx) => {
            if (
              item.alertState === 'rejected' ||
              item.alertState === 'kicked'
            ) {
              return (
                <>
                  <CardContainer className="link">
                    <div>
                      <CardImgBox
                        style={{
                          width: '9.5vmin',
                          height: '9.5vmin',
                          background: `linear-gradient(
              110.64deg,
                #4a9fff
                 5.65%,
              rgba(88, 172, 240, 0.861458) 45.15%,
                #b0ff91 84.64%
              )`,
                          borderRadius: '2vmin',
                          border: '4px solid #fff',

                          display: 'flex',
                          flexDirection: 'column',
                          // top: '-6vh',
                          margin: '0 0.2vw',
                        }}
                      >
                        <CardImgCenter
                          className={
                            item.alertState === 'rejected'
                              ? 'isBadAlert'
                              : item.alertState === 'kicked'
                              ? 'isBadAlert'
                              : ''
                          }
                        ></CardImgCenter>
                      </CardImgBox>
                    </div>
                    <div
                      style={{
                        padding: '0.4vw',
                        fontSize: '1.2vmin',
                        textAlign: 'justify',
                      }}
                    >
                      {item.alertState === 'rejected' ? (
                        <div>
                          {item.guildName}에 보낸 가입 요청이 거절되었습니다.
                        </div>
                      ) : item.alertState === 'kicked' ? (
                        <div>{item.guildName}에서 추방되었습니다.</div>
                      ) : (
                        ''
                      )}
                    </div>
                    <div></div>
                  </CardContainer>
                </>
              );
            } else {
              return (
                <>
                  <CardContainer className="link">
                    <div>
                      <CardImgBox
                        style={{
                          width: '9.5vmin',
                          height: '9.5vmin',
                          background:
                            item.alertState === 'newVideo'
                              ? 'black'
                              : `linear-gradient(
                    110.64deg,
                      #4a9fff
                       5.65%,
                    rgba(88, 172, 240, 0.861458) 45.15%,
                      #b0ff91 84.64%
                    )`,
                          borderRadius: '2vmin',
                          border: '4px solid #fff',

                          display: 'flex',
                          flexDirection: 'column',
                          // top: '-6vh',
                          margin: '0 0.2vw',
                        }}
                      >
                        <img
                          src={
                            item.alertState === 'newVideo'
                              ? `https://img.youtube.com/vi/${item.videoId}/0.jpg`
                              : item.alertState === 'accepted'
                              ? 'https://threelaka.s3.ap-northeast-2.amazonaws.com/0.png'
                              : ''
                          }
                          style={{
                            objectFit: 'cover',
                            width: '7vmin',
                            // height: '7min',
                          }}
                        ></img>
                      </CardImgBox>
                    </div>
                    <div
                      style={{
                        padding: '0 0.4vw 0 0.7vw',
                        fontSize: '1.2vmin',
                        textAlign: 'justify',
                      }}
                    >
                      {item.alertState === 'newVideo' ? (
                        <div>
                          '
                          <span style={{ fontWeight: 'bold' }}>
                            {item.guildName}
                          </span>
                          ' 에서 새로운 영상 '
                          <span style={{ fontWeight: 'bold' }}>
                            {item.videoTitle}
                          </span>
                          ' 이 생성되었습니다.
                        </div>
                      ) : item.alertState === 'accepted' ? (
                        <div>
                          '
                          <span style={{ fontWeight: 'bold' }}>
                            {item.guildName}
                          </span>
                          ' 에 보낸 가입 요청이 수락되었습니다.
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    {item.alertState === 'newVideo' ? (
                      <MainBtn
                        widthSize={'4vw'}
                        heightSize={'5vh'}
                        paddingSize={'0.5vw'}
                        fontSize={'1.5vmin'}
                        fontColor={'white'}
                        backgroundColor={'blue'}
                        style={{
                          borderRadius: '1.5vmin',
                          display: 'flex',
                          flexDirection: 'column',
                          marginLeft: '0.2vw',
                        }}
                        onClick={() => {
                          setModalToggleVideoId(item.videoId);
                          setToggleDropDown(false);
                        }}
                      >
                        <div>영상 공부</div>
                        <div>바로 가기</div>
                      </MainBtn>
                    ) : item.alertState === 'accepted' ? (
                      <Link
                        to={`/auth/guild/main/${item.guildId}`}
                        style={{ width: '4vw' }}
                      >
                        <MainBtn
                          widthSize={'4vw'}
                          heightSize={'5vh'}
                          paddingSize={'0.5vw'}
                          fontSize={'1.5vmin'}
                          fontColor={'white'}
                          backgroundColor={'blue'}
                          style={{
                            borderRadius: '1.5vmin',
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '0.2vw',
                          }}
                        >
                          <div>길드 구경</div>
                          <div>바로 가기</div>
                        </MainBtn>
                      </Link>
                    ) : null}
                  </CardContainer>
                </>
              );
            }
          })}
        </div>
      ) : (
        <div
          style={{
            fontSize: '3vmin',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '8vh',
          }}
        >
          알림이없어요
        </div>
      )}
    </div>
  );
};

export default Card;
