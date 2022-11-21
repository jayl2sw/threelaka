import { MainBox } from '../../../../styles/Common/CommonDivStyle';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';
import { HighlightTextAreaWrapper } from '../../../../styles/Writing/WritingStyle';
import { useRef } from 'react';

// 필요한 props interface
interface IHighlightTextAreaProps {
  textAreaValue: string;
  modeValue: number;
  spellFilterTarget: string[];
  filterEssayTarget: string[];
  onChangeText: (value: string) => void;
  foldLayoutMode: number;
  layoutMode: number;
}

const HighlightTextAreaComp = ({
  textAreaValue,
  modeValue,
  spellFilterTarget,
  filterEssayTarget,
  onChangeText,
  foldLayoutMode,
  layoutMode,
}: IHighlightTextAreaProps) => {
  const textAreaRef = useRef<HTMLDivElement>(null);
  return (
    <MainBox
      widthSize={layoutMode === 0 ? (foldLayoutMode ? '75vw' : '50vw') : '80vw'}
      heightSize={
        layoutMode === 0 ? '70vh' : foldLayoutMode === 0 ? '40vh' : '63vh'
      }
      paddingSize={'1vw'}
      fontColor={'black'}
      fontSize={'3vmin'}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <HighlightTextAreaWrapper
        onClick={() => {
          textAreaRef.current?.focus();
        }}
      >
        <HighlightWithinTextarea
          ref={textAreaRef}
          value={textAreaValue}
          highlight={{
            highlight: modeValue ? spellFilterTarget : filterEssayTarget,
            className: modeValue ? 'red' : 'blue',
          }}
          onChange={onChangeText}
        ></HighlightWithinTextarea>
      </HighlightTextAreaWrapper>
    </MainBox>
  );
};

export default HighlightTextAreaComp;
