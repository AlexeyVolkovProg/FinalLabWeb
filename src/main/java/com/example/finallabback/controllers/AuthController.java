package com.example.finallabback.controllers;


import com.example.finallabback.dto.AuthorizedUserCredentials;
import com.example.finallabback.dto.UserCredentials;
import com.example.finallabback.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.ReactiveOffsetScrollPositionHandlerMethodArgumentResolver;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthorizedUserCredentials> login (@Validated @RequestBody UserCredentials userCredentials){
        AuthorizedUserCredentials credentials = userService.login(userCredentials);
        return ResponseEntity.ok(credentials);
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthorizedUserCredentials> signup(@Validated @RequestBody UserCredentials userCredentials){
        AuthorizedUserCredentials credentials = userService.signUp(userCredentials);
        return ResponseEntity.ok(credentials);
    }
}
