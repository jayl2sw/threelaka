import { WritingPageBlock } from '../../../styles/Writing/WritingStyle';
import { useParams } from 'react-router-dom';
import { StudyPageParams } from '../../../models';
import WordListAndWritingContainerComp from './components/WordListAndWritingContainer';
import { useRef, useEffect } from 'react';
import { useAppDispatch } from '../../../utils/hooks';
import { studyActions } from '../../../features/study/study-slice';

const WritingPage = ({}) => {
  const pageParams: StudyPageParams = useParams() as any;
  const studyDuration = useRef<number>(0);
  const dispatch = useAppDispatch();

  //get current time and video status in real time
  useEffect(() => {
    const interval = setInterval(async () => {
      studyDuration.current = studyDuration.current + 1;
    }, 1000);

    return () => {
      clearInterval(interval);
      dispatch(studyActions.putStopStudyStart(studyDuration.current));
    };
  }, []);

  return (
    <WritingPageBlock>
      <WordListAndWritingContainerComp pageParams={pageParams} />
    </WritingPageBlock>
  );
};

export default WritingPage;
