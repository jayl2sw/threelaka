package com.ssafy.laka.service;

import com.ssafy.laka.domain.Tag;
import com.ssafy.laka.dto.tag.TagResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TagService {

    List<TagResponseDto> getTagList();

}
