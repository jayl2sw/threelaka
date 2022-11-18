import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../utils/hooks';

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 5vw);
  height: 10vh;
  align-items: center;
  border: 1px black solid;
`;

const CardImgBox = styled.div`
  width: 5vmin;

  /* z-index: 1; */
  /* top: -38vmin; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */

  .accepted {
    background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/profile1.png')
      no-repeat center;
    background-size: 10vmin 10vmin;
  }
  .kicked {
    background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/profile1.png')
      no-repeat center;
    background-size: 10vmin 10vmin;
  }
  .newVideo {
    background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/profile1.png')
      no-repeat center;
    background-size: 10vmin 10vmin;
  }
  .rejected {
    background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/profile1.png')
      no-repeat center;
    background-size: 10vmin 10vmin;
  }
`;
const CardImgCenter = styled.div`
  width: 100%;
  height: 100%;
`;

const Card = () => {
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
                  <CardContainer>
                    <div>
                      <CardImgBox
                        style={{
                          width: '10vmin',
                          height: '10vmin',
                          background: `linear-gradient(
                    110.64deg,
                      #4a9fff 5.65%,
                    rgba(88, 172, 240, 0.861458) 45.15%,
                      #b0ff91 84.64%
                    )`,
                          borderRadius: '50%',
                          border: '4px solid #fff',

                          display: 'flex',
                          flexDirection: 'column',
                          // top: '-6vh',
                        }}
                      >
                        <CardImgCenter
                          className={
                            item.alertState === 'rejected'
                              ? 'rejected'
                              : item.alertState === 'kicked'
                              ? 'kicked'
                              : ''
                          }
                        ></CardImgCenter>
                      </CardImgBox>
                    </div>
                    <div>안녕</div>
                    <div>안녕</div>
                  </CardContainer>
                  <div>{item.alertState}</div>
                </>
              );
            } else {
              return (
                <>
                  <CardContainer>
                    <div>
                      <CardImgBox
                        style={{
                          width: '10vmin',
                          height: '10vmin',
                          background: `linear-gradient(
                    110.64deg,
                      #4a9fff 5.65%,
                    rgba(88, 172, 240, 0.861458) 45.15%,
                      #b0ff91 84.64%
                    )`,
                          borderRadius: '50%',
                          border: '4px solid #fff',

                          display: 'flex',
                          flexDirection: 'column',
                          // top: '-6vh',
                        }}
                      >
                        <img
                          // className={
                          //   item.alertState === 'accepted'
                          //     ? 'accepted'
                          //     : item.alertState === 'rejected'
                          //     ? 'rejected'
                          //     : item.alertState === 'kicked'
                          //     ? 'kicked'
                          //     : item.alertState === 'newVideo'
                          //     ? 'newVideo'
                          //     : ''
                          // }
                          src={
                            item.alertState === 'newVideo'
                              ? `https://img.youtube.com/vi/${item.videoId}/0.jpg`
                              : 'https://threelaka.s3.ap-northeast-2.amazonaws.com/profile1.png'
                          }
                          style={{ objectFit: 'cover', width: '10vmin' }}
                        ></img>
                      </CardImgBox>
                    </div>
                    <div>안녕</div>
                    <div>안녕</div>
                  </CardContainer>
                  <div>{item.alertState}</div>
                </>
              );
            }
          })}
        </div>
      ) : (
        <div>알림이없어요</div>
      )}
    </div>
  );
};

export default Card;
