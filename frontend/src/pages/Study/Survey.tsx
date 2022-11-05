import React from 'react';
import { ModalContainer } from '../../styles/Main/VideoModalStyle';
import { MainBox } from '../../styles/Common/CommonDivStyle';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { width } from '@material-ui/system';
import { useNavigate } from 'react-router-dom';
interface ISurveyProps {
  isOpenModal: boolean;
  toggle: () => void;
}

const Survey = ({ isOpenModal, toggle }: ISurveyProps) => {
  const onClickModal = toggle;
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };
  return (
    <ModalContainer
      onClick={onClickModal}
      style={{ width: '30vw', height: '40vh' }}
    >
      <MainBox
        widthSize={'28vw'}
        heightSize={'30vh'}
        paddingSize={'2vw 1vw'}
        fontColor={'black'}
        fontSize={'3vmin'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>해당영상의 학습은 어떠셨나요?</div>
        <div
          style={{
            display: 'flex',
            width: '10vw',
            justifyContent: 'space-between',
            marginTop: '5vh',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div>Like</div>
            <AiOutlineLike />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div>Hate</div>
            <AiOutlineDislike />
          </div>
        </div>
      </MainBox>
      <div
        style={{
          marginTop: '2vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            marginBottom: '1vh',
            cursor: 'pointer',
          }}
          onClick={goToHome}
        >
          Home으로 돌아가기!
        </div>
        <div>서비스 이용후기 작성하러가기!</div>
      </div>
    </ModalContainer>
  );
};
export default Survey;
