package com.ssafy.laka.repository;

import com.ssafy.laka.domain.Video;
import com.ssafy.laka.dto.study.VideoResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface VideoRepository extends JpaRepository<Video, String> {


    List<Video> findByTitleContaining(String keyword);

    @Query(value="select * from video limit 4", nativeQuery = true)

    List<Video> findFourVideos();


    @Query(value="select * from video left join ( select * from video_tag natural join tag ) as tags\n" +
            "on video.video_id = tags.video_id where name = :tag_name order by rand() limit 4 ", nativeQuery = true)
    List<Video> findTop4ByTagName(String tag_name);

    @Query(value="select * from video left join ( select * from video_tag natural join tag ) as tags\n" +
            " on video.video_id = tags.video_id where name = :tagName limit 40 offset :offset ", nativeQuery = true)
    List<Video> findAllByTagName(String tagName, int offset);
}
