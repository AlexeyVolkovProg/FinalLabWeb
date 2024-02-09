package com.example.finallabback.security.jwt;

import com.example.finallabback.security.service.AuthUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Класс, содержащий методы для генерации и обработки JWT токенов
 */
@Component
public class JwtUtils {

    @Value("${app.jwtSecret}")
    private String jwtSecret; // подпись

    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs; // время существования


    /**
     * Генерация JWT токена для текущего пользователя
     */
    public String generateJwtToken(Authentication authentication){
        AuthUserDetails userPrincipal = (AuthUserDetails) authentication.getPrincipal(); //получаем текущую авторизацию
        return Jwts.builder().setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date()).
                setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)).
                signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
    }


    /**
     * Вспомогательный метод, помогающий дешифровать токен и достать с него информацию
     */
    private Jws<Claims> getParsedToken(String authToken){
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
    }


    /**
     * Метод, достающий имя пользователя из JWT токена
     */
    public String getUserNameFromJwtToken(String authToken){
        try {
            return getParsedToken(authToken).getBody().getSubject();
        } catch (Exception e) {
            return null;
        }
    }


    //todo доработать обработку исключений
    public boolean validateJwtToken(String authToken){
        getParsedToken(authToken);
        return true;
    }












}
