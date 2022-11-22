package com.ssafy.laka.dto.tag;

import com.ssafy.laka.domain.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TagResponseDto {
    private int tagId;
    private String tagName;

    public static TagResponseDto from(Tag entity){
        return TagResponseDto.builder().tagId(entity.getTagId())
                .tagName(entity.getName()).build();
    }


}
