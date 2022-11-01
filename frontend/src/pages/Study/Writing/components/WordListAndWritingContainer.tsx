import { useEffect } from 'react';
import { studyActions } from '../../../../features/study/study-slice';
import { useAppSelector, useAppDispatch } from '../../../../utils/hooks';
import {
  WordListAndWritingContainer,
  WordListRegion,
  WritingRegion,
  WritingTextArea,
  ContentBox,
  ContentBoxTag,
  BtnsRegion,
  SaveBtn,
} from '../../../../styles/Writing/WritingStyle';
import { MainPaleBox } from '../../../../styles/Common/CommonDivStyle';
import { TopBtn } from '../../../../styles/Common/CommonBtnStyle';
import { StudyPageParams } from '../../../../models';

interface IworlListAndWrtingProps {
  pageParams: StudyPageParams;
}

const WordListAndWritingContainerComp = ({
  pageParams,
}: IworlListAndWrtingProps) => {
  // const learningRecordId = useAppSelector(
  //   (state) => state.study.studyState.learningRecordId
  // );
  const wordBookList = useAppSelector((state) => state.study.wordBookList);

  useEffect(() => {
    dispatch(studyActions.getWordBookStart(pageParams.learningRecordId));
    // if (learningRecordId !== 0) {
    //   // dispatch(studyActions.getWordBookStart(learningRecordId));
    //   dispatch(studyActions.getWordBookStart(54));
    // }
  }, []);

  const dispatch = useAppDispatch();

  return (
    <WordListAndWritingContainer>
      <MainPaleBox
        widthSize={'17vw'}
        heightSize={'70vh'}
        paddingSize={'0'}
        fontColor={'black'}
        fontSize={'2vmin'}
      >
        <ContentBox>
          <TopBtn
            widthSize={'30vw'}
            heightSize={'10vh'}
            paddingSize={'0'}
            fontColor={'blue'}
            fontSize={'2vmin'}
            backgroundColor={'gradient'}
          ></TopBtn>
          <ContentBoxTag
            topShift="-4vh"
            leftShift="0vw"
            bgColor="white"
            fontColor="#005e76"
          >
            단어장
          </ContentBoxTag>
          {wordBookList.map((aWord) => {
            return (
              <p>
                {aWord.word}, {aWord.example}
              </p>
            );
          })}
        </ContentBox>
        {/* <ContentBox bgColor="#005e76" widthSize="15vw" heightSize='25vh'>
          <ContentBoxTag topShift='-4vh' leftShift='0vw' bgColor="#005e76" fontColor='white'>사전</ContentBoxTag>  
        </ContentBox>           */}
      </MainPaleBox>
      {/* <Preview id={'jsx-template'} > */}
      <WritingRegion>
        <WritingTextArea></WritingTextArea>
      </WritingRegion>
      {/* </Preview> */}
      <BtnsRegion>
        <SaveBtn>파일로 저장</SaveBtn>
        <SaveBtn>저장</SaveBtn>
      </BtnsRegion>
    </WordListAndWritingContainer>
  );
};

export default WordListAndWritingContainerComp;
