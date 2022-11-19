import React, { SetStateAction } from 'react';
import { ModalBackdrop } from '../../../styles/DashBoard/DashBoardStyle';
import { useState, useEffect } from 'react';
import { Label, Input } from '../../../styles/Main/TagModalStyle';
import { useAppDispatch } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import {
  FlexTransparentDiv,
  MainBox,
} from '../../../styles/Common/CommonDivStyle';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
import { AiFillCloseCircle } from 'react-icons/ai';
interface IUpdateTagModalProps {
  isTagOpen: boolean;
  setIsTagOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateTagModal = ({ isTagOpen, setIsTagOpen }: IUpdateTagModalProps) => {
  const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItem] = useState<Array<number>>([]);

  const tags: string[] = [
    '#인간',
    '#자연',
    '#생물',
    '#지식',
    '#산업',
    '#문명',
    '#문화예술',
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagId = Number(e.target.value);
    if (selectedItem.includes(tagId)) {
      const tmp = selectedItem.filter((el) => el !== tagId);
      setSelectedItem(tmp);
    } else {
      selectedItem.push(tagId);
      setSelectedItem([...selectedItem]);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(dashboardActions.updateTag(selectedItem));
  };

  const closeModalTag = () => {
    setIsTagOpen(!isTagOpen);
  };

  return (
    <ModalBackdrop>
      <MainBox
        widthSize={'30vw'}
        heightSize={'55vh'}
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
          alignItems: 'center',
        }}
      >
        <AiFillCloseCircle
          size={25}
          color={'black'}
          style={{
            position: 'absolute',
            top: '2vh',
            right: '1.5vw',
            cursor: 'pointer',
          }}
          onClick={() => {
            closeModalTag();
          }}
        ></AiFillCloseCircle>
        <FlexTransparentDiv
          widthSize={'22vw'}
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
                // background: 'red',
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
                    value={idx + 1}
                    onChange={(e) => onChange(e)}
                    disabled={
                      selectedItem.length === 3
                        ? selectedItem.includes(idx + 1)
                          ? false
                          : true
                        : false
                    }
                  />
                  <div>{item}</div>
                </Label>
              ))}
            </FlexTransparentDiv>
            <p style={{ textAlign: 'end' }}>최대 3개 선택가능</p>

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
                    closeModalTag();
                  }, 100);
                }}
                style={{ marginLeft: '8vw', marginTop: '5vh' }}
              >
                등록
              </MainBtn>
            ) : null}
          </form>
        </FlexTransparentDiv>

        {/* <CloseModalBtn onClick={() => {}} style={{ cursor: 'pointer' }}>
        <AiFillCloseCircle size={30}></AiFillCloseCircle>
      </CloseModalBtn> */}
      </MainBox>
    </ModalBackdrop>
  );
};

export default UpdateTagModal;
