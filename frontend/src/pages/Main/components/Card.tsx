import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../utils/hooks';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
import { Link } from 'react-router-dom';

import { IAlertDropDownProps } from './AlertDropDown';
import {
  FlexFadeInOutDiv,
  FlexTransparentDiv,
} from '../../../styles/Common/CommonDivStyle';
export const CardContainer = styled.div`
  display: grid;
  /* grid-template-columns: repeat(3, 7vw); */
  grid-template-columns: 17vw 13vw;
  height: 14vh;
  align-items: center;

  background: #f1f1f1;
  width: 28vw;

  /* border-radius: 2vmin; */
  padding-left: 0.8vw;
  padding-top: 1vh;
`;

export const CardImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .isBadAlert {
    background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/blue.png')
      no-repeat center;
    background-size: 7vmin 7vmin;
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
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                          <CardImgBox
                            style={{
                              width: '8vmin',
                              height: '8vmin',
                              background: `linear-gradient(
                    110.64deg,
                      #4a9fff
                      5.65%,
                    rgba(88, 172, 240, 0.861458) 45.15%,
                      #b0ff91 84.64%
                    )`,
                              borderRadius: '50%',
                              border: '4px solid #fff',

                              display: 'flex',
                              flexDirection: 'column',
                              // top: '-6vh',
                              margin: '0 1vw',
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
                          style={{ fontSize: '1.8vmin', fontWeight: 'bold' }}
                        >
                          {item.guildName}
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '1vh 1vw',
                          fontSize: '1.8vmin',
                          textAlign: 'justify',
                          marginLeft: '0.5vw',
                        }}
                      >
                        {item.alertState === 'rejected' ? (
                          <div>길드 가입 신청이 거절 되었습니다</div>
                        ) : item.alertState === 'kicked' ? (
                          <div>길드에서 추방되었습니다</div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div>
                      <Link
                        to={`/auth/guild/main/${item.guildId}`}
                        style={{ width: '4vw' }}
                      >
                        <MainBtn
                          widthSize={'8vw'}
                          heightSize={'5vh'}
                          paddingSize={'0.5vw'}
                          fontSize={'1.7vmin'}
                          fontColor={'white'}
                          backgroundColor={'blue'}
                          style={{
                            borderRadius: '1.5vmin',
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '0.2vw',
                            background: `linear-gradient(
                                       110.64deg,
                                       #4a9fff 5.65%,
                                       rgba(88, 172, 240, 0.861458) 45.15%,
                                       #b0ff91 84.64%
                                     )`,
                            fontWeight: 'bold',
                            marginBottom: '1vh',
                          }}
                        >
                          <div>길드 홈 가기</div>
                        </MainBtn>
                      </Link>
                    </div>
                  </CardContainer>
                </>
              );
            } else {
              return (
                <>
                  <CardContainer className="link">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                          <CardImgBox
                            style={{
                              width: '8vmin',
                              height: '8vmin',
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
                              borderRadius: '50%',
                              border: '4px solid #fff',

                              display: 'flex',
                              flexDirection: 'column',
                              // top: '-6vh',
                              margin: '0 1vw',
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
                                width: '5vmin',
                                // height: '7min',
                              }}
                            ></img>
                          </CardImgBox>
                        </div>
                        <div
                          style={{ fontSize: '1.8vmin', fontWeight: 'bold' }}
                        >
                          {item.guildName}
                        </div>
                      </div>
                      <div
                        style={{
                          padding: '1vh 1vw',
                          fontSize: '1.8vmin',
                          textAlign: 'justify',
                          marginLeft: '0.5vw',
                        }}
                      >
                        {item.alertState === 'newVideo' ? (
                          <div>새로운 과제가 등록 되었습니다</div>
                        ) : item.alertState === 'accepted' ? (
                          <div>길드 가입 신청이 승인 되었습니다</div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div>
                      {item.alertState === 'newVideo' ? (
                        <MainBtn
                          widthSize={'8vw'}
                          heightSize={'5vh'}
                          paddingSize={'0.5vw'}
                          fontSize={'1.7vmin'}
                          fontColor={'white'}
                          backgroundColor={'blue'}
                          style={{
                            borderRadius: '1.5vmin',
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '0.2vw',
                            background: `linear-gradient(
                              110.64deg,
                              #4a9fff 5.65%,
                              rgba(88, 172, 240, 0.861458) 45.15%,
                              #b0ff91 84.64%
                            )`,
                            fontWeight: 'bold',
                            marginBottom: '1vh',
                          }}
                          onClick={() => {
                            setModalToggleVideoId(item.videoId);
                            setToggleDropDown(false);
                          }}
                        >
                          <div>공부 하러 가기</div>
                        </MainBtn>
                      ) : (
                        <Link
                          to={`/auth/guild/myGuild/${item.guildId}`}
                          style={{ width: '4vw' }}
                        >
                          <MainBtn
                            widthSize={'8vw'}
                            heightSize={'5vh'}
                            paddingSize={'0.5vw'}
                            fontSize={'1.7vmin'}
                            fontColor={'white'}
                            backgroundColor={'blue'}
                            style={{
                              borderRadius: '1.5vmin',
                              display: 'flex',
                              flexDirection: 'column',
                              marginLeft: '0.2vw',
                              background: `linear-gradient(
                                   110.64deg,
                                   #4a9fff 5.65%,
                                   rgba(88, 172, 240, 0.861458) 45.15%,
                                   #b0ff91 84.64%
                                 )`,
                              fontWeight: 'bold',
                              marginBottom: '1vh',
                            }}
                          >
                            <div>내 길드 가기</div>
                          </MainBtn>
                        </Link>
                      )}
                    </div>
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
