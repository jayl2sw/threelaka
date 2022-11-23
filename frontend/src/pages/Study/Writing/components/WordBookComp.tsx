// import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { WordBook } from '../../../../models';
import {
  WordCheckBox,
  WordText,
  ArcodianBox,
  HorizontalBox,
  HorizontalWordText,
  HorizontalWordCheckBox,
} from '../../../../styles/Writing/WritingStyle';
import {
  MainPaleBox,
  FlexTransparentDiv,
  BackBlurBox,
} from '../../../../styles/Common/CommonDivStyle';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from 'react-icons/ai';
import { HiBarsArrowUp, HiBars2 } from 'react-icons/hi2';
import { useHorizontalScroll } from '../../../../utils/useSideScroll';
import { transform } from '@babel/core';

// 필요한 props interface
interface IWordBookProps {
  wordBookList: WordBook[];
  filterTarget: string[];
  layoutMode: number;
  foldLayoutMode: number;
  setFoldLayoutMode: (nextMode: number) => void;
}

const WordBookComp = ({
  wordBookList,
  filterTarget,
  layoutMode,
  foldLayoutMode,
  setFoldLayoutMode,
}: IWordBookProps) => {
  const scrollRef = useHorizontalScroll([
    foldLayoutMode,
    layoutMode,
  ]) as React.MutableRefObject<HTMLDivElement>;

  return (
    <>
      {foldLayoutMode === 0 ? (
        layoutMode === 0 ? (
          <MainPaleBox
            widthSize={layoutMode === 0 ? '28.5vw' : '80vw'}
            heightSize={layoutMode === 0 ? '70vh' : '25vh'}
            paddingSize={'1vw'}
            fontColor={'black'}
            fontSize={'2vmin'}
            style={{
              display: 'flex',
              position: 'relative',
              transition: 'all 0.8s ease-in-out',
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
              {wordBookList.map((aWord: WordBook, idx) => {
                return (
                  <ArcodianBox
                    key={`word-${idx}`}
                    style={{ transition: 'all 0.8s ease-in-out' }}
                  >
                    <WordCheckBox
                      className={
                        filterTarget.includes(aWord.word) ? 'checked' : ''
                      }
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
                        <span
                          style={{
                            fontSize:
                              aWord.example.length > 100 ? '1.5vmin' : '2vmin',
                          }}
                        >
                          &nbsp;&nbsp;{aWord.example}
                        </span>
                      </p>
                    </WordText>
                    {/* {aWord.example} */}
                  </ArcodianBox>
                );
              })}
            </FlexTransparentDiv>
            {layoutMode === 0 ? (
              <div
                style={{
                  width: '2vw',
                  height: '66vh',
                  // border: '3px solid blue',
                  position: 'absolute',
                  right: '0vw',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => setFoldLayoutMode(1)}
              >
                <HiBars2
                  style={{ transform: 'rotate(90deg)' }}
                  size={30}
                ></HiBars2>
              </div>
            ) : (
              <div
                style={{
                  width: '78vw',
                  height: '2vh',
                  // border: '3px solid blue',
                  position: 'absolute',
                  bottom: '-2vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => setFoldLayoutMode(1)}
              >
                <HiBars2
                  style={{ transform: 'rotate(90deg)' }}
                  size={30}
                ></HiBars2>
              </div>
            )}
          </MainPaleBox>
        ) : (
          <MainPaleBox
            widthSize={layoutMode === 0 ? '28vw' : '80vw'}
            heightSize={layoutMode === 0 ? '70vh' : '25vh'}
            paddingSize={'1vw'}
            fontColor={'black'}
            fontSize={'2vmin'}
            style={{
              display: 'flex',
              position: 'relative',
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
              {wordBookList.map((aWord: WordBook, idx) => {
                return (
                  <BackBlurBox
                    widthSize="19vw"
                    heightSize="21vh"
                    paddingSize="0"
                    fontSize="2vmin"
                    fontColor="black"
                    key={`word-${idx}`}
                    itemID={`word-${idx}`}
                    style={{
                      marginRight: '0.5vw',
                      transition: 'all 0.8s ease-in-out',
                    }}
                  >
                    <FlexTransparentDiv
                      widthSize={'19vw'}
                      heightSize={'3vh'}
                      paddingSize={'1vh 1vw 1vh 1vw'}
                      flexDirection={'row'}
                      justifyContent={'start'}
                      alignItems={'start'}
                      IsBorder={'none'}
                    >
                      <HorizontalWordCheckBox
                        className={
                          filterTarget.includes(aWord.word) ? 'checked' : ''
                        }
                      />
                      <div
                        style={{
                          fontSize: '2.5vmin',
                          textDecoration: filterTarget.includes(aWord.word)
                            ? 'line-through'
                            : '',
                        }}
                      >
                        {aWord.word}
                      </div>
                    </FlexTransparentDiv>

                    <HorizontalWordText>
                      <p>
                        <span style={{ fontSize: '2vmin', color: '#4a9fff' }}>
                          {'example'}
                        </span>
                        <br style={{ marginBottom: '5vmin' }} />
                        <span
                          style={{
                            fontSize:
                              aWord.example.length > 250
                                ? '1.2vmin'
                                : aWord.example.length > 100
                                ? '1.5vmin'
                                : '2vmin',
                          }}
                        >
                          &nbsp;&nbsp;{aWord.example}
                        </span>
                      </p>
                    </HorizontalWordText>
                    {/* {aWord.example} */}
                  </BackBlurBox>
                );
              })}
            </FlexTransparentDiv>
            {layoutMode === 0 ? (
              <div
                style={{
                  width: '2vw',
                  height: '66vh',
                  // border: '3px solid blue',
                  position: 'absolute',
                  right: '-1vw',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => setFoldLayoutMode(1)}
              >
                <AiOutlineArrowLeft size={30}></AiOutlineArrowLeft>
              </div>
            ) : (
              <div
                style={{
                  width: '2vw',
                  height: '2vh',
                  // border: '3px solid blue',
                  position: 'absolute',
                  bottom: '0vh',
                  right: '40vw',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => setFoldLayoutMode(1)}
              >
                <HiBars2
                  style={{ transform: 'rotate(180deg)' }}
                  size={30}
                ></HiBars2>
              </div>
            )}
          </MainPaleBox>
        )
      ) : (
        <MainPaleBox
          widthSize={layoutMode === 0 ? '2vw' : '80vw'}
          heightSize={layoutMode === 0 ? '70vh' : '2vh'}
          paddingSize={'0'}
          fontColor={'black'}
          fontSize={'2vmin'}
          style={{
            display: 'flex',
            position: 'relative',
            transition: 'all 0.8s ease-in-out',
          }}
        >
          {layoutMode === 0 ? (
            <div
              style={{
                width: '2vw',
                height: '66vh',
                // border: '3px solid blue',
                position: 'absolute',
                right: '0vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setFoldLayoutMode(0)}
            >
              <HiBars2
                style={{ transform: 'rotate(90deg)' }}
                size={30}
              ></HiBars2>
            </div>
          ) : (
            <div
              style={{
                width: '78vw',
                height: '2vh',
                // border: '3px solid blue',
                position: 'absolute',
                bottom: '0vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setFoldLayoutMode(0)}
            >
              <HiBars2
                style={{ transform: 'rotate(180deg)' }}
                size={30}
              ></HiBars2>
              <div ref={scrollRef}></div>
            </div>
          )}
        </MainPaleBox>
      )}
    </>
  );
};

export default WordBookComp;
