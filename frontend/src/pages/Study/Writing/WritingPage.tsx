import { WritingPageBlock } from '../../../styles/Writing/WritingStyle';
import { useParams } from 'react-router-dom';
import { StudyPageParams } from '../../../models';
import WordListAndWritingContainerComp from './components/WordListAndWritingContainer';

const WritingPage = ({}) => {
  const pageParams: StudyPageParams = useParams() as any;
  return (
    <WritingPageBlock>
      <WordListAndWritingContainerComp pageParams={pageParams} />
    </WritingPageBlock>
  );
};

export default WritingPage;
