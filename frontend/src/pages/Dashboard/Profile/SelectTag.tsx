import React, { SetStateAction } from 'react';
import { ModalBackdrop } from '../../../styles/DashBoard/DashBoardStyle';
import { useState, useEffect } from 'react';
import { Label, Input } from '../../../styles/Main/TagModalStyle';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import {
  FlexTransparentDiv,
  MainBox,
  ToastContainer,
} from '../../../styles/Common/CommonDivStyle';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
import { AiFillCloseCircle } from 'react-icons/ai';
import { ToastMessage } from '../../../utils/ToastMessage';
const UpdateTagModal = () => {
  const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItem] = useState<Array<string>>([]);
  const isNewTag = useAppSelector((state) => state.dashboard.isNewTag);

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

  useEffect(() => {
    if (isNewTag) {
      let timer = setTimeout(() => {
        dispatch(dashboardActions.resetIsNewTag());
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, isNewTag]);

  return (
    <MainBox
      widthSize={'28vw'}
      heightSize={'32vh'}
      paddingSize={'2vh 2vw'}
      fontColor={'black'}
      fontSize={'1.5vmin'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 'none',
      }}
    >
      <FlexTransparentDiv
        widthSize={'28vw'}
        heightSize={'50vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'center'}
        IsBorder={'none'}
      >
        <div
          style={{
            textAlign: 'start',
            fontSize: '2vmin',
            marginTop: '1vh',
            lineHeight: '3.3vmin',
          }}
        >
          {/* <h2>Threelaka가 당신을 위해,</h2> */}
          <h3>Threelaka가 당신을 위해,</h3>
          <h3>관심 태그 기반으로 영상을 추천해드려요</h3>
        </div>
        <p
          style={{
            fontSize: '1.5vmin',
            marginLeft: '17vw',
            marginBottom: '-2vh',
          }}
        >
          3개 선택 가능
        </p>

        <form onSubmit={(e) => handleSubmit(e)}>
          <FlexTransparentDiv
            // widthSize={'22vw'}
            // heightSize={'25vh'}

            widthSize={'28vw'}
            heightSize={'19vh'}
            paddingSize={'0'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{
              flexWrap: 'wrap',
              alignContent: 'flex-start',

              background: 'rgba(131,189,255, 0.3)',
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
                <div
                  style={{
                    fontSize: '2.5vmin',
                    padding: '0.5vmin',
                    cursor: 'pointer',
                  }}
                >
                  {item}
                </div>
              </Label>
            ))}
          </FlexTransparentDiv>

          {selectedItem.length === 3 ? (
            <MainBtn
              widthSize={'6vw'}
              heightSize={'5vh'}
              paddingSize={'0'}
              fontSize={'2.5vmin'}
              fontColor={'white'}
              backgroundColor={'black'}
              type="submit"
              style={{
                marginLeft: '11vw',
                marginTop: '2vh',
                height: '4vh',
                borderRadius: '10px',
              }}
            >
              등록
            </MainBtn>
          ) : null}

          {isNewTag && (
            <ToastContainer
              widthSize={'23vw'}
              heightSize={'20vh'}
              paddingSize={'2vh 1vw'}
              fontColor={'black'}
              top={'55vh'}
              left={'61.5vw'}
            >
              <ToastMessage
                text={'태그가 성공적으로 변경되었습니다'}
              ></ToastMessage>
            </ToastContainer>
          )}
        </form>
      </FlexTransparentDiv>
    </MainBox>
  );
};

export default UpdateTagModal;
