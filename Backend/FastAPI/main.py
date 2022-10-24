from fastapi import FastAPI 
from youtube_transcript_api import YouTubeTranscriptApi

app = FastAPI() 

@app.post("/api/v1/video/script/{video_id}") 
async def root(video_id): 
    return YouTubeTranscriptApi.get_transcript(video_id)


    