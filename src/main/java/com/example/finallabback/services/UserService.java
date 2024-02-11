package com.example.finallabback.services;

import com.example.finallabback.dto.AuthorizedUserCredentials;
import com.example.finallabback.dto.UserCredentials;
import com.example.finallabback.entities.UserEntity;
import com.example.finallabback.repositories.UserRepository;
import com.example.finallabback.security.jwt.JwtUtils;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class UserService {
    private final int MIN_USERNAME_LENGTH = 4;
    private final int MIN_PASSWORD_LENGTH = 6;

    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder encoder;

    private final JwtUtils jwtUtils;

    public UserCredentials findByUsername(String username) {
        Optional<UserEntity> user = userRepository.findByUsername(username);

        if (!user.isPresent())
            throw new UsernameNotFoundException("User not found by given username");

        return new UserCredentials(username, user.get().getPassword());
    }

    public AuthorizedUserCredentials login(UserCredentials userCredentials) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userCredentials.getUsername(), userCredentials.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtUtils.generateJwtToken(authentication);

        return new AuthorizedUserCredentials(userCredentials.getUsername(), jwtToken);
    }

    @Transactional
    public AuthorizedUserCredentials signUp(UserCredentials userCredentials) {
        if (userRepository.existsByUsername(userCredentials.getUsername())) {
            throw new BadCredentialsException("This username is already taken");
        }
        if (userCredentials.getUsername().length() < MIN_USERNAME_LENGTH) {
            throw new BadCredentialsException(
                    String.format("Username is too short. Min length %s", MIN_USERNAME_LENGTH)
            );
        }

        if (userCredentials.getPassword().length() < MIN_PASSWORD_LENGTH) {
            throw new BadCredentialsException(
                    String.format("Password is too short. Min length %s", MIN_PASSWORD_LENGTH)
            );
        }

        UserEntity user = new UserEntity(userCredentials.encoded(encoder));
        userRepository.save(user);

        return login(userCredentials);
    }
}
