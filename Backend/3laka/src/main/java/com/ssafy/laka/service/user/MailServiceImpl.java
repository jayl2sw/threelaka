package com.ssafy.laka.service.user;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService{

    private final JavaMailSender emailSender;

    public static final StringBuilder ePw = new StringBuilder();

    private MimeMessage changePasswordMessage(String to) throws Exception{
        MimeMessage message = emailSender.createMimeMessage();
        ePw.setLength(0);
        ePw.append(createKey());

        message.addRecipients(RecipientType.TO, to);//보내는 대상
        message.setSubject("쓰리라카 새로운 비밀번호");//제목

        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<img src='image' style='width:150px; height:150px;'/>";
        msgg+= "<h1> 안녕하세요 스리라카입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>비밀번호가 아래와 같이 변경되었습니다.<p>";
        msgg+= "<br>";
        msgg+= "<p>로그인 후 새로운 비밀번호로 변경해주십시오.<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>새 비밀번호입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= ePw.toString()+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("laka@gmail.com","DCDG"));//보내는 사람

        return message;
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }

        return key.toString();
    }
    @Override
    public String sendSimpleMessage(String to) throws Exception {
        MimeMessage message;
        message = changePasswordMessage(to);
        try{
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw.toString();
    }

}
