import { useEffect, useState, useRef } from 'react';
import { studyActions } from '../../../../features/study/study-slice';
import { useAppSelector, useAppDispatch } from '../../../../utils/hooks';
import { WordListAndWritingContainer } from '../../../../styles/Writing/WritingStyle';
import {
  FlexTransparentDiv,
  ToastContainer,
} from '../../../../styles/Common/CommonDivStyle';
import {
  TopBtn,
  MoveToNextRightBtn,
  MoveToNextLeftBtn,
} from '../../../../styles/Common/CommonBtnStyle';
import {
  StudyPageParams,
  WordCheckPayload,
  FlggedToken,
  SaveEssayPayload,
} from '../../../../models';
import { writingActions } from '../../../../features/writing/writing-slice';
import { useOutletContext } from 'react-router-dom';
import { IheaderProps } from '../../../../layout/Header';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { ToastMessage } from '../../../../utils/ToastMessage';
import WordBookComp from './WordBookComp';
import TypoCorrectionComp from './TypoCorrectionComp';
import HighlightTextAreaComp from './HighlightTextAreaComp';
import WritingCircularNavComp from './WritingCircularNavComp';

export interface IworlListAndWrtingProps {
  pageParams: StudyPageParams;
}

const WordListAndWritingContainerComp = ({
  pageParams,
}: IworlListAndWrtingProps) => {
  // utils
  const dispatch = useAppDispatch();
  const { customMoveToNext } = useOutletContext<IheaderProps>();
  const moveToNext = customMoveToNext;
  // selector
  const wordBookList = useAppSelector((state) => state.study.wordBookList);
  const checkedWordList = useAppSelector(
    (state) => state.write.checkedWordList
  );
  const spellCheckLst = useAppSelector((state) => state.write.spellCheckLst);
  const userEssay = useAppSelector((state) => state.write.essay);
  const isSaveSuccess = useAppSelector((state) => state.write.isSaveSuccess);
  // state
  const [filterTarget, setFilterTarget] = useState<string[]>([]);
  const [filterEssayTarget, setFilterEssayTarget] = useState<string[]>([]);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [spellCheckResult, setSpellCheckResult] = useState<FlggedToken[]>([]);
  const [spellFilterTarget, setSpellFilterTarget] = useState<string[]>([]);
  const [layoutMode, setLayoutMode] = useState<number>(0);
  // 단어장(0) <-> 문법검사(1)
  const [modeValue, setModeValue] = useState(0);
  const [foldLayoutMode, setFoldLayoutMode] = useState<number>(0);

  // handler
  const onChangeText = (value: string) => setTextAreaValue(value);
  // essay 저장
  const essaySave = () => {
    const temp: SaveEssayPayload = {
      content: textAreaRef.current!.innerText,
      learningRecordId: Number(pageParams.learningRecordId),
    };
    console.log('뭐냥..');
    dispatch(writingActions.postSaveEssayStart(temp));
    console.log(temp);
  };
  // 스펠링 체크 온클릭
  const onClickSpellCheck = () => {
    dispatch(writingActions.spellCheckStart(textAreaRef.current!.innerText));
  };
  // ref
  const textAreaRef = useRef<HTMLDivElement>(null);

  // USEEFFECT
  // 처음에 단어장, 에세이 가져옴
  useEffect(() => {
    dispatch(studyActions.getWordBookStart(pageParams.learningRecordId));

    //내가 쓴 에세이 불러오는거
    dispatch(writingActions.getEssayStart(pageParams.learningRecordId));
  }, []);
  // 에세이 불러오면 textArea에 보여줌
  useEffect(() => {
    if (userEssay === null) {
      setTextAreaValue('');
    } else {
      setTextAreaValue(userEssay);
    }
  }, [userEssay]);
  // 에세이에 쓴 단어(단어장에 있는 것 중) state 업데이트
  useEffect(() => {
    const nextFilterTarget: string[] = [];
    const nextFilterEssayTarget: string[] = [];
    checkedWordList.map((checkWord: any) => {
      nextFilterTarget.push(checkWord.dict_word);
      nextFilterEssayTarget.push(checkWord.essay_word);
    });
    setFilterEssayTarget(nextFilterEssayTarget);
    setFilterTarget(nextFilterTarget);
  }, [checkedWordList]);

  // 2초 마다 단어 썼는지 체크해줌
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
        dispatch(writingActions.postCheckWordStart(wordCheckPayload));
      }
    }, 2000);
    return () => clearInterval(wordChecker);
  }, [wordBookList]); // wordbooklist가 있을 때 돌아가게 하기 위해

  // 문법 체크 업데이트
  useEffect(() => {
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

    setSpellCheckResult(temp);
    setSpellFilterTarget(tempFilterTarget);
  }, [spellCheckLst]);

  // useEffect(() => {
  //   if (isSaveSuccess !== null) {
  //     let timer = setTimeout(() => {
  //       // setDownloadToast(false);
  //       dispatch(writingActions.resetIsSaveSuccess());
  //     }, 1000);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [dispatch, isSaveSuccess]);

  return (
    <>
      {isSaveSuccess === true && (
        <ToastContainer
          widthSize={'20vw'}
          heightSize={'20vh'}
          paddingSize={'2vh 1vw'}
          fontColor={'black'}
          top={'40vh'}
          left={'40vw'}
        >
          <ToastMessage text={'에세이가 저장되었습니다.'}></ToastMessage>
        </ToastContainer>
      )}
      {isSaveSuccess === false && (
        <ToastContainer
          widthSize={'20vw'}
          heightSize={'20vh'}
          paddingSize={'2vh 1vw'}
          fontColor={'black'}
          top={'40vh'}
          left={'40vw'}
        >
          <ToastMessage text={'에세이 저장에 실패했습니다.'}></ToastMessage>
        </ToastContainer>
      )}
      <WordListAndWritingContainer
        style={
          layoutMode === 0
            ? { flexDirection: 'row' }
            : { flexDirection: 'column' }
        }
      >
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
        {/* textAreaValue를 참조하기 위한 컴포넌트 */}
        <div
          style={{ width: '0', height: '0', display: 'none' }}
          ref={textAreaRef}
        >
          {textAreaValue}
        </div>

        <FlexTransparentDiv
          widthSize={
            layoutMode === 0 ? (foldLayoutMode === 1 ? '2vw' : '28vw') : '80vw'
          }
          heightSize={
            layoutMode === 0 ? '70vh' : foldLayoutMode === 1 ? '2vh' : '25vh'
          }
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'start'}
          IsBorder={'none'}
        >
          {foldLayoutMode === 1 ? (
            <FlexTransparentDiv
              widthSize={'2vw'}
              heightSize={'5vh'}
              paddingSize={'0'}
              flexDirection={'row'}
              justifyContent={'start'}
              alignItems={'end'}
              IsBorder={'none'}
              style={{ minHeight: '4vh', transition: 'all 0.8s ease-in-out' }}
            />
          ) : (
            <FlexTransparentDiv
              widthSize={layoutMode === 0 ? '28vw' : '80vw'}
              heightSize={'5vh'}
              paddingSize={'0'}
              flexDirection={'row'}
              justifyContent={'start'}
              alignItems={'end'}
              IsBorder={'none'}
              style={{ transition: 'all 0.8s ease-in-out' }}
            >
              <TopBtn
                widthSize={'7vw'}
                heightSize={'5vh'}
                paddingSize={'0'}
                fontColor={'white'}
                fontSize={'2.5vmin'}
                backgroundColor={'blue'}
                style={{ marginRight: '1vw', marginLeft: '1vw' }}
                onClick={() => setModeValue(0)}
                className={modeValue ? 'pale' : ''}
              >
                단어장
              </TopBtn>
              <TopBtn
                widthSize={'7vw'}
                heightSize={'5vh'}
                paddingSize={'0'}
                fontColor={'white'}
                fontSize={'2.5vmin'}
                backgroundColor={'blue'}
                style={{ marginRight: '1vw' }}
                onClick={() => {
                  setModeValue(1);
                  onClickSpellCheck();
                }}
                className={modeValue ? '' : 'pale'}
              >
                오타검사
              </TopBtn>
            </FlexTransparentDiv>
          )}

          <FlexTransparentDiv
            widthSize={layoutMode === 0 ? '28vw' : '80vw'}
            heightSize={layoutMode === 0 ? '70vh' : '25vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'start'}
            IsBorder={'none'}
            style={{ transition: 'all 0.8s ease-in-out' }}
          >
            {modeValue == 1 ? (
              /* 문법검사 */
              <TypoCorrectionComp
                layoutMode={layoutMode}
                spellCheckResult={spellCheckResult}
                foldLayoutMode={foldLayoutMode}
                setFoldLayoutMode={setFoldLayoutMode}
              ></TypoCorrectionComp>
            ) : (
              /* 단어장 */
              <WordBookComp
                wordBookList={wordBookList}
                filterTarget={filterTarget}
                layoutMode={layoutMode}
                foldLayoutMode={foldLayoutMode}
                setFoldLayoutMode={setFoldLayoutMode}
              ></WordBookComp>
            )}
          </FlexTransparentDiv>
        </FlexTransparentDiv>
        {/* SPACER */}
        <FlexTransparentDiv
          widthSize={layoutMode === 0 ? '2vw' : '80vw'}
          heightSize={layoutMode === 0 ? '70vh' : '5vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'start'}
          IsBorder={'none'}
          style={{ transition: 'all 0.8s ease-in-out' }}
        ></FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={
            layoutMode === 0 ? (foldLayoutMode === 1 ? '75vw' : '50vw') : '80vw'
          }
          heightSize={
            layoutMode === 0 ? '70vh' : foldLayoutMode === 0 ? '45vh' : '68vh'
          }
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'start'}
          IsBorder={'none'}
          style={{ transition: 'all 0.8s ease-in-out' }}
        >
          <FlexTransparentDiv
            widthSize={
              layoutMode === 0
                ? foldLayoutMode === 1
                  ? '75vw'
                  : '50vw'
                : '80vw'
            }
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
              heightSize={'5vh'}
              paddingSize={'0'}
              fontColor={'white'}
              fontSize={'2.5vmin'}
              backgroundColor={'blue'}
              style={{ marginRight: '2vw' }}
              onClick={essaySave}
            >
              저장
            </TopBtn>
          </FlexTransparentDiv>
          <FlexTransparentDiv
            widthSize={
              layoutMode === 0
                ? foldLayoutMode === 1
                  ? '75vw'
                  : '50vw'
                : '80vw'
            }
            heightSize={
              layoutMode === 0 ? '70vh' : foldLayoutMode === 0 ? '45vh' : '63vh'
            }
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={layoutMode === 0 ? 'start' : 'center'}
            alignItems={'start'}
            IsBorder={'none'}
          >
            <HighlightTextAreaComp
              textAreaValue={textAreaValue}
              modeValue={modeValue}
              spellFilterTarget={spellFilterTarget}
              filterEssayTarget={filterEssayTarget}
              onChangeText={onChangeText}
              foldLayoutMode={foldLayoutMode}
              layoutMode={layoutMode}
            />
          </FlexTransparentDiv>
        </FlexTransparentDiv>
        <WritingCircularNavComp
          layoutMode={layoutMode}
          setLayoutMode={setLayoutMode}
        ></WritingCircularNavComp>
      </WordListAndWritingContainer>
    </>
  );
};

export default WordListAndWritingContainerComp;
