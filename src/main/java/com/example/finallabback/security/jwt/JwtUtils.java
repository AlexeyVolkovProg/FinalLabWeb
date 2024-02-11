package com.example.finallabback.security.jwt;

import com.example.finallabback.security.service.AuthUserDetails;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import java.util.Date;

/**
 * Класс, содержащий методы для генерации и обработки JWT токенов
 */
@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

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
            System.out.println("Ошибка при доставании мени из jwt токена имени");
            return null;
        }
    }

    public boolean validateJwtToken(String authToken){
        try {
            getParsedToken(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }












}
