import React, { useEffect, useState, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import { ModalBackdrop } from '../../../styles/DashBoard/DashBoardStyle';
import {
  FlexTransparentDiv,
  MainBox,
} from '../../../styles/Common/CommonDivStyle';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';

import { Label, Input } from '../../../styles/Main/TagModalStyle';
interface ITagSelectModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const TagSelectModal = ({ setIsModal }: ITagSelectModalProps) => {
  const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItem] = useState<Array<string>>([]);
  const outside = useRef<HTMLDivElement>(null);
  const tags: string[] = [
    '#인간',
    '#자연',
    '#생물',
    '#지식',
    '#산업',
    '#문명',
    '#문화예술',
  ];

  const tagNum = {
    19: '#인간',
    53: '#산업',
    20: '#생물',
    35: '#문화예술',
    52: '#문명',
    54: '#자연',
    16: '#지식',
  };

  const nickname = useAppSelector((state) => state.auth.currentUser?.nickname);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagVal = e.target.value;

    if (selectedItem.includes(tagVal)) {
      const tmp = selectedItem.filter((el) => el !== tagVal);
      setSelectedItem(tmp);
    } else {
      selectedItem.push(tagVal);
      setSelectedItem([...selectedItem]);
    }
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    function getKeyByValue(obj: any, value: any) {
      return Object.keys(obj).find((key) => obj[key] === value);
    }
    e.preventDefault();
    const tagData: number[] = [];

    selectedItem.map((item, idx) => {
      let tagNumber = getKeyByValue(tagNum, item);
      console.log('얍얍', tagNumber);
      tagData.push(Number(tagNumber));
    });
    console.log(tagData);
    dispatch(dashboardActions.updateTag(tagData));
  };
  return (
    <ModalBackdrop
      ref={outside}
      onClick={(e) => {
        if (e.target === outside.current) {
          // closeModal();
        }
      }}
    >
      <MainBox
        widthSize={'50vw'}
        heightSize={'60vh'}
        paddingSize={'4vh 2vw'}
        fontColor={'black'}
        fontSize={'1.5vmin'}
        style={{
          position: 'fixed',
          top: '20vh',
          left: '25vw',
          zIndex: '1000',
          // border: '1px solid green',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <FlexTransparentDiv
          widthSize={'46vw'}
          heightSize={'55vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'space-around'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{
            background: 'rgba(88, 172, 240, 0.2)',
            borderRadius: '2vmin',
          }}
        >
          <FlexTransparentDiv
            widthSize={'20vw'}
            heightSize={'50vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{
              background: `linear-gradient(
              106.62deg,
              #83bdff 8.18%,
              rgba(88, 172, 240, 0.861458) 45.03%,
              #c1ffa9 92.42%
            )`,
              borderRadius: '2vmin',
            }}
          >
            <img
              src="https://threelaka.s3.ap-northeast-2.amazonaws.com/0.png"
              alt="bears logo"
              style={{
                width: '25vmin',
                margin: '3vh 50%',
                marginTop: '4vh',

                // transform: 'translateY(-10%)',
              }}
            />
            <h1>
              <span>Hello,</span>
              &nbsp;&nbsp;
              <span style={{ borderBottom: '2px solid white' }}>
                {nickname}
              </span>
            </h1>

            <h1>Welcome to Threelaka!</h1>
            <h1></h1>
          </FlexTransparentDiv>
          <FlexTransparentDiv
            widthSize={'24vw'}
            heightSize={'50vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'center'}
            IsBorder={'none'}
          >
            <div style={{ textAlign: 'start', fontSize: '1.7vmin' }}>
              <h2>Threelaka가 당신을 위해,</h2>
              <h2>관심 태그 기반으로 공부 영상을 추천해드려요</h2>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
              <FlexTransparentDiv
                widthSize={'22vw'}
                heightSize={'19vh'}
                paddingSize={'0'}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                IsBorder={'none'}
                style={{
                  flexWrap: 'wrap',
                  alignContent: 'flex-start',
                  background: 'rgba(255,255,255, 0.5)',
                  borderRadius: '2vmin',
                  marginTop: '3vh',
                }}
              >
                {tags.map((item, idx) => (
                  <Label>
                    <Input
                      type="checkbox"
                      className="check"
                      value={item}
                      onChange={(e) => onChange(e)}
                      disabled={
                        selectedItem.length === 3
                          ? selectedItem.includes(item)
                            ? false
                            : true
                          : false
                      }
                    />
                    <div>{item}</div>
                  </Label>
                ))}
              </FlexTransparentDiv>
              <p style={{ textAlign: 'end' }}>3개 선택 가능</p>

              {selectedItem.length === 3 ? (
                <MainBtn
                  widthSize={'6vw'}
                  heightSize={'5vh'}
                  paddingSize={'0'}
                  fontSize={'2.5vmin'}
                  fontColor={'white'}
                  backgroundColor={'black'}
                  type="submit"
                  onClick={() => {
                    setTimeout(() => {
                      closeModal();
                    }, 100);
                  }}
                  style={{ marginLeft: '8.5vw', marginTop: '5vh' }}
                >
                  등록
                </MainBtn>
              ) : null}
            </form>
          </FlexTransparentDiv>
        </FlexTransparentDiv>
      </MainBox>
    </ModalBackdrop>
  );
};

export default TagSelectModal;
