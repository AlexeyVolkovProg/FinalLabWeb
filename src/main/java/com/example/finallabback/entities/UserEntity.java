package com.example.finallabback.entities;


import com.example.finallabback.dto.UserCredentials;
import jakarta.persistence.*;
import lombok.*;


/**
 * Сущность отвечающая, за хранение пользователей
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "all_users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ToString.Exclude
    private Long id;
    private String username;
    private String password;

    public UserEntity(UserCredentials userCredentials){
        this.username = userCredentials.getUsername();
        this.password = userCredentials.getPassword();
    }
}
