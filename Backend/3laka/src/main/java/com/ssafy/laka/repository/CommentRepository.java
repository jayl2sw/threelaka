package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Comment;
import com.ssafy.laka.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
