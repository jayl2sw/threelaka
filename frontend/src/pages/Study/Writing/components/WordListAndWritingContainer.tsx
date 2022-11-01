import { useEffect } from 'react';
import { studyActions } from '../../../../features/study/study-slice';
import { useAppSelector, useAppDispatch } from '../../../../utils/hooks';
import {
  WordListAndWritingContainer,
  WritingTextArea,
  WordCheckBox,
  WordText,
} from '../../../../styles/Writing/WritingStyle';
import {
  MainPaleBox,
  FlexTransparentDiv,
  BackBlurBox,
  MainBox,
} from '../../../../styles/Common/CommonDivStyle';
import { TopBtn } from '../../../../styles/Common/CommonBtnStyle';
import { StudyPageParams, WordCheckPayload } from '../../../../models';
import { writingActions } from '../../../../features/writing/writing-slice';

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

  // 1분 마다 단어 썼는지 체크해줌
  useEffect(() => {
    const wordChecker = setInterval(() => {
      const wordList: string[] = wordBookList.map((oneWord) => oneWord.word);
      const wordCheckPayload: WordCheckPayload = {
        word_list: wordList,
        essay: 'I am scary',
      };
      dispatch(writingActions.postCheckWordStart(wordCheckPayload));
      console.log(wordCheckPayload);
    }, 1000);
    //60000
    return () => clearInterval(wordChecker);
  }, []);

  return (
    <WordListAndWritingContainer>
      <FlexTransparentDiv
        widthSize={'28vw'}
        heightSize={'70vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyCotent={'start'}
        alignItems={'start'}
        IsBorder={'none'}
      >
        <FlexTransparentDiv
          widthSize={'28vw'}
          heightSize={'5vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyCotent={'start'}
          alignItems={'end'}
          IsBorder={'none'}
        >
          <TopBtn
            widthSize={'7vw'}
            heightSize={'4vh'}
            paddingSize={'0'}
            fontColor={'black'}
            fontSize={'2vmin'}
            backgroundColor={'blue'}
            style={{ marginRight: '1vw' }}
          >
            단어장
          </TopBtn>
          {/* <TopBtn
            widthSize={'7vw'}
            heightSize={'4vh'}
            paddingSize={'0'}
            fontColor={'blue'}
            fontSize={'2vmin'}
            backgroundColor={'blue'}
          ></TopBtn> */}
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'28vw'}
          heightSize={'65vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyCotent={'start'}
          alignItems={'start'}
          IsBorder={'none'}
        >
          <MainPaleBox
            widthSize={'28vw'}
            heightSize={'70vh'}
            paddingSize={'1vw'}
            fontColor={'black'}
            fontSize={'2vmin'}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {wordBookList.map((aWord) => {
              return (
                <BackBlurBox
                  widthSize={'26vw'}
                  heightSize={'5vh'}
                  paddingSize={'1vw'}
                  fontColor={'black'}
                  fontSize={'1vmin'}
                  style={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    marginBottom: '1vh',
                  }}
                >
                  <WordCheckBox className="checked" />
                  <WordText>
                    <p className="front" style={{ fontSize: '2.5vmin' }}>
                      {aWord.word}
                    </p>
                    <p className="back">{aWord.example}</p>
                  </WordText>
                  {/* {aWord.example} */}
                </BackBlurBox>
              );
            })}
          </MainPaleBox>
        </FlexTransparentDiv>
      </FlexTransparentDiv>
      <FlexTransparentDiv
        widthSize={'2vw'}
        heightSize={'70vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyCotent={'start'}
        alignItems={'start'}
        IsBorder={'none'}
      ></FlexTransparentDiv>
      <FlexTransparentDiv
        widthSize={'60vw'}
        heightSize={'70vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyCotent={'start'}
        alignItems={'start'}
        IsBorder={'none'}
      >
        <FlexTransparentDiv
          widthSize={'60vw'}
          heightSize={'5vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyCotent={'end'}
          alignItems={'end'}
          IsBorder={'none'}
        >
          <TopBtn
            widthSize={'7vw'}
            heightSize={'4vh'}
            paddingSize={'0'}
            fontColor={'black'}
            fontSize={'2vmin'}
            backgroundColor={'blue'}
            style={{ marginRight: '1vw' }}
          >
            문법검사
          </TopBtn>
          <TopBtn
            widthSize={'7vw'}
            heightSize={'4vh'}
            paddingSize={'0'}
            fontColor={'black'}
            fontSize={'2vmin'}
            backgroundColor={'blue'}
            style={{ marginRight: '1vw' }}
          >
            파일 저장
          </TopBtn>
          <TopBtn
            widthSize={'7vw'}
            heightSize={'4vh'}
            paddingSize={'0'}
            fontColor={'black'}
            fontSize={'2vmin'}
            backgroundColor={'blue'}
            style={{ marginRight: '2vw' }}
          >
            저장
          </TopBtn>
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'60vw'}
          heightSize={'65vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyCotent={'start'}
          alignItems={'start'}
          IsBorder={'none'}
        >
          <MainBox
            widthSize={'60vw'}
            heightSize={'70vh'}
            paddingSize={'1vw'}
            fontColor={'black'}
            fontSize={'2vmin'}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <WritingTextArea></WritingTextArea>
          </MainBox>
        </FlexTransparentDiv>
      </FlexTransparentDiv>
    </WordListAndWritingContainer>
  );
};

export default WordListAndWritingContainerComp;
