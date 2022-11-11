import { MainBox } from '../../../../styles/Common/CommonDivStyle';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';
import {
  WordListAndWritingContainer,
  HighlightTextAreaWrapper,
} from '../../../../styles/Writing/WritingStyle';

// 필요한 props interface
interface IHighlightTextAreaProps {
  textAreaValue: string;
  modeValue: number;
  spellFilterTarget: string[];
  filterEssayTarget: string[];
  onChangeText: (value: string) => void;
}

const HighlightTextAreaComp = ({
  textAreaValue,
  modeValue,
  spellFilterTarget,
  filterEssayTarget,
  onChangeText,
}: IHighlightTextAreaProps) => {
  return (
    <MainBox
      widthSize={'50vw'}
      heightSize={'70vh'}
      paddingSize={'1vw'}
      fontColor={'black'}
      fontSize={'3vmin'}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <HighlightTextAreaWrapper>
        <HighlightWithinTextarea
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
