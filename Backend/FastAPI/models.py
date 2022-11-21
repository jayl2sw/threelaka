from pydantic import BaseModel

class EssayChecker(BaseModel):
    word_list: list
    essay: str