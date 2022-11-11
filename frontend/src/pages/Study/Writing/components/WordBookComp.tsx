import React from 'react';
import { WordBook } from '../../../../models';
import {
  WordListAndWritingContainer,
  WordCheckBox,
  WordText,
  SpellText,
  HighlightTextAreaWrapper,
  ArcodianBox,
} from '../../../../styles/Writing/WritingStyle';
import {
  MainPaleBox,
  FlexTransparentDiv,
  BackBlurBox,
  MainBox,
} from '../../../../styles/Common/CommonDivStyle';

// 필요한 props interface
interface IWordBookProps {
  wordBookList: WordBook[];
  filterTarget: string[];
}

const WordBookComp = ({ wordBookList, filterTarget }: IWordBookProps) => {
  return (
    <MainPaleBox
      widthSize={'28vw'}
      heightSize={'70vh'}
      paddingSize={'1vw'}
      fontColor={'black'}
      fontSize={'2vmin'}
    >
      <FlexTransparentDiv
        widthSize={'26.5vw'}
        heightSize={'65vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'start'}
        IsBorder={'none'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        {wordBookList.map((aWord: WordBook, idx) => {
          return (
            <ArcodianBox key={`word-${idx}`}>
              <WordCheckBox
                className={filterTarget.includes(aWord.word) ? 'checked' : ''}
              />
              <WordText>
                <p
                  className={`${
                    filterTarget.includes(aWord.word) ? 'checked' : ''
                  } front`}
                  style={{ fontSize: '2.5vmin' }}
                >
                  {aWord.word}
                </p>
                <p className="back">
                  <span
                    style={{
                      fontSize: '2.5vmin',
                    }}
                  >
                    {aWord.word}
                  </span>
                  <br />
                  <br />
                  <span style={{ fontSize: '2vmin', color: '#4a9fff' }}>
                    {'example'}
                  </span>
                  <br style={{ marginBottom: '5vmin' }} />
                  <span style={{ fontSize: '2vmin' }}>
                    &nbsp;&nbsp;{aWord.example}
                  </span>
                </p>
              </WordText>
              {/* {aWord.example} */}
            </ArcodianBox>
          );
        })}
      </FlexTransparentDiv>
    </MainPaleBox>
  );
};

export default WordBookComp;
