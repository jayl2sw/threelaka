from fastapi import FastAPI, File
from youtube_transcript_api import YouTubeTranscriptApi
from fastapi.middleware.cors import CORSMiddleware
from nltk.stem import WordNetLemmatizer
import requests

from properties import spell_checker_key, oxford_appId, oxford_key, speechace_url, naver_id, naver_secret
from preprocess import process
import pandas as pd
from models import EssayChecker, NaverRequest
import re
import nltk

nltk.download('wordnet')
nltk.download('omw-1.4')

lemmatizer = WordNetLemmatizer()


origins = ["*"]


app = FastAPI() 
app.router.redirect_slashes=False

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/api/v2/video/script/{video_id}") 
async def getScript(video_id): 
    return process(YouTubeTranscriptApi.get_transcript(video_id))

@app.get("/api/v2/video/script/ko/{video_id}") 
async def getKorScript(video_id):
    try:
        return process(YouTubeTranscriptApi.get_transcript(video_id,  languages=('ko',)))
    except:
        return None


@app.post("/api/v2/study/writing/wordcheck") 
async def checkWords(essay_checker: EssayChecker): 
    essay = essay_checker.essay
    essay = essay.replace(',', ' ')
    lines = list(map(lambda x: x.strip(), re.split('[.?!\n]',essay)))
    words = list(map(lambda x: (x, (lemmatizer.lemmatize(x, 'v'))), essay_checker.word_list))
    result = []
    
    for line in lines:
        line2 = line.replace(',', ' ,')
        line3 = list(line2.split())
        line4 = list(map(lambda x: (lemmatizer.lemmatize(x, 'v')), line3))
        
        for word, lemmatized in words:    
            for i in range(len(line3)):
                if lemmatized == line4[i]:
                    result.append({ "dict_word": word, "essay_word": line3[i], "sentence" :line})
    return result
    
@app.post("/api/v2/study/writing/spellcheck") 
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

@app.post("/api/v2/study/dictionary") 
async def oxford(word):
    headers = {
        "app_id": oxford_appId,
        "app_key": oxford_key
    }
    language = "en-us"
    url = "https://od-api.oxforddictionaries.com:443/api/v2/entries/" + language + "/" + word.lower()
    response = requests.get(url, headers=headers).json()

    results = response["results"]
    data = []
    for result in results:
        lexicalEntries = result["lexicalEntries"]
        for lexicalEntry in lexicalEntries:
            entries = lexicalEntry['entries']
            lexicalCategory = lexicalEntry['lexicalCategory']['text']
            for entry in entries:
                senses = entry['senses']
                for sense in senses:
                    try:
                        wordDefinition = sense['definitions'][0]
                        wordExample = ''
                        try:
                            wordExample = sense['examples'][0]['text']
                        except:
                            wordExample = 'example does not exist'
                        
                        data.append({
                            "wordDefinition": wordDefinition,
                            "wordExample": wordExample,
                            "lexicalCategory": lexicalCategory
                        })
                    except:
                        continue
        
    response = {
        "wordId": word,
        "results":data,
    }

    return response
    

@app.post("/api/v2/study/speechace")
async def speechace(text, file: bytes = File()):


    
    data= {
        "text": text,
        "question_info": 'u1/q1',
        "no_mc": 1
    }
    files = {
        "user_audio_file" : file
    }
    session = requests.Session()
    r = session.post(speechace_url, data=data, files=files).json()
    
    try:
        text = r["text_score"]["text"]
        total_score = r["text_score"]["quality_score"]
        scores = []

        for word_score in r["text_score"]["word_score_list"]:
            tmp = {
                "word" :word_score["word"],
                "score" :word_score["quality_score"]
            }
            scores.append(tmp)

        response = {
            "text": text,
            "total_score": total_score,
            "scores": scores
        }

        return response
    
    except:
        return r
    
@app.post("/api/v2/study/papago") 
async def papago(naver_request: NaverRequest):

    url = "https://openapi.naver.com/v1/papago/n2mt"
    headers = {
        "X-Naver-Client-Id": naver_id,
        "X-Naver-Client-Secret": naver_secret
    }
    
    response = dict()
    for k, v in naver_request:
        data = {
            "source": "en",
            "target": "ko",
            "text": v
        }

        res = requests.post(url, headers=headers, data=data)
        response[k] = res.json()["message"]["result"]["translatedText"]
        
    return response


import os

path = os.getcwd()
user_based_df = pd.read_csv(os.path.join(path, "user_based_recommendations.csv"))
talk_based_df = pd.read_csv(os.path.join(path,"talk_based_recommendations.csv"))

@app.get("/api/v2/study/videos/recommends/{user_id}/{type}")
async def recommends(user_id, type):
    if type:
        res = user_based_df.iloc[int(user_id)].to_list()[1:]
    else:
        res = talk_based_df.iloc[int(user_id)].to_list()[1:]
    return res
