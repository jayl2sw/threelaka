package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Comment;
import com.ssafy.laka.domain.Dictionary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DictionaryRepository extends JpaRepository<Dictionary, Integer> {

}
