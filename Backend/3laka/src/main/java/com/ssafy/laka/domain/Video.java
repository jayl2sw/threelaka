package com.ssafy.laka.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.json.JSONObject;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
@Table(name = "video")
public class Video {

    @Id
    private String videoId;
    private String title;
    private String description;
    private boolean korScript;

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    private List<VideoTag> videoTags;

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    private List<LearningRecord> LearningRecords;

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    private List<LikeVideo> likeVideos;

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    private List<Assignment> assignments;

//    public void preprocessDescription(){
//        String asdf = this.description;
//        System.out.println(asdf);
//        String[] list = asdf.split(".");
//        System.out.println(list);
//        for (String sentence: list) {
//            System.out.println(sentence);
//            if (!sentence.contains("http")){
//
//                asdf +=  (sentence + ". ");
//                System.out.println(asdf);
//            }
//        }
//        this.description = asdf;
//    }

        public void preprocessDescription() {
        String description1 = this.description;
        String description2 = description1.replaceAll("(http)+[^ ]+( )*", "링크. ");
        //
//            System.out.println("description 2 : " + description2);
            String[] arr = description2.split("\\.");
            StringBuilder sb = new StringBuilder();
        for ( int i = 0; i < arr.length; i++){
            if(!arr[i].contains("링크")) {
                sb.append(arr[i]).append(". ");
            }
        }
        String description = sb.toString().replace("  ", " ").replace(". .", ".");
//            System.out.println("description : " + description);
        this.description = description;
        }

    public void setKorScript() { this.korScript = true; }
    public static Video from(com.google.api.services.youtube.model.Video entity) {
//        String description1 = entity.getSnippet().getDescription();
//        description1.replaceAll("(http)+[^ ]+( )*", "링크");
//        String[] list = description1.split(".");
//
//        for ( int i = 0; i < list.length; i++){
//            if( list[i].contains("링크")) {
//                list[i] = null;
//            }
//        }
//
//        String description = Arrays.toString(list).replace(",", ".").replace("[", "").replace("]", "");

        String description = entity.getSnippet().getDescription();
        String tmp = "";
        for (String sentence: description.split(".")) {
            if (!sentence.contains("http")){
                tmp +=  (sentence + ". ");
            }
        }

        return Video.builder()
                .videoId(entity.getId())
                .title(entity.getSnippet().getTitle())
                .description(tmp)
                .build();
    }
}
