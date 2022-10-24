from fastapi import FastAPI 
from youtube_transcript_api import YouTubeTranscriptApi
from fastapi.middleware.cors import CORSMiddleware

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
async def root(video_id): 
    return YouTubeTranscriptApi.get_transcript(video_id)


    