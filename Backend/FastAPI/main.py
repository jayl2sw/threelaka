from fastapi import FastAPI 
from youtube_transcript_api import YouTubeTranscriptApi
from fastapi.middleware.cors import CORSMiddleware
from nltk.stem import WordNetLemmatizer
import requests
import json
from properties import spell_checker_key

from preprocess import preprocess
from models import EssayChecker
import re
import nltk
nltk.download('wordnet')
nltk.download('omw-1.4')

lemmatizer = WordNetLemmatizer()


origins = ["*"]


app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/video/script/{video_id}") 
async def preprocess(video_id): 
    return preprocess(YouTubeTranscriptApi.get_transcript(video_id))


@app.post("/api/v1/study/writing/wordcheck") 
async def checkWords(essay_checker: EssayChecker): 
    essay = essay_checker.essay
    essay = essay.replace(',', ' ')
    lines = list(map(lambda x: x.strip(), re.split('[.?!\n]',essay)))
    words = list(map(lambda x: lemmatizer.lemmatize(x, 'v'), essay_checker.word_list))
    result = []
    
    for line in lines:
        line2 = line.replace(',', ' ,')
        line3 = list(map(lambda x: lemmatizer.lemmatize(x, 'v'), line2.split()))
        print(line3)
        for word in words:    
            if word in line3:
                result.append((word, line))
    
    return result
    
@app.post("/api/v1/study/writing/spellcheck") 
async def spellcheck(text):
    api_key = spell_checker_key
    endpoint = "https://api.bing.microsoft.com/v7.0/SpellCheck"
    data = {'text': text}
    params = {
        'mkt':'en-us',
        'mode':'proof'
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Ocp-Apim-Subscription-Key': api_key,
    }
    response = requests.post(endpoint, headers=headers, params=params, data=data)
    return response.json()
