package com.ssafy.laka.dto.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    USER_NOT_FOUND(404, "U001", "회원 정보를 찾을 수 없습니다."),
    DUPLICATE_EMAIL(400, "U002", "이미 존재하는 이메일입니다."),
    DUPLICATE_NICKNAME(400, "U003", "이미 존재하는 닉네임입니다."),
    DUPLICATE_USERNAME(400, "U004", "이미 존재하는 이름입니다."),
    INVALID_PARAMETER(400, "U005", "잘못된 요청입니다."),

    LEARNING_RECORD_NOT_EXIST(400, "D001", "존재하지 않는 학습 기록입니다."),
    WORDBOOK_NOT_FOUND(400, "D002", "해당 유저 해당 강의의 단어장을 찾을 수 없습니다."),

    VIDEO_NOT_FOUND(404, "S001", "비디오 정보를 찾을 수 없습니다."),
    NOT_LIKED_VIDEO(400, "S002", "존재하지 않는 위시리스트 항목입니다."),
    NOT_IN_DICTIONARY(400, "S003", "사전에 존재하지 않는 항목입니다."),
    NOT_IN_WORDBOOK(400, "S004", "단어장에 존재하지 않는 항목입니다."),
    TAG_NOT_EXIST(400, "D002", "존재하지 않는 태그입니다"),
    GUILD_NOT_FOUND(400, "G001", "해당 길드를 찾을 수 없습니다"),
    REQUEST_NOT_FOUND(400, "G002", "해당 요청을 찾을 수 없습니다."),
    SAME_REQUEST_EXISTS(400, "G003", "해당 요청이 이미 존재합니다."),
    NOT_GUILD_MASTER(400 , "G004", "해당 길드의 마스터가 아닙니다."),
    LEFT_MEMBER_EXISTS(400 , "G005", "길드에 아직 멤버가 남아 있습니다."), 
    ALREADY_IN_GUILD(400,"G006" , "이미 소속된 길드가 있습니다." ),
    REQUEST_LIST_EMPTY(400, "G007", "새로운 가입 요청이 없습니다" ),

    NOT_IN_GUILD(400, "G008", "가입한 길드가 없습니다"),

    NOT_MY_GUILD(400, "G009", "해당 길드에 가입되어있지 않습니다");


    private final int status;
    private final String code;
    private final String message;


}

