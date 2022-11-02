import { useEffect, useState, useRef } from 'react';
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
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';

interface IworlListAndWrtingProps {
  pageParams: StudyPageParams;
}

const WordListAndWritingContainerComp = ({
  pageParams,
}: IworlListAndWrtingProps) => {
  const wordBookList = useAppSelector((state) => state.study.wordBookList);
  const checkedWordList = useAppSelector(
    (state) => state.wrtie.checkedWordList
  );
  const [filterTarget, setFilterTarget] = useState<string[]>([]);
  const [textAreaValue, setTextAreaValue] = useState('');
  const onChange = (value: string) => setTextAreaValue(value);
  const textAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(studyActions.getWordBookStart(pageParams.learningRecordId));
  }, []);

  useEffect(() => {
    const result = checkedWordList.map((checkWord: any) => {
      return checkWord[0];
    });
    console.warn(result);
    setFilterTarget(result);
  }, [checkedWordList]);

  const dispatch = useAppDispatch();
  // word list 문제 해결해야함

  // 1분 마다 단어 썼는지 체크해줌
  useEffect(() => {
    const wordChecker = setInterval(() => {
      const wordList: string[] = wordBookList.map((oneWord) => oneWord.word);
      const wordCheckPayload: WordCheckPayload = {
        word_list: wordList,
        essay: textAreaRef.current!.innerText,
      };
      if (textAreaRef.current!.innerText.length !== 0) {
        console.log('발동');
        dispatch(writingActions.postCheckWordStart(wordCheckPayload));
      }
    }, 3000);
    //60000
    return () => clearInterval(wordChecker);
  }, []);

  // 스펠링 체크 온클릭
  const onClickSpellCheck = () => {
    dispatch(writingActions.spellCheckStart(textAreaRef.current!.innerText));
  };

  return (
    <WordListAndWritingContainer>
      <div
        style={{ width: '0', height: '0', display: 'none' }}
        ref={textAreaRef}
      >
        {textAreaValue}
      </div>
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
            style={{ marginRight: '1vw', marginLeft: '1vw' }}
          >
            단어장
          </TopBtn>
          <TopBtn
            widthSize={'7vw'}
            heightSize={'4vh'}
            paddingSize={'0'}
            fontColor={'black'}
            fontSize={'2vmin'}
            backgroundColor={'blue'}
            style={{ marginRight: '1vw' }}
            onClick={onClickSpellCheck}
          >
            문법검사
          </TopBtn>
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
            <HighlightWithinTextarea
              value={textAreaValue}
              highlight={filterTarget}
              onChange={onChange}
            ></HighlightWithinTextarea>
          </MainBox>
        </FlexTransparentDiv>
      </FlexTransparentDiv>
    </WordListAndWritingContainer>
  );
};

export default WordListAndWritingContainerComp;
