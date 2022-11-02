package com.ssafy.laka.service;

import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Video;
import com.ssafy.laka.domain.Script;
import com.ssafy.laka.domain.ScriptKor;
import com.ssafy.laka.repository.ScriptKorRepository;
import com.ssafy.laka.repository.ScriptRepository;
import com.ssafy.laka.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class YoutubeServiceImpl implements YoutubeService {

    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();
    private static final long NUMBER_OF_VIDEOS_RETURNED = 1;
    private static YouTube youtube;


    @Value("${youtube.apiKey}")
    private String apiKey;

//    @Value("${fastApi.url}")
    private String urlString = "http://3laka.com:8081/api/v2/video/script/";
    private final VideoRepository videoRepository;
    private final ScriptRepository scriptRepository;
    private final ScriptKorRepository scriptKorRepository;
    @Override
    public com.ssafy.laka.domain.Video get(String videoId) {
        try {
            youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, new HttpRequestInitializer() {
                public void initialize(HttpRequest request) throws IOException {
                }
            }).setApplicationName("youtube-video-duration-get").build();

            //내가 원하는 정보 지정할 수 있어요. 공식 API문서를 참고해주세요.
            YouTube.Videos.List videos = youtube.videos().list("id, snippet, contentDetails");
            videos.setKey(apiKey);
            videos.setId(videoId);
            videos.setMaxResults(NUMBER_OF_VIDEOS_RETURNED); //조회 최대 갯수.
            List<Video> videoList = videos.execute().getItems();

            if (videoList != null) {
                Video video = videoList.get(0);
                com.ssafy.laka.domain.Video v = com.ssafy.laka.domain.Video.from(video);

                log.info("try to get script for video with videoId: " + video.getId());
                Script script = Script.builder()
                        .videoId(v.getVideoId())
                        .scripts(getScript("en", video.getId()))
                        .build();
                String kor = getScript("ko", video.getId());
                if (kor!=null) {
                    ScriptKor scriptKor = ScriptKor.builder()
                            .videoId(v.getVideoId())
                            .korScript(kor)
                            .build();
                    v.setKorScript();
                    scriptKorRepository.save(scriptKor);
                }
                videoRepository.save(v);
                scriptRepository.save(script);
                log.info(" to get script for video with videoId: " + video.getId());
                return v;
            }
        } catch (GoogleJsonResponseException e) {
            System.err.println("There was a service error: " + e.getDetails().getCode() + " : "
                    + e.getDetails().getMessage());
        } catch (IOException e) {
            System.err.println("There was an IO error: " + e.getCause() + " : " + e.getMessage());
        } catch (Throwable t) {
            t.printStackTrace();
        }

        return null;
    }

    private String getScript(String language, String id) throws IOException {
        if (language == "en"){
            urlString = "http://3laka.com:8081/api/v2/video/script/" + id;
        } else {
            urlString = "http://3laka.com:8081/api/v2/video/script/ko/" + id;
        }
        System.out.println(urlString);
        URL url = new URL(urlString);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setDoOutput(true);
        con.setDoInput(true);
        con.setRequestMethod("GET");
        con.setRequestProperty("Content-Type", "application/json");

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(con.getInputStream()));
        StringBuffer stringBuffer = new StringBuffer();
        String inputLine;

        while ((inputLine = bufferedReader.readLine()) != null)  {
            stringBuffer.append(inputLine);
        }

        bufferedReader.close();

        String response = stringBuffer.toString();

        return response;
    }
}
