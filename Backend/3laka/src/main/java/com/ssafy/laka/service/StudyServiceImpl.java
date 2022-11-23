package com.ssafy.laka.service;

import com.ssafy.laka.domain.*;
import com.ssafy.laka.domain.enums.Stage;
import com.ssafy.laka.dto.exception.dashboard.LearningRecordNotFoundException;
import com.ssafy.laka.dto.exception.dashboard.StudyNotFoundException;
import com.ssafy.laka.dto.exception.dashboard.TagNotFoundException;
import com.ssafy.laka.dto.exception.study.*;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
import com.ssafy.laka.dto.study.*;
import com.ssafy.laka.repository.*;
import com.ssafy.laka.util.SecurityUtil;
import lombok.RequiredArgsConstructor;


import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;



@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class StudyServiceImpl implements StudyService{

    private final UserRepository userRepository;
    private final VideoRepository videoRepository;
    private final LikeVideoRepository likeVideoRepository;
    private final StudyRepository studyRepository;
    private final LearningRecordRepository learningRecordRepository;
    private final EssayRepository essayRepository;
    private final WordbookRepository wordbookRepository;
    private final YoutubeService youtubeService;
    private final ScriptRepository scriptRepository;
    private final TagRepository tagRepository;
    private TooShortToSearchException tooShortToSearchException = new TooShortToSearchException();
    private WordAlreadyExistException wordAlreadyExistException = new WordAlreadyExistException();

    @Value("${naver.id}")
    private String clientId;//애플리케이션 클라이언트 아이디값";
    @Value("${naver.secret}")
    private String clientSecret;
    @Override
    public VideoResponseDto getVideo(String url) {
        String videoId = parseVideoId(url);
        log.debug("send GET Request with videoId: " + videoId);
        Optional<Video> video = videoRepository.findById(videoId);
        if (video.isPresent()) {
            return VideoResponseDto.from(video.get());
        } else {
            return sendGETRequest(videoId);
        }
    }

    private VideoResponseDto sendGETRequest(String videoId) {
        return VideoResponseDto.from(youtubeService.get(videoId));
    }

    private String parseVideoId(String url) throws VideoNotFoundException {
        if ( url.contains("watch")){
            String url2 = url.replace("https://www.youtube.com/watch?v=","");
            String[] splits = url2.split("&");
            return new ArrayList<String>(Arrays.asList(splits)).get(0);
        } else if (url.contains(".be/")) {
            String[] parts = url.split("be/");
            return parts[1];
        } else {
            return url;
        }
    }

    @Override
    public List<RecentLearningRecordResponseDto> getRecentVideo() {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        return learningRecordRepository.findTop5ByUserOrderByModifiedDateDesc(user)
                .stream().map(s -> RecentLearningRecordResponseDto.from(s)).collect(Collectors.toList());
    }

    @Override
    public void addWish(String video_id) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Video video = videoRepository.findById(video_id).orElseThrow(VideoNotFoundException::new);
        try {
            LikeVideo lv = LikeVideo.builder().user(user).video(video).build();
            likeVideoRepository.save(lv);
        } catch (Exception e) {
            log.debug("failed to add wishlist:" + e);
            throw e;
        }

    }

    @Override
    public void deleteWish(int like_video_id) {
        LikeVideo lv = likeVideoRepository.findById(like_video_id).orElseThrow(NotLikedVideoException::new);
        likeVideoRepository.delete(lv);
    }

    @Override
    public List<VideoResponseDto> getVideosByKeyword(String keyword) {
        if (keyword.length() <= 2) {
            throw tooShortToSearchException;
        }
        return videoRepository.findByTitleContaining(keyword).stream().map(
                v -> VideoResponseDto.from(v)).collect(Collectors.toList());
    }

    @Override
    public void addWord(WordRequestDto data) throws JSONException {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        LearningRecord lr = learningRecordRepository.findById(data.getLrId()).orElseThrow(LearningRecordNotFoundException::new);
        Optional<Wordbook> wb = wordbookRepository.findByLearningRecordAndWord(lr, data.getWord());
        String exampleKor = translate(data.getExample());
        if (wb.isPresent()) {
            throw wordAlreadyExistException;
        } else {
            Wordbook wordbook = Wordbook.builder()
                    .user(user)
                    .learningRecord(lr)
                    .word(data.getWord())
                    .example(data.getExample())
                    .exampleKor(exampleKor)
                    .build();

            wordbookRepository.save(wordbook);
        }
    }


    @Override
    public void deleteWord(int wordbook_id) {
        try {
            Wordbook wordbook = wordbookRepository.findById(wordbook_id).orElseThrow(NotInWordbookException::new);
            wordbookRepository.delete(wordbook);
        } catch (Exception e) {
            log.debug("failed to delete workbook: " + e);
            throw e;
        }
    }

    @Override
    public void deleteWordByWordAndSentence(String word, String sentence) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        try {
            Wordbook wordbook = wordbookRepository.findWordbookByWordAndExample(word, sentence).orElseThrow(NotInWordbookException::new);
            if (user != wordbook.getUser()) {
                throw new NotCurrentUserException();
            }
            wordbookRepository.delete(wordbook);
        } catch (Exception e) {
            log.debug("failed to delete workbook: " + e);
            throw e;
        }
    }


    @Override
    public List<WordbookResponseDto> getWordbooksById(int lrId) {
        LearningRecord lr = learningRecordRepository.findById(lrId).orElseThrow(LearningRecordNotFoundException::new);
        return wordbookRepository.findWordbooksByLearningRecord(lr).stream()
                .map(w -> WordbookResponseDto.from(w)).collect(Collectors.toList());

    }

    @Override
    public List<WordbookResponseDto> getWordbooksByUser() {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        return wordbookRepository.findWordbooksByUserAndIsMemorized(user, false).stream()
                .map(w -> WordbookResponseDto.from(w)).collect(Collectors.toList());

    }


    @Override
    public LearningRecordResponseDto updateCompletedStage(UpdateStageRequestDto data) {
        LearningRecord lr = learningRecordRepository.findById(data.getLearningRecordId()).orElseThrow(LearningRecordNotExistException::new);
        if (SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new).equals(lr.getUser())) {
            lr.setStage(data.getStage());
            return LearningRecordResponseDto.from(lr);
        } else {
            throw new NotCurrentUserException();
        }
    }

    @Override
    public void addLearningTime(UpdateLearningRequestDto data) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        String today = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDate.now()).toString();
        Optional<Study> learning = studyRepository.findByUserAndDate(user, today);
        if (learning.isPresent()) {
            learning.get().addTime(data.getTime());
        } else {
            Study study = new Study(user, data.getTime());
            studyRepository.save(study);
            user.addContinuousLearningDate();
        }
    }

    @Override
    public void memorizeWord(int wordbook_id) {
        Wordbook wordbook = wordbookRepository.findById(wordbook_id).orElseThrow(NotInWordbookException::new);
        wordbook.setMemorized();
    }

    @Override
    public void checkContinuousLearningDate(String token) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        String today = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDate.now()).toString();
        String yesterday = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDate.now().minusDays(1)).toString();
        if (!studyRepository.findByUserAndDate(user, yesterday).isPresent() && !studyRepository.findByUserAndDate(user, today).isPresent()) {
            user.resetContinuousLearningDate();
        }
    }

    @Override
    public LearningRecordResponseDto startLearning(String videoId) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Video video = videoRepository.findById(videoId).orElseThrow(VideoNotFoundException::new);
        LearningRecord lr = LearningRecord.builder()
                .user(user)
                .video(video)
                .stage(Stage.READING)
                .build();
        learningRecordRepository.save(lr);
        return LearningRecordResponseDto.from(lr);

    }

    @Override
    public List<LearningRecordResponseDto> getLearningRecordsByVideo(String videoId) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        Video video = videoRepository.findById(videoId).orElseThrow(VideoNotFoundException::new);
        List<LearningRecord> lrs = learningRecordRepository.findByUserAndVideoOrderByModifiedDateDesc(user, video);
        if (lrs.isEmpty()) {
            return null;
        } else {
            return lrs.stream().map(l -> LearningRecordResponseDto.from(l)).collect(Collectors.toList());
        }
    }

    @Override
    public LearningRecordResponseDto findLearningRecordById(int lrId) {
        return LearningRecordResponseDto.from(learningRecordRepository.findById(lrId).orElseThrow(LearningRecordNotFoundException::new));
    }

    @Override
    public String getScript(String videoId) {
        return scriptRepository.findScriptByVideoId(videoId).orElseThrow(ScriptNotFoundException::new).getScripts();
    }

    @Override
    public List<VideoResponseDto> getRecommends() throws IOException {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        int type = learningRecordRepository.findAllByUser(user).size() > 10 ? 1 : 0;
        String recommends = getRecommendsFromFastAPI(user.getUserId(), type);
        List<String> collects = Arrays.stream(recommends.replace("[", "").replace("]", "").replaceAll("\"", "").split(",")).collect(Collectors.toList());
        List<VideoResponseDto> result = videoRepository.findUserRecommendsByVideoIdIn(collects).stream().map(v -> VideoResponseDto.from(v)).collect(Collectors.toList());
        Collections.shuffle(result);
        return result;
    }


    private String getRecommendsFromFastAPI(int userId, int type) throws IOException {
        URL url;
        String readLine;
        StringBuilder buffer = null;
        BufferedReader bufferedReader = null;
        BufferedWriter bufferedWriter = null;
        HttpURLConnection urlConnection = null;

        int connTimeout = 5000;
        int readTimeout = 3000;

        String URL = "https://3laka.com/api/v2/study/videos/recommends/"+userId+"/"+type;

        try {
            url = new URL(URL);
            urlConnection = (HttpURLConnection)url.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.setConnectTimeout(connTimeout);
            urlConnection.setReadTimeout(readTimeout);
            urlConnection.setRequestProperty("Accept", "application/json;");

            buffer = new StringBuilder();
            if(urlConnection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(),"UTF-8"));
                while((readLine = bufferedReader.readLine()) != null) {
                    buffer.append(readLine).append("\n");
                }
            }
            else {
                buffer.append("code : ");
                buffer.append(urlConnection.getResponseCode()).append("\n");
                buffer.append("message : ");
                buffer.append(urlConnection.getResponseMessage()).append("\n");
            }
        }
        catch(Exception ex) {
            ex.printStackTrace();
        }
        finally {
            try {
                if (bufferedWriter != null) { bufferedWriter.close(); }
                if (bufferedReader != null) { bufferedReader.close(); }
            }
            catch(Exception ex) {
                ex.printStackTrace();
            }
        }


        return buffer.toString();
    }

    @Override
    public void addEssay(EssayRequestDto essay) {
        LearningRecord lr = learningRecordRepository.findById(essay.getLearningRecordId()).orElseThrow(LearningRecordNotFoundException::new);
        lr.setEssay(essay.getContent());
    }

    @Override
    public EssayResponseDto findEssay(int learningRecordId) {
        LearningRecord lr = learningRecordRepository.findById(learningRecordId).orElseThrow(LearningRecordNotFoundException::new);
        return EssayResponseDto.from(lr);

    }

    @Override
    public void setSurvey(SurveyRequestDto data) {
        LearningRecord lr = learningRecordRepository.findById(data.getLearningRecordId()).orElseThrow(LearningRecordNotFoundException::new);
        lr.setSurvey(data.getSurvey());
    }

    @Override
    public VideoDescriptionResponseDto findVideoDescription(String videoId) {
        return VideoDescriptionResponseDto.from(videoRepository.findById(videoId).orElseThrow(VideoNotFoundException::new));
    }

    @Override
    public List<EssayResponseDto> getEssays() {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        return learningRecordRepository.findAllByUser(user).stream().map(l -> EssayResponseDto.from(l)).collect(Collectors.toList());
    }

    @Override
    public HashMap<String, RecommendsListResponseDto> getRecommendsList() {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        List<UserTag> userTags = user.getUserTags();
        HashMap<String, RecommendsListResponseDto> res = new HashMap<>();
        for (UserTag userTag: userTags) {
            List<Video> top4ByTagName = videoRepository.findTop4ByTagName(userTag.getTag().getName());
            res.put(userTag.getTag().getName(), RecommendsListResponseDto.from(top4ByTagName));
        }
        return res;
    }

    @Override
    public List<VideoResponseDto> getVideosByTags(int tagId, int page) {
        String tagName = tagRepository.findById(tagId).orElseThrow(TagNotFoundException::new).getName();
        return videoRepository.findAllByTagName(tagName, page*20).stream().map(v -> VideoResponseDto.from(v)).collect(Collectors.toList());
    }

    @Override
    public LearningResultResponseDto getLearningResult(int lr_id) {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        String today = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDate.now()).toString();
        LearningRecord learningRecord = learningRecordRepository.findById(lr_id).orElseThrow(LearningRecordNotFoundException::new);
        int time = studyRepository.findByUserAndDate(user, today).orElseThrow(StudyNotFoundException::new).getTime();
        int wordbooks = wordbookRepository.findWordbooksByLearningRecord(learningRecord).size();
        return LearningResultResponseDto.from(learningRecord, wordbooks, time);


    }

    public String translate(String eng) throws JSONException {

        String apiURL = "https://openapi.naver.com/v1/papago/n2mt";
        String text;
        try {
            text = URLEncoder.encode(eng, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("인코딩 실패", e);
        }

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);

        String responseBody = post(apiURL, requestHeaders, text);
        String translatedText = getTranslatedText(responseBody);

        System.out.println(translatedText);
        return translatedText;

    }
    private String post(String apiUrl, Map<String, String> requestHeaders, String text){
        HttpURLConnection con = connect(apiUrl);
        String postParams = "source=en&target=ko&text=" + text; //원본언어: 한국어 (ko) -> 목적언어: 영어 (en)
        try {
            con.setRequestMethod("POST");
            for(Map.Entry<String, String> header :requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            con.setDoOutput(true);
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.write(postParams.getBytes());
                wr.flush();
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
                return readBody(con.getInputStream());
            } else {  // 에러 응답
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private HttpURLConnection connect(String apiUrl){
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection)url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }
    private String readBody(InputStream body){
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }
    private String getTranslatedText(String string) throws JSONException {
        System.out.println(string);
        try {
            JSONObject json = new JSONObject(string);
            JSONObject message = (JSONObject) json.get("message");
            JSONObject result = (JSONObject) message.get("result");
            String translatedText = (String) result.get("translatedText");
            return translatedText;
        } catch (Exception e){
            System.out.println("error: "+ e);
            System.out.println(string);
            return "";
        }
    }

    public void apiTestGet() throws Exception
    {
        URL url = null;
        String readLine = null;
        StringBuilder buffer = null;
        BufferedReader bufferedReader = null;
        BufferedWriter bufferedWriter = null;
        HttpURLConnection urlConnection = null;

        int connTimeout = 5000;
        int readTimeout = 3000;

        String apiUrl = "http://localhost:8080/api/test";    // 각자 상황에 맞는 IP & url 사용

        try {
            url = new URL(apiUrl);
            urlConnection = (HttpURLConnection)url.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.setConnectTimeout(connTimeout);
            urlConnection.setReadTimeout(readTimeout);
            urlConnection.setRequestProperty("Accept", "application/json;");

            buffer = new StringBuilder();
            if(urlConnection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(),"UTF-8"));
                while((readLine = bufferedReader.readLine()) != null) {
                    buffer.append(readLine).append("\n");
                }
            }
            else {
                buffer.append("code : ");
                buffer.append(urlConnection.getResponseCode()).append("\n");
                buffer.append("message : ");
                buffer.append(urlConnection.getResponseMessage()).append("\n");
            }
        }
        catch(Exception ex) {
            ex.printStackTrace();
        }
        finally {
            try {
                if (bufferedWriter != null) { bufferedWriter.close(); }
                if (bufferedReader != null) { bufferedReader.close(); }
            }
            catch(Exception ex) {
                ex.printStackTrace();
            }
        }


        System.out.println("결과 : " + buffer.toString());
    }

}

