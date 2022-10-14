package com.ssafy.laka.config;

import com.ssafy.laka.jwt.JwtAccessDeniedHandler;
import com.ssafy.laka.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.laka.jwt.JwtSecurityConfig;
import com.ssafy.laka.jwt.TokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.firewall.DefaultHttpFirewall;

@EnableWebSecurity
@AllArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .cors().and()

                .csrf().disable()

                // exception handling
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // h2-console 설정
                .and()
                .headers()
                .frameOptions()
                .sameOrigin()

                // 세션 사용 X
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // permitAll -> 요청 허용
                // autenticated -> 인증해야함
                .and()
                .authorizeRequests()
                .antMatchers(
                        "/api/v1/**/auth/**",
                        "/v2/api-docs",
                        "/swagger-resources",
                        "/swagger-resources/**",
                        "/configuration/ui",
                        "/configuration/security",
                        "/swagger-ui.html",
                        "/webjars/**",
                        /* swagger v3 */
                        "/v3/api-docs/**",
                        "/swagger-ui/**").permitAll()
                .anyRequest().authenticated()

                .and()
                .apply(new JwtSecurityConfig(tokenProvider));

//                .and()
//                .oauth2Login()
//                .successHandler(successHandler)
//                .userInfoEndpoint();
//                .userService(customOAuth2Service);
    }

    // security 무시
    @Override
    public void configure(WebSecurity web){
        web
                .httpFirewall(new DefaultHttpFirewall())
                .ignoring()
                .antMatchers( "/h2-console/**", "/swagger-ui/**");
    }

}
