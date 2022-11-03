import { useEffect, useState, useRef } from 'react';
import { studyActions } from '../../../../features/study/study-slice';
import { useAppSelector, useAppDispatch } from '../../../../utils/hooks';
import {
  WordListAndWritingContainer,
  WritingTextArea,
  WordCheckBox,
  WordText,
  HighlightTextAreaWrapper,
} from '../../../../styles/Writing/WritingStyle';
import {
  MainPaleBox,
  FlexTransparentDiv,
  BackBlurBox,
  MainBox,
} from '../../../../styles/Common/CommonDivStyle';
import {
  TopBtn,
  MoveToNextRightBtn,
  MoveToNextLeftBtn,
} from '../../../../styles/Common/CommonBtnStyle';
import {
  StudyPageParams,
  WordBook,
  WordCheckPayload,
  FlggedToken,
  SaveEssayPayload,
} from '../../../../models';
import { writingActions } from '../../../../features/writing/writing-slice';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';
import { useOutletContext } from 'react-router-dom';
import { IheaderProps } from '../../../../layout/Header';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

interface IworlListAndWrtingProps {
  pageParams: StudyPageParams;
}

const WordListAndWritingContainerComp = ({
  pageParams,
}: IworlListAndWrtingProps) => {
  const dispatch = useAppDispatch();
  // word list 문제 해결해야함
  const { customMoveToNext } = useOutletContext<IheaderProps>();
  const moveToNext = customMoveToNext;
  // selector
  const wordBookList = useAppSelector((state) => state.study.wordBookList);
  const checkedWordList = useAppSelector(
    (state) => state.write.checkedWordList
  );
  const spellCheckLst = useAppSelector((state) => state.write.spellCheckLst);
  const userEssay = useAppSelector((state) => state.write.essay);

  // state
  const [filterTarget, setFilterTarget] = useState<string[]>([]);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [spellCheckResult, setSpellCheckResult] = useState<FlggedToken[]>([]);
  const [spellFilterTarget, setSpellFilterTarget] = useState<string[]>([]);
  // 단어장(0) <-> 문법검사(1)
  const [modeValue, setModeValue] = useState(0);

  // handler
  const onChange = (value: string) => setTextAreaValue(value);
  const essaySave = () => {
    const temp: SaveEssayPayload = {
      content: textAreaRef.current!.innerText,
      learningRecordId: pageParams.learningRecordId,
    };
    dispatch(writingActions.postSaveEssayStart(temp));
  };
  // 스펠링 체크 온클릭
  const onClickSpellCheck = () => {
    dispatch(writingActions.spellCheckStart(textAreaRef.current!.innerText));
  };
  // ref
  const textAreaRef = useRef<HTMLDivElement>(null);

  // 처음에 단어장, 에세이 가져옴
  // 나갈 때 에세이 저장해달라고 함
  useEffect(() => {
    dispatch(studyActions.getWordBookStart(pageParams.learningRecordId));
    dispatch(writingActions.getEssayStart(pageParams.learningRecordId));
  }, []);

  useEffect(() => {
    if (userEssay === null) {
      setTextAreaValue('');
    } else {
      setTextAreaValue(userEssay);
    }
  }, [userEssay]);

  useEffect(() => {
    const result = checkedWordList.map((checkWord: any) => {
      return checkWord[0];
    });
    // console.warn(result);
    setFilterTarget(result);
  }, [checkedWordList]);

  // 1분 마다 단어 썼는지 체크해줌
  useEffect(() => {
    if (wordBookList.length == 0) {
      return;
    }
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
    }, 10000);
    //60000
    return () => clearInterval(wordChecker);
  }, [wordBookList]); // wordbooklist가 있을 때 돌아가게 하기 위해

  // 문법 체크 시 전처리
  useEffect(() => {
    console.log(spellCheckLst);
    if (spellCheckLst.flaggedTokens === undefined) {
      return;
    }
    let tempFilterTarget: string[] = [];
    const temp = spellCheckLst.flaggedTokens.map((spell, idx) => {
      const resTemp = {
        offset: spell.offset,
        token: spell.token,
        type: spell.type,
        suggestions: spell.suggestions,
      };
      tempFilterTarget.push(spell.token);
      return resTemp;
    });
    console.log(temp);
    setSpellCheckResult(temp);
    setSpellFilterTarget(tempFilterTarget);
  }, [spellCheckLst]);

  return (
    <WordListAndWritingContainer>
      <MoveToNextLeftBtn
        onClick={(e) => {
          essaySave();
          moveToNext(e, 'READING', pageParams);
        }}
      >
        <AiOutlineLeft size={30} />
        <p>reading</p>
      </MoveToNextLeftBtn>
      <MoveToNextRightBtn
        onClick={(e) => {
          essaySave();
          moveToNext(e, 'SPEAKING', pageParams);
        }}
      >
        <AiOutlineRight size={30} />
        <p>speaking</p>
      </MoveToNextRightBtn>
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
        justifyContent={'start'}
        alignItems={'start'}
        IsBorder={'none'}
      >
        <FlexTransparentDiv
          widthSize={'28vw'}
          heightSize={'5vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'start'}
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
            onClick={() => setModeValue(0)}
            className={modeValue ? 'pale' : ''}
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
            onClick={() => {
              setModeValue(1);
              onClickSpellCheck();
            }}
            className={modeValue ? '' : 'pale'}
          >
            문법검사
          </TopBtn>
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'28vw'}
          heightSize={'65vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'start'}
          IsBorder={'none'}
          style={{
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          {modeValue == 1 ? (
            /* 문법검사 */
            <MainPaleBox
              widthSize={'28vw'}
              heightSize={'70vh'}
              paddingSize={'1vw'}
              fontColor={'black'}
              fontSize={'2vmin'}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {spellCheckResult.map((spellWord: FlggedToken, idx) => {
                // console.log('얍', spellWord);
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
                    key={`spell-word-${idx}`}
                  >
                    <WordText>
                      <p className="front" style={{ fontSize: '2.5vmin' }}>
                        {spellWord.token} {'=>'}{' '}
                        {spellWord.suggestions[0].suggestion}
                      </p>
                      <p className="back">{spellWord.type}</p>
                    </WordText>
                    {/* {aWord.example} */}
                  </BackBlurBox>
                );
              })}
              {/* <p>{spellCheckResult}</p> */}
            </MainPaleBox>
          ) : (
            /* 단어장 */
            <MainPaleBox
              widthSize={'28vw'}
              heightSize={'70vh'}
              paddingSize={'1vw'}
              fontColor={'black'}
              fontSize={'2vmin'}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {wordBookList.map((aWord: WordBook, idx) => {
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
                    key={`word-${idx}`}
                  >
                    <WordCheckBox
                      className={
                        filterTarget.includes(aWord.word) ? 'checked' : ''
                      }
                    />
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
          )}
        </FlexTransparentDiv>
      </FlexTransparentDiv>
      <FlexTransparentDiv
        widthSize={'2vw'}
        heightSize={'70vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'start'}
        IsBorder={'none'}
      ></FlexTransparentDiv>
      <FlexTransparentDiv
        widthSize={'50vw'}
        heightSize={'70vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'start'}
        IsBorder={'none'}
      >
        <FlexTransparentDiv
          widthSize={'50vw'}
          heightSize={'5vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'end'}
          alignItems={'end'}
          IsBorder={'none'}
        >
          {/* <TopBtn
            widthSize={'7vw'}
            heightSize={'4vh'}
            paddingSize={'0'}
            fontColor={'black'}
            fontSize={'2vmin'}
            backgroundColor={'blue'}
            style={{ marginRight: '1vw' }}
          >
            파일 저장
          </TopBtn> */}
          <TopBtn
            widthSize={'7vw'}
            heightSize={'4vh'}
            paddingSize={'0'}
            fontColor={'black'}
            fontSize={'2vmin'}
            backgroundColor={'blue'}
            style={{ marginRight: '2vw' }}
            onClick={essaySave}
          >
            저장
          </TopBtn>
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'50vw'}
          heightSize={'65vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'start'}
          IsBorder={'none'}
        >
          <MainBox
            widthSize={'50vw'}
            heightSize={'70vh'}
            paddingSize={'1vw'}
            fontColor={'black'}
            fontSize={'2vmin'}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <HighlightTextAreaWrapper>
              <HighlightWithinTextarea
                value={textAreaValue}
                highlight={{
                  highlight: modeValue ? spellFilterTarget : filterTarget,
                  className: modeValue ? 'red' : 'blue',
                }}
                onChange={onChange}
              ></HighlightWithinTextarea>
            </HighlightTextAreaWrapper>
          </MainBox>
        </FlexTransparentDiv>
      </FlexTransparentDiv>
    </WordListAndWritingContainer>
  );
};

export default WordListAndWritingContainerComp;
