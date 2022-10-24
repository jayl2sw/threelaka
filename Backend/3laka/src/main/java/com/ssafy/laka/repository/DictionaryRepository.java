package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Comment;
import com.ssafy.laka.domain.Dictionary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DictionaryRepository extends JpaRepository<Dictionary, Integer> {

    Optional<Dictionary> findByWord(String word);
}
