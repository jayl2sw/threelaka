import {
  FlexTransparentDiv,
  MainBox,
} from '../../../../styles/Common/CommonDivStyle';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../utils/hooks';
import { StudyPageParams, TedScript, WordMeaning } from '../../../../models';
import { readActions } from '../../../../features/Read/read-slice';
import { studyActions } from '../../../../features/study/study-slice';
import {
  GradientRoundBtn,
  MoveToNextRightBtn,
} from '../../../../styles/Common/CommonBtnStyle';
import { DictInput, DictResult } from '../../../../styles/Read/ReadStyle';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import { GoSearch } from 'react-icons/go';
import { LoadingSpinner } from '../../../../styles/Common/LoadingSpinner';

// 필요한 props interface
interface IdictCompProps {
  selectedSentenceProp: string;
  pageParams: StudyPageParams;
  dictInputValue: string;
  setDictInputvalue: (newInputValue: string) => void;
  layoutMode: number;
}
const DictionaryComp = ({
  selectedSentenceProp,
  pageParams,
  dictInputValue,
  setDictInputvalue,
  layoutMode,
}: IdictCompProps) => {
  const dispatch = useAppDispatch();
  // state 선언
  const [addSuccessModal, setAddSuccessModal] = useState<boolean>(false);
  const wordBookLst = useAppSelector((state) => state.study.wordBookList);
  // selector
  const isAddSuccess = useAppSelector((state) => state.read.isAddSuccess);
  const wordLoading = useAppSelector((state) => state.study.loading);
  const searchDictError = useAppSelector(
    (state) => state.study.searchDictError
  );
  const wordMeaning: WordMeaning = useAppSelector(
    (state) => state.study.wordMeaning
  );

  // func
  // 단어장에 단어 추가하기
  const AddWordToWordbook = (e: React.MouseEvent<HTMLSpanElement>) => {
    const selectedSentence = selectedSentenceProp;

    const trimmedWord = dictInputValue.replace(/\s+$/, '').toLowerCase();

    if (trimmedWord === '') {
      const wordInfo = {
        definition: '',
        example: selectedSentence,
        lrId: pageParams.learningRecordId,
        word: wordMeaning.wordId,
      };
      dispatch(readActions.postAddWordToWordBookStart(wordInfo));
    } else {
      const wordInfo = {
        definition: '',
        example: selectedSentence,
        lrId: pageParams.learningRecordId,
        word: dictInputValue,
      };
      dispatch(readActions.postAddWordToWordBookStart(wordInfo));
    }
  };
  // 단어 찾기(trigger: enter)
  const WordSearchEnterHandler = (
    e: React.KeyboardEvent<HTMLSpanElement>,
    targetWord: string
  ) => {
    if (e.key === 'Enter') {
      const trimmedWord = targetWord.replace(/\s+$/, '').toLowerCase();
      dispatch(studyActions.SearchDictStart(trimmedWord));
      setDictInputvalue('');
    }
  };
  // 단어 찾기(trigger: click)
  const WordSearchHandler = (
    e: React.MouseEvent<HTMLSpanElement>,
    targetWord: string
  ) => {
    const trimmedWord = targetWord.replace(/\s+$/, '').toLowerCase();

    dispatch(studyActions.SearchDictStart(trimmedWord));
    setDictInputvalue('');
  };
  // input onchange
  const dictInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDictInputvalue(e.target.value);
  };

  // useEffect
  useEffect(() => {
    if (isAddSuccess) {
      setTimeout(() => {
        setAddSuccessModal(false);
      }, 1000);
    }
  }, [isAddSuccess]);

  return (
    <MainBox
      widthSize={layoutMode === 2 ? '30vw' : '40vw'}
      // 38 / 40 / 60
      heightSize={
        layoutMode === 0 ? '38vh' : layoutMode === 1 ? '40vh' : '60vh'
      }
      paddingSize={'4vh 0 2vh 2vw'}
      fontColor={'black'}
      fontSize={'1.5vmin'}
      style={
        layoutMode === 0
          ? { marginTop: '2vh', transition: 'all 0.5s ease-in-out' }
          : { marginTop: '0', transition: 'all 0.5s ease-in-out' }
      }
    >
      <FlexTransparentDiv
        widthSize={layoutMode === 2 ? '24vw' : '30vw'}
        heightSize={'5vh'}
        paddingSize={'0'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        IsBorder={'none'}
        style={
          layoutMode === 2
            ? {
                // border: '2px solid pink',
                background: 'rgba(152, 151, 169, 0.5)',
                borderRadius: '5vmin',
                marginLeft: '3vw',
                // opacity: '0.7',
              }
            : {
                // border: '2px solid pink',
                background: 'rgba(152, 151, 169, 0.5)',
                borderRadius: '5vmin',
                marginLeft: '5vw',
                // opacity: '0.7',
              }
        }
      >
        <GradientRoundBtn
          widthSize={'10vmin'}
          heightSize={'10vmin'}
          paddingSize={'0'}
          fontColor={'black'}
          fontSize={'2vmin'}
          backgroundColor={'gradient'}
          onClick={(e) => {
            AddWordToWordbook(e);
            setAddSuccessModal(true);
          }}
          style={
            layoutMode === 0
              ? {
                  background: 'transparent',
                  position: 'absolute',
                  top: '60.8vh',
                  left: '9vw',
                }
              : layoutMode === 1
              ? {
                  background: 'transparent',
                  position: 'absolute',
                  top: '18.2vh',
                  right: '43vw',
                }
              : {
                  background: 'transparent',
                  position: 'absolute',
                  top: '18vh',
                  right: '34vw',
                }
          }
        >
          {addSuccessModal ? (
            <div>{isAddSuccess}</div>
          ) : wordBookLst.find(
              (wordbook) => wordbook.word === wordMeaning.wordId
            ) === undefined ? (
            <TiStarOutline size={40} color={'#2e4a9e'} />
          ) : (
            <TiStarFullOutline size={40} color={'#2e4a9e'} />
          )}
        </GradientRoundBtn>
        <DictInput
          value={dictInputValue}
          onChange={dictInputChange}
          onKeyDown={(e) => WordSearchEnterHandler(e, dictInputValue)}
          style={layoutMode === 2 ? { width: '21vw' } : {}}
        />
        <GradientRoundBtn
          widthSize={'5vmin'}
          heightSize={'5vmin'}
          paddingSize={'0'}
          fontColor={'black'}
          fontSize={'2vmin'}
          backgroundColor={'gradient'}
          onClick={(e) => WordSearchHandler(e, dictInputValue)}
        >
          <GoSearch size={20} />
        </GradientRoundBtn>
      </FlexTransparentDiv>
      <FlexTransparentDiv
        widthSize={layoutMode === 2 ? '27.5vw' : '37.5vw'}
        heightSize={layoutMode === 2 ? '48vh' : '28vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'center'}
        IsBorder={'none'}
        style={{
          overflowY: 'scroll',
          overflowX: 'hidden',
          paddingTop: '1vh',
        }}
      >
        {/* {wordLoading ? '로딩중' : '로딩완료'} */}
        {wordLoading ? (
          <LoadingSpinner
            widthSize={layoutMode === 2 ? '15vmin' : '20vmin'}
            heightSize={layoutMode === 2 ? '15vmin' : '20vmin'}
            style={
              layoutMode === 2 ? { marginTop: '10vh' } : { marginTop: '2vh' }
            }
          />
        ) : (
          <>
            <div
              style={
                layoutMode === 2
                  ? {
                      width: '27vw',
                      minHeight: '7vh',
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      fontSize: '5vmin',
                      fontFamily: 'PretendardBold',
                    }
                  : {
                      width: '34vw',
                      minHeight: '10vh',
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      fontSize: '5vmin',
                      fontFamily: 'PretendardBold',
                    }
              }
            >
              {wordMeaning.wordId}
            </div>
            {searchDictError === '' ? (
              wordMeaning.wordList.map((aWord) => {
                return (
                  <FlexTransparentDiv
                    widthSize={layoutMode === 2 ? '27.5vw' : '34vw'}
                    heightSize={layoutMode === 2 ? '25vh' : '32vh'}
                    paddingSize={'0 1vw'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    IsBorder={'none'}
                    style={{
                      borderBottom: 'black 2px solid',
                      backgroundColor: 'white',
                      fontSize: '3vmin',
                      // border: 'blue 2px solid',
                    }}
                  >
                    <FlexTransparentDiv
                      widthSize={layoutMode === 2 ? '27.5vw' : '37.5vw'}
                      heightSize={layoutMode === 2 ? '15vh' : '14vh'}
                      paddingSize={'1vw 2vw 1vw 1vw'}
                      flexDirection={'row'}
                      justifyContent={'start'}
                      alignItems={'start'}
                      IsBorder={'none'}
                    >
                      <FlexTransparentDiv
                        widthSize={'80%'}
                        heightSize={layoutMode === 2 ? '15vh' : '14vh'}
                        paddingSize={layoutMode === 2 ? '0vw' : '1vw'}
                        flexDirection={'column'}
                        justifyContent={'start'}
                        alignItems={'start'}
                        IsBorder={'none'}
                      >
                        <div
                          style={{
                            color: '#4a9fff',
                            fontWeight: 'bold',
                          }}
                        >
                          definition
                        </div>
                        <div
                          style={{
                            paddingLeft: '0.5vw',
                            fontSize:
                              aWord.wordDefinition.length > 100
                                ? '2vmin'
                                : '2.5vmin',
                          }}
                        >
                          {aWord.wordDefinition}
                        </div>
                        {/* <p style={{ width: '80%', padding: '0 1vw' }}>
                  definition: {aWord.wordDefinition}
                </p> */}
                      </FlexTransparentDiv>
                      <div
                        style={{
                          width: '20%',
                          padding: '0 1vw',
                          color: 'red',
                          fontSize: '2.5vmin',
                          fontWeight: 'bold',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {aWord.lexicalCategory}
                      </div>
                    </FlexTransparentDiv>
                    <FlexTransparentDiv
                      widthSize={layoutMode === 2 ? '27.5vw' : '37.5vw'}
                      heightSize={layoutMode === 2 ? '10vh' : '14vh'}
                      paddingSize={layoutMode === 2 ? '0vw 0vw 1vw 0vw' : '1vw'}
                      flexDirection={'row'}
                      justifyContent={'start'}
                      alignItems={'center'}
                      IsBorder={'none'}
                    >
                      <FlexTransparentDiv
                        widthSize={layoutMode === 2 ? '100%' : '80%'}
                        heightSize={'14vh'}
                        paddingSize={'1vw'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'start'}
                        IsBorder={'none'}
                      >
                        <div
                          style={{
                            color: '#4a9fff',
                            fontWeight: 'bold',
                          }}
                        >
                          example
                        </div>
                        <div
                          style={{
                            paddingLeft: '0.5vw',
                            fontSize: '2.5vmin',
                          }}
                        >
                          {aWord.wordExample}
                        </div>
                        {/* <p style={{ width: '80%', padding: '0 1vw' }}>
                  definition: {aWord.wordDefinition}
                </p> */}
                      </FlexTransparentDiv>
                    </FlexTransparentDiv>
                  </FlexTransparentDiv>
                );
              })
            ) : (
              <p style={{ fontSize: '2vmin' }}>{searchDictError}</p>
            )}
          </>
        )}
      </FlexTransparentDiv>
    </MainBox>
  );
};

export default DictionaryComp;
