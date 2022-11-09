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
  wordMeaning: WordMeaning;
  dictInputValue: string;
  setDictInputvalue: (dictInputValue: string) => void;
}
const DictionaryComp = ({
  selectedSentenceProp,
  pageParams,
  wordMeaning,
  dictInputValue,
  setDictInputvalue,
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
      widthSize={'40vw'}
      heightSize={'38vh'}
      paddingSize={'4vh 0 2vh 2vw'}
      fontColor={'black'}
      fontSize={'1.5vmin'}
      style={{ marginTop: '2vh' }}
    >
      <FlexTransparentDiv
        widthSize={'30vw'}
        heightSize={'5vh'}
        paddingSize={'0'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        IsBorder={'none'}
        style={{
          // border: '2px solid pink',
          background: 'rgba(152, 151, 169, 0.5)',
          borderRadius: '5vmin',
          marginLeft: '5vw',
          // opacity: '0.7',
        }}
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
          style={{
            background: 'transparent',
            position: 'absolute',
            top: '58.5vh',
            left: '9vw',
          }}
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
        widthSize={'37.5vw'}
        heightSize={'28vh'}
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
            widthSize="20vmin"
            heightSize="20vmin"
            style={{ marginTop: '2vh' }}
          />
        ) : (
          <>
            <div
              style={{
                width: '34vw',
                minHeight: '10vh',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                fontSize: '5vmin',
                fontFamily: 'PretendardBold',
              }}
            >
              {wordMeaning.wordId}
            </div>
            {searchDictError === '' ? (
              wordMeaning.wordList.map((aWord) => {
                return (
                  <DictResult>
                    <FlexTransparentDiv
                      widthSize={'37.5vw'}
                      heightSize={'14vh'}
                      paddingSize={'1vw'}
                      flexDirection={'row'}
                      justifyContent={'start'}
                      alignItems={'center'}
                      IsBorder={'none'}
                    >
                      <FlexTransparentDiv
                        widthSize={'80%'}
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
                          definition
                        </div>
                        <div
                          style={{
                            paddingLeft: '0.5vw',
                            fontSize: '2.5vmin',
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
                      widthSize={'37.5vw'}
                      heightSize={'14vh'}
                      paddingSize={'1vw'}
                      flexDirection={'row'}
                      justifyContent={'start'}
                      alignItems={'center'}
                      IsBorder={'none'}
                    >
                      <FlexTransparentDiv
                        widthSize={'80%'}
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
                  </DictResult>
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
