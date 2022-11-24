import {
  FlexTransparentDiv,
  MainBox,
  ToastContainer,
} from '../../../../styles/Common/CommonDivStyle';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../utils/hooks';
import {
  StudyPageParams,
  TedScript,
  WordMeaning,
  deleteAWord,
} from '../../../../models';
import { readActions } from '../../../../features/Read/read-slice';
import { studyActions } from '../../../../features/study/study-slice';
import {
  GradientRoundBtn,
  MoveToNextRightBtn,
  MainBtn,
} from '../../../../styles/Common/CommonBtnStyle';
import { DictInput, DictResult } from '../../../../styles/Read/ReadStyle';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import { GoSearch } from 'react-icons/go';
import { LoadingSpinner } from '../../../../styles/Common/LoadingSpinner';
import { ToastMessage } from '../../../../utils/ToastMessage';

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
  // const [addSuccessModal, setAddSuccessModal] = useState<boolean>(false);
  const wordBookLst = useAppSelector((state) => state.study.wordBookList);
  // selector
  const isAddSuccess = useAppSelector((state) => state.read.isAddSuccess);
  const isDeleteSuccess = useAppSelector((state) => state.read.isDeleteSuccess);
  const wordLoading = useAppSelector((state) => state.study.loading);
  const searchDictError = useAppSelector(
    (state) => state.study.searchDictError
  );
  const wordMeaning: WordMeaning = useAppSelector(
    (state) => state.study.wordMeaning
  );
  const [isInWordBookId, setIsnWordBookId] = useState<number>(0);

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
    // const trimmedWord = e.target.value.replace(/\s+$/, '').toLowerCase();
    setDictInputvalue(e.target.value);
  };

  // 단어장에서 단어 삭제
  const deleteWordToWordbook = () => {
    const payload: deleteAWord = {
      lrId: pageParams.learningRecordId,
      wordBookId: isInWordBookId,
    };
    dispatch(readActions.deleteWordToWordBookStart(payload));
  };

  // 단어장 추가 성공 alert
  useEffect(() => {
    if (isAddSuccess !== null) {
      let timer = setTimeout(() => {
        // setDownloadToast(false);
        dispatch(readActions.resetIsAddSuccess());
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, isAddSuccess]);

  // 단어장 삭제 성공 alert
  useEffect(() => {
    if (isDeleteSuccess !== null) {
      let timer = setTimeout(() => {
        // setDownloadToast(false);
        dispatch(readActions.resetIsDeleteSuccess());
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, isDeleteSuccess]);

  // 사전 검색 성공 마다 check
  useEffect(() => {
    const wordId = wordMeaning.wordId;
    if (wordId === '') {
      setIsnWordBookId(0);
    } else {
      const result = wordBookLst.find((word) => word.word === wordId);
      if (result === undefined) {
        setIsnWordBookId(0);
      } else {
        setIsnWordBookId(result?.wordbookId);
      }
    }
  }, [wordMeaning, wordBookLst]);

  return (
    <>
      {isAddSuccess && (
        <ToastContainer
          widthSize={'20vw'}
          heightSize={'20vh'}
          paddingSize={'2vh 1vw'}
          fontColor={'black'}
          top={'40vh'}
          left={'40vw'}
        >
          <ToastMessage text={'단어장에 성공적으로 추가됐어요'}></ToastMessage>
        </ToastContainer>
      )}
      {isAddSuccess === false && (
        <ToastContainer
          widthSize={'20vw'}
          heightSize={'20vh'}
          paddingSize={'2vh 1vw'}
          fontColor={'black'}
          top={'40vh'}
          left={'40vw'}
        >
          <ToastMessage text={'이미 단어장에 있는 단어에요'}></ToastMessage>
        </ToastContainer>
      )}
      {isDeleteSuccess && (
        <ToastContainer
          widthSize={'20vw'}
          heightSize={'20vh'}
          paddingSize={'2vh 1vw'}
          fontColor={'black'}
          top={'40vh'}
          left={'40vw'}
        >
          <ToastMessage text={'단어장에서 삭제됐어요'}></ToastMessage>
        </ToastContainer>
      )}
      {isDeleteSuccess === false && (
        <ToastContainer
          widthSize={'20vw'}
          heightSize={'20vh'}
          paddingSize={'2vh 1vw'}
          fontColor={'black'}
          top={'40vh'}
          left={'40vw'}
        >
          <ToastMessage text={'삭제에 실패했어요'}></ToastMessage>
        </ToastContainer>
      )}
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
          widthSize={layoutMode === 2 ? '26vw' : '36vw'}
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
                  // marginLeft: '3vw',
                  // opacity: '0.7',
                }
              : {
                  // border: '2px solid pink',
                  background: 'rgba(152, 151, 169, 0.5)',
                  borderRadius: '5vmin',
                  // marginLeft: '5vw',
                  // opacity: '0.7',
                }
          }
        >
          <DictInput
            value={dictInputValue}
            onChange={dictInputChange}
            onKeyDown={(e) => WordSearchEnterHandler(e, dictInputValue)}
            style={layoutMode === 2 ? { width: '24vw' } : {}}
            placeholder={'단어를 검색해 보세요'}
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
        {!wordLoading &&
        wordMeaning.wordList.length === 0 &&
        dictInputValue === '' ? (
          <FlexTransparentDiv
            widthSize={layoutMode === 2 ? '27.5vw' : '37.5vw'}
            heightSize={layoutMode === 2 ? '48vh' : '28vh'}
            paddingSize={'0'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{
              overflowY: 'scroll',
              overflowX: 'hidden',
              paddingBottom: '2vh',
            }}
          >
            <div style={{ width: '16vw', fontSize: '2.5vmin' }}>
              단어를 클릭해 검색해 보세요
            </div>
            <img
              style={{
                width: '7vmin',
                height: '7vmin',
                objectFit: 'cover',
              }}
              src={`https://threelaka.s3.ap-northeast-2.amazonaws.com/white.png`}
            ></img>
          </FlexTransparentDiv>
        ) : (
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
                  layoutMode === 2
                    ? { marginTop: '10vh' }
                    : { marginTop: '2vh' }
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
                  <div
                    style={{
                      width: layoutMode === 2 ? '10vw' : '15vw',
                      minHeight: '10vh',
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      fontSize: '5vmin',
                      fontFamily: 'PretendardBold',
                    }}
                  >
                    {' '}
                    {wordMeaning.wordId}
                  </div>

                  {wordMeaning.wordId !== '' && dictInputValue === '' ? (
                    isInWordBookId === 0 ? (
                      <MainBtn
                        widthSize={layoutMode === 2 ? '12vw' : '12vw'}
                        heightSize={'5vh'}
                        paddingSize={'0'}
                        fontSize={'2.2vmin'}
                        fontColor={'black'}
                        backgroundColor={'gradient'}
                        onClick={(e) => {
                          AddWordToWordbook(e);
                          // setAddSuccessModal(true);
                        }}
                        style={{ marginLeft: layoutMode === 2 ? '4vw' : '7vw' }}
                      >
                        단어장에 추가
                      </MainBtn>
                    ) : (
                      <MainBtn
                        widthSize={layoutMode === 2 ? '12vw' : '12vw'}
                        heightSize={'5vh'}
                        paddingSize={'0'}
                        fontSize={'2.2vmin'}
                        fontColor={'white'}
                        backgroundColor={'black'}
                        onClick={() => {
                          deleteWordToWordbook();
                          // setAddSuccessModal(true);
                        }}
                        style={{ marginLeft: '7vw' }}
                      >
                        단어장에서 삭제
                      </MainBtn>
                    )
                  ) : (
                    ''
                  )}
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
                          paddingSize={
                            layoutMode === 2 ? '0vw 0vw 1vw 0vw' : '1vw'
                          }
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
        )}
      </MainBox>
    </>
  );
};

export default DictionaryComp;
