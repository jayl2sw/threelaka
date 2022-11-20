import { FlggedToken } from '../../../../models';
import { SpellText } from '../../../../styles/Writing/WritingStyle';
import {
  MainPaleBox,
  BackBlurBox,
  FlexTransparentDiv,
} from '../../../../styles/Common/CommonDivStyle';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import { useHorizontalScroll } from '../../../../utils/useSideScroll';

// 필요한 props interface
interface ITypoCorretionProps {
  spellCheckResult: FlggedToken[];
  layoutMode: number;
  foldLayoutMode: number;
  setFoldLayoutMode: (nextMode: number) => void;
}

const TypoCorrectionComp = ({
  spellCheckResult,
  layoutMode,
  foldLayoutMode,
  setFoldLayoutMode,
}: ITypoCorretionProps) => {
  const scrollRef = useHorizontalScroll([
    foldLayoutMode,
    layoutMode,
  ]) as React.MutableRefObject<HTMLDivElement>;
  return (
    <>
      {layoutMode === 0 ? (
        foldLayoutMode === 0 ? (
          <>
            <MainPaleBox
              widthSize={'28.5vw'}
              heightSize={'70vh'}
              paddingSize={'1vw'}
              fontColor={'black'}
              fontSize={'2vmin'}
              style={{
                position: 'relative',
                display: 'flex',
              }}
            >
              <FlexTransparentDiv
                widthSize={layoutMode === 0 ? '27.5vw' : '80vw'}
                heightSize={layoutMode === 0 ? '65vh' : '25vh'}
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
                  transition: 'all 0.8s ease-in-out',
                }}
              >
                {spellCheckResult.map((spellWord: FlggedToken, idx) => {
                  // console.log('얍', spellWord);
                  return (
                    <BackBlurBox
                      widthSize={'25.3vw'}
                      heightSize={'5vh'}
                      paddingSize={'1vw'}
                      fontColor={'black'}
                      fontSize={'1vmin'}
                      style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        marginBottom: '1vh',
                        transition: 'all 0.8s ease-in-out',
                      }}
                      key={`spell-word-${idx}`}
                    >
                      <SpellText>
                        {spellWord.type === 'UnknownToken' ? (
                          <p style={{ fontSize: '2.5vmin' }}>
                            <span>수정&nbsp;&nbsp;</span>
                            <span style={{ color: 'red' }}>
                              {spellWord.token}
                            </span>{' '}
                            {'=>'} {spellWord.suggestions[0].suggestion}
                          </p>
                        ) : (
                          <p style={{ fontSize: '2.5vmin' }}>
                            <span>반복&nbsp;&nbsp;</span>
                            <span style={{ color: 'red' }}>
                              {spellWord.token}
                            </span>
                          </p>
                        )}
                      </SpellText>
                    </BackBlurBox>
                  );
                })}
              </FlexTransparentDiv>
            </MainPaleBox>
            <div
              style={{
                width: '2vw',
                height: '5vh',
                // border: '3px solid blue',
                position: 'absolute',
                zIndex: 5,
                top: '50vh',
                left: '37vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setFoldLayoutMode(1)}
            >
              <RiMenuUnfoldFill size={30}>ddd</RiMenuUnfoldFill>
            </div>
          </>
        ) : (
          <MainPaleBox
            widthSize={'2vw'}
            heightSize={'70vh'}
            paddingSize={'1vw'}
            fontColor={'black'}
            fontSize={'2vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'scroll',
              overflowX: 'hidden',
              transition: 'all 0.5s ease-in-out',
            }}
          >
            <div
              style={{
                width: '2vw',
                height: '5vh',
                // border: '3px solid blue',
                position: 'absolute',
                top: '50vh',
                left: '11vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setFoldLayoutMode(0)}
            >
              <RiMenuUnfoldFill size={30}></RiMenuUnfoldFill>
            </div>
            {/* <p>{spellCheckResult}</p> */}
          </MainPaleBox>
        )
      ) : foldLayoutMode === 0 ? (
        <MainPaleBox
          widthSize={layoutMode === 0 ? '28vw' : '80vw'}
          heightSize={'25vh'}
          paddingSize={'1vw'}
          fontColor={'black'}
          fontSize={'2vmin'}
          style={{
            display: 'flex',
            flexDirection: 'row',
            overflowY: 'hidden',
            overflowX: 'auto',
            transition: 'all 0.8s ease-in-out',
          }}
        >
          <FlexTransparentDiv
            widthSize={layoutMode === 0 ? '26.5vw' : '80vw'}
            heightSize={layoutMode === 0 ? '65vh' : '22.5vh'}
            paddingSize={'0'}
            flexDirection={'row'}
            justifyContent={'start'}
            alignItems={'start'}
            IsBorder={'none'}
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              transition: 'all 0.8s ease-in-out',
            }}
            ref={scrollRef}
          >
            {spellCheckResult.map((spellWord: FlggedToken, idx) => {
              // console.log('얍', spellWord);
              return (
                <BackBlurBox
                  widthSize={'19vw'}
                  heightSize={'21vh'}
                  paddingSize={'1vw'}
                  fontColor={'black'}
                  fontSize={'1vmin'}
                  style={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'start',
                    flexDirection: 'column',
                    marginRight: '1vh',
                    position: 'relative',
                    transition: 'all 0.8s ease-in-out',
                  }}
                  key={`spell-word-${idx}`}
                >
                  <SpellText
                    style={{ flexDirection: 'column', fontSize: '2.5vmin' }}
                  >
                    {spellWord.type === 'UnknownToken' ? (
                      <>
                        <div
                          style={{
                            fontSize: '2.5vmin',
                            color: 'green',
                            height: '5vh',
                          }}
                        >
                          틀린 표현
                        </div>
                        <div style={{ color: 'red', height: '5vh' }}>
                          {spellWord.token}
                        </div>
                        <div style={{ color: '#4a9fff', height: '5vh' }}>
                          변경 제안
                        </div>
                        <div style={{ color: 'black', height: '5vh' }}>
                          {spellWord.suggestions[0].suggestion}
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            fontSize: '2.5vmin',
                            color: 'green',
                            height: '5vh',
                          }}
                        >
                          반복 표현
                        </div>
                        <div style={{ color: 'red', height: '5vh' }}>
                          {spellWord.token}
                        </div>
                        <div style={{ color: '#4a9fff', height: '5vh' }}>
                          변경 제안
                        </div>
                        <div style={{ color: 'black', height: '5vh' }}>
                          하나로 줄여주세요
                        </div>
                      </>
                    )}
                  </SpellText>

                  {/* {aWord.example} */}
                </BackBlurBox>
              );
            })}

            {/* <p>{spellCheckResult}</p> */}
          </FlexTransparentDiv>
          <div
            style={{
              width: '2vw',
              height: '66vh',
              // border: '3px solid blue',
              position: 'absolute',
              top: '11vh',
              right: '50vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => setFoldLayoutMode(1)}
          >
            <RiMenuFoldFill size={30}></RiMenuFoldFill>
          </div>
        </MainPaleBox>
      ) : (
        <MainPaleBox
          widthSize={'80vw'}
          heightSize={'3vh'}
          paddingSize={'1vw'}
          fontColor={'black'}
          fontSize={'2vmin'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll',
            overflowX: 'hidden',
            transition: 'all 0.5s ease-in-out',
          }}
        >
          <div
            style={{
              width: '2vw',
              height: '66vh',
              // border: '3px solid blue',
              position: 'absolute',
              top: '-12.5vh',
              right: '50vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => setFoldLayoutMode(0)}
          >
            <RiMenuUnfoldFill size={30}></RiMenuUnfoldFill>
          </div>
          {/* <p>{spellCheckResult}</p> */}
        </MainPaleBox>
      )}
    </>
  );
};

export default TypoCorrectionComp;
