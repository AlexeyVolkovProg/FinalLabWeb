package com.example.finallabback.security.service;

import com.example.finallabback.entities.UserEntity;
import com.example.finallabback.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AuthUsersDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public AuthUsersDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }



    //применяем аннотацию, чтобы операция БД происходила в рамках одной транзакции
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> user = userRepository.findByUsername(username);
        if(!user.isPresent())
            throw new UsernameNotFoundException("User not found with name: " + username);
        return AuthUserDetails.build(user.get());
    }
}
