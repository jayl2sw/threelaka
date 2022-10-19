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
<<<<<<< HEAD
    VIDEO_NOT_FOUND(404, "S001", "비디오 정보를 찾을 수 없습니다."),
    NOT_LIKED_VIDEO(400, "S002", "존재하지 않는 위시리스트 항목입니다."),
    NOT_IN_DICTIONARY(400, "S003", "사전에 존재하지 않는 항목입니다."),
    NOT_IN_WORDBOOK(400, "S004", "단어장에 존재하지 않는 항목입니다."),
    LEARNING_RECORD_NOT_EXIST(400, "S006", "존재하지 않는 학습 기록입니다.");
=======
    DUPLICATE_FRIEND(400, "U007", "이미 친구입니다."),

    DUPLICATE_PROPOSE(400, "U008", "이미 전송된 요청입니다."),
    LEARNING_RECORD_NOT_FOUND(400, "D001", "해당 유저의 최신 학습 기록을 찾을 수 없습니다."),
    WORDBOOK_NOT_FOUND(400, "D002", "해당 유저 해당 강의의 단어장을 찾을 수 없습니다."),
    VIDEO_NOT_FOUND(400, "D003", "해당 비디오를 찾을 수 없습니다.");


>>>>>>> acee5aea8e285c7a40bae1f38f1d3b59f601f11f
    private final int status;
    private final String code;
    private final String message;


}

