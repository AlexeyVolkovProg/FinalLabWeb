package com.example.finallabback.security;


import com.example.finallabback.security.jwt.AuthEntryPoint;
import com.example.finallabback.security.service.AuthUsersDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableGlobalMethodSecurity() // поправь аннотацию
public class SecurityConfig {

    private final AuthUsersDetailsService usersDetailsService; //
    private final AuthEntryPoint unauthorizedHandler;

    @Autowired
    public SecurityConfig(AuthUsersDetailsService usersDetailsService, AuthEntryPoint unauthorizedHandler) {
        this.usersDetailsService = usersDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
    }


    //подключаем один из основных интерфейсов Spring Security, который помогает делать проверку авторизации
    //AuthenticationConfiguration - это конфигурационный класс, предоставляемый Spring Security, который содержит настройки для аутентификации.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    //подключение шифрования паролей на основе алгоритма BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    //Это класс из Spring Security, который обеспечивает аутентификацию
    //пользователей на основе информации о пользователях, полученной из базы данных.
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(usersDetailsService); // подключаем сервис взаимодействия
        authProvider.setPasswordEncoder(passwordEncoder()); // подключаем хеширование паролей
        return authProvider;
    }

    /**
     * Цепь фильтров, которые определяют порядок обработки входящих запросов
     */

    //todo в новой версии spring security появился стиль написания при помощи лямбд
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // напиши фильтры в новом стиле
        http.csrf(AbstractHttpConfigurer::disable).cors(AbstractHttpConfigurer::disable); // отключаем защиту csrf и cors
        http.sessionManagement(
                session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // отключение сессий, в rest их нет
        );

        http.exceptionHandling((exception) -> exception.authenticationEntryPoint(unauthorizedHandler)); // обработчик ошибки авторизации
        //будет работать если например пользователь стучится без указания роли
        //todo не забудь добавить эту обработку в классе AuthEntryPoint

        http.authorizeHttpRequests(auth -> {
            auth.requestMatchers("/api/auth/**").permitAll(); // запросы по данному url разрешены всем
            auth.anyRequest().authenticated(); // все остальные только авторизированным пользователям
        });


        //todo добавление фильтров

        return http.build();
    }


}
