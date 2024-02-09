package com.example.finallabback.security.service;


import com.example.finallabback.entities.UserEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.Collection;
import java.util.Collections;


@AllArgsConstructor
@Getter
public class AuthUserDetails implements UserDetails {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String username;

    //для того чтобы при отправке на сервер пароль не вписывался
    //согласно условиях безопасности
    @JsonIgnore
    private String password;

    //массив роле для пользователя
    private Collection<? extends GrantedAuthority> authorities;


    /**
     * Создаем объект нашего класса, используем в AuthUsersDetailsService
     */
    public static AuthUserDetails build(UserEntity user){
        return new AuthUserDetails(user.getId(),
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("Default")));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }


    /**
     * Проверка на то, истек ли срок учетной записи
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }


    /**
     * Проверка на то, заблокирована ли учетная запись или нет
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }


    /**
     * Проверка на то, истек ли срок действия сертификата или нет
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    /**
     * Проверка на то, включен ли аккаунт
     */
    @Override
    public boolean isEnabled() {
        return true;
    }


}
