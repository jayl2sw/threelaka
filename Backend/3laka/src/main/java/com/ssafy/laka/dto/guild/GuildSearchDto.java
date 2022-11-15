package com.ssafy.laka.dto.guild;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GuildSearchDto {

    private String keyword;
    private Integer yoil;
    private Integer startTime;
    private Integer time;

}
