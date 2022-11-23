package com.ssafy.laka.dto.guild;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class GuildCreateDto {
    @NotBlank
    @Size(max = 6, message = "길드명은 6자 이하여야 합니다")
    private String name;
    @NotBlank
    private String description;

    public GuildCreateDto(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
