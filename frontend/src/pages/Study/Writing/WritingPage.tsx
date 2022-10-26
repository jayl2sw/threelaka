import {
  WritingPageBlock,
  WordListAndWritingContainer,
  WordListRegion,
  WritingRegion,
  BtnsRegion,
  SaveBtn,
  WritingTextArea,
  ContentBox,
  ContentBoxTag
} from '../../../styles/Writing/WritingStyle';

const WritingPage = () => {
  return (
    <WritingPageBlock>
      <WordListAndWritingContainer>
        <WordListRegion>
          <ContentBox bgColor="white" widthSize="15vw" heightSize='35vh'>
            <ContentBoxTag topShift='-4vh' leftShift='0vw' bgColor="white" fontColor='#005e76'>단어장</ContentBoxTag>
          </ContentBox>
          <ContentBox bgColor="#005e76" widthSize="15vw" heightSize='25vh'>
            <ContentBoxTag topShift='-4vh' leftShift='0vw' bgColor="#005e76" fontColor='white'>사전</ContentBoxTag>  
          </ContentBox>          
        </WordListRegion>
        <WritingRegion>
          <WritingTextArea></WritingTextArea>
        </WritingRegion>
      </WordListAndWritingContainer>
      <BtnsRegion>
        <SaveBtn>파일로 저장</SaveBtn>
        <SaveBtn>저장</SaveBtn>
      </BtnsRegion>
    </WritingPageBlock>
  );
};

export default WritingPage;