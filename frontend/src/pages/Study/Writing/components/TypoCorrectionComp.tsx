import { FlggedToken } from '../../../../models';
import { SpellText } from '../../../../styles/Writing/WritingStyle';
import {
  MainPaleBox,
  BackBlurBox,
} from '../../../../styles/Common/CommonDivStyle';

// 필요한 props interface
interface ITypoCorretionProps {
  spellCheckResult: FlggedToken[];
  layoutMode: number;
}

const TypoCorrectionComp = ({
  spellCheckResult,
  layoutMode,
}: ITypoCorretionProps) => {
  return (
    <MainPaleBox
      widthSize={layoutMode === 0 ? '28vw' : '80vw'}
      heightSize={layoutMode === 0 ? '70vh' : '25vh'}
      paddingSize={'1vw'}
      fontColor={'black'}
      fontSize={'2vmin'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
    >
      {spellCheckResult.map((spellWord: FlggedToken, idx) => {
        // console.log('얍', spellWord);
        return (
          <BackBlurBox
            widthSize={layoutMode === 0 ? '26vw' : '77vw'}
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
            <SpellText>
              {spellWord.type === 'UnknownToken' ? (
                <p style={{ fontSize: '2.5vmin' }}>
                  <span>수정&nbsp;&nbsp;</span>
                  <span style={{ color: 'red' }}>{spellWord.token}</span> {'=>'}{' '}
                  {spellWord.suggestions[0].suggestion}
                </p>
              ) : (
                <p style={{ fontSize: '2.5vmin' }}>
                  <span>반복&nbsp;&nbsp;</span>
                  <span style={{ color: 'red' }}>{spellWord.token}</span>
                </p>
              )}
            </SpellText>
            {/* {aWord.example} */}
          </BackBlurBox>
        );
      })}
      {/* <p>{spellCheckResult}</p> */}
    </MainPaleBox>
  );
};

export default TypoCorrectionComp;
