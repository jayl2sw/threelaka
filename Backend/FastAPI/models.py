from pydantic import BaseModel

class EssayChecker(BaseModel):
    word_list: list
    essay: str
    
    
class NaverRequest(BaseModel):
    text: str
    example: str