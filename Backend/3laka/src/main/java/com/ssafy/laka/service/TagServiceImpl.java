package com.ssafy.laka.service;

import com.ssafy.laka.domain.Tag;
import com.ssafy.laka.domain.User;
import com.ssafy.laka.dto.exception.user.UserNotFoundException;
import com.ssafy.laka.dto.tag.TagResponseDto;
import com.ssafy.laka.repository.TagRepository;
import com.ssafy.laka.repository.UserRepository;
import com.ssafy.laka.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TagServiceImpl implements TagService{
    private final TagRepository tagRepository;
    private final UserRepository userRepository;

    @Override
    public List<TagResponseDto> getTagList(){
        User me = SecurityUtil.getCurrentUsername().flatMap(userRepository::findByUsername).orElseThrow(UserNotFoundException::new);
        List<TagResponseDto> tagList = tagRepository.findAll().stream().map(s -> TagResponseDto.from(s)).collect(Collectors.toList());
        return tagList;


    }
}
