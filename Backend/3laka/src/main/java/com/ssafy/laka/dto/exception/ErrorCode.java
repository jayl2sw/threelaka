package com.ssafy.laka.dto.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    USER_NOT_FOUND(404, "U001", "회원 정보를 찾을 수 없습니다."),
    DUPLICATE_EMAIL(400, "U002", "이미 존재하는 이메일입니다."),
    DUPLICATE_NICKNAME(400, "U003", "이미 존재하는 닉네임입니다."),
    DUPLICATE_USERNAME(400, "U004", "이미 존재하는 계정입니다."),
    INVALID_PARAMETER(400, "U005", "잘못된 요청입니다."),
    TOO_MANY_FRIENDS(400, "U006", "더 이상 친구를 추가할 수 없습니다."),
    DUPLICATE_FRIEND(400, "U007", "이미 친구입니다."),

    DUPLICATE_PROPOSE(400, "U008", "이미 전송된 요청입니다."),
    EXCEEDED_MONEY(400, "U008", "알맞은 금액이 아닙니다."),
    MONSTER_NOT_FOUND(404, "G001", "몬스터 정보를 찾을 수 없습니다."),
    PLANT_NOT_FOUND(404, "P001", "식물 정보를 찾을 수 없습니다,"),
    ITEM_NOT_FOUND(404, "G001", "판매 아이템 정보를 찾을 수 없습니다,"),
    CASH_BELOW_ZERO(400, "G002", "캐시가 부족합니다."),
    SKILL_NOT_FOUND(404, "G003", "해당 스킬을 찾을 수 없습니다.");


    private final int status;
    private final String code;
    private final String message;


}
