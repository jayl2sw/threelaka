package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Script;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ScriptRepository extends MongoRepository<Script, String> {

    Optional<Script> findScriptByVideoId(String key);
}
