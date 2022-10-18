package com.ssafy.laka.service;

import com.ssafy.laka.domain.LearningRecord;
import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.Wordbook;
import com.ssafy.laka.domain.enums.Stage;
import com.ssafy.laka.dto.dashboard.HistoryNumDto;
import com.ssafy.laka.dto.dashboard.PlayingVideoDto;
import com.ssafy.laka.dto.dashboard.TodayWordDto;
import com.ssafy.laka.dto.exception.dashboard.LearningRecordNotFoundException;
import com.ssafy.laka.dto.exception.dashboard.VideoNotFoundException;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
import com.ssafy.laka.repository.*;
import com.ssafy.laka.util.SecurityUtil;
import jdk.internal.org.jline.reader.History;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class DashboardServiceImpl implements DashboardService{

    private final UserRepository userRepository;
    private final LearningRecordRepository learningRecordRepository;
    private final WordbookRepository wordbookRepository;
    private final VideoRepository videoRepository;
    private final EssayRepository essayRepository;

    private User getUser() {
        return SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername)
                .orElseThrow(UserNotFoundException::new);
    }
    @Override
    public List<TodayWordDto> getRandomWords() {
        User user = getUser();
        LearningRecord learningRecord = learningRecordRepository.findTop1ByUserOrderByModifiedDateDesc(user)
                .orElseThrow(LearningRecordNotFoundException::new);
        List<TodayWordDto> wordbook = wordbookRepository.findRandom5ByUserAndVideo(user.getUserId(), learningRecord.getVideo().getVideoId())
                .stream().map(s -> TodayWordDto.of(s)).collect(Collectors.toList());
        return wordbook;
    }

    @Override
    public PlayingVideoDto getPlayingList() {
        User user = getUser();
        LearningRecord learningRecord = learningRecordRepository.findTop1ByUserAndStageLessThanOrderByModifiedDateDesc(user, Stage.COMPLETE)
                .orElseThrow(LearningRecordNotFoundException::new);
        return PlayingVideoDto.of(videoRepository.findById(learningRecord.getVideo().getVideoId())
                .orElseThrow(VideoNotFoundException::new));
    }

    @Override
    public HistoryNumDto getHistory() {
        User user = getUser();
        int videos = learningRecordRepository.countByUserAndStage(user, Stage.COMPLETE);
        int essays = essayRepository.countByUser(user);
        int words = wordbookRepository.countByUser(user);
        HistoryNumDto historyNumDto = new HistoryNumDto(videos, essays, words);
        return historyNumDto;
    }
}
