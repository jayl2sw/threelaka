package com.ssafy.laka.dto.guild;

import com.ssafy.laka.domain.Guild;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "NoticeResponseDto", description = "멤버 정보 제외한 길드 정보 조회")
public class NoticeResponseDto {
    private int guildId;
    private String guildName;
    private String notice;
//    private List<UserListResponseDto> members;

//    guild를 넣어서 GuildResponseDto를 만들어 내는 함수
    public static NoticeResponseDto from(Guild entity){
        return NoticeResponseDto.builder()
                .guildId(entity.getId())
                .guildName(entity.getGuildName())
                .notice(entity.getNotice())
//                .members(entity.getMembers().stream().map(u -> UserListResponseDto.from(u)).collect(Collectors.toList()))
                .build();







    }
}
