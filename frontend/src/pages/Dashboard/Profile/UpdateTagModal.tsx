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
  const [selectedItem, setSelectedItem] = useState<Array<string>>([]);

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

  const closeModalTag = () => {
    setIsTagOpen(!isTagOpen);
  };

  return (
    <ModalBackdrop>
      <MainBox
        widthSize={'30vw'}
        heightSize={'60vh'}
        paddingSize={'4vh 2vw'}
        fontColor={'black'}
        fontSize={'1.5vmin'}
        style={{
          position: 'fixed',
          top: '20vh',
          left: '25vw',
          zIndex: '1000',

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
            {/* <h2>Threelaka가 당신을 위해,</h2> */}
            <h2 style={{ fontSize: '4vmin' }}>관심 태그를 설정하세요</h2>
          </div>
          <p
            style={{
              fontSize: '1.8vmin',
              marginLeft: '17vw',
              marginBottom: '-2vh',
            }}
          >
            3개 선택 가능
          </p>

          <form onSubmit={(e) => handleSubmit(e)}>
            <FlexTransparentDiv
              widthSize={'22vw'}
              heightSize={'25vh'}
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
                  <div>{item}</div>
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
      </MainBox>
    </ModalBackdrop>
  );
};

export default UpdateTagModal;
