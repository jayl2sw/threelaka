package com.ssafy.laka.repository;

import com.ssafy.laka.domain.ScriptKor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ScriptKorRepository extends MongoRepository<ScriptKor, String> {

    Optional<ScriptKor> findScriptKorByVideoId(String key);
}
