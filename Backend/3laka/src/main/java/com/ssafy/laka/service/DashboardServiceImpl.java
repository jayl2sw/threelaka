package com.ssafy.laka.service;

import com.ssafy.laka.domain.LearningRecord;
import com.ssafy.laka.domain.User;
import com.ssafy.laka.domain.enums.Stage;
import com.ssafy.laka.dto.dashboard.PlayingVideoDto;
import com.ssafy.laka.dto.dashboard.TodayWordDto;
import com.ssafy.laka.dto.exception.dashboard.LearningRecordNotFoundException;
import com.ssafy.laka.dto.exception.study.VideoNotFoundException;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
import com.ssafy.laka.repository.LearningRecordRepository;
import com.ssafy.laka.repository.UserRepository;
import com.ssafy.laka.repository.VideoRepository;
import com.ssafy.laka.repository.WordbookRepository;
import com.ssafy.laka.util.SecurityUtil;
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
}
