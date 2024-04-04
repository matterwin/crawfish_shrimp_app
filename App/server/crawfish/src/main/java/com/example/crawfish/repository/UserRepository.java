package com.example.crawfish.repository;

import com.example.crawfish.dto.UserDto;
import com.example.crawfish.model.User;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;

@Repository
public class UserRepository {

    private final JdbcClient jdbcClient;

    public UserRepository(JdbcClient jdbcClient) {
      this.jdbcClient = jdbcClient;
    }

    public List<User> findAll() {
      return jdbcClient.sql("SELECT id, username, email FROM users;")
        .query(User.class)
        .list();
    }

    public void registerUser(User user) {
      var updated = jdbcClient.sql("INSERT INTO users(id, username, email) VALUES (?, ?, ?);")
        .params(List.of(user.getId(), user.getUsername(), user.getEmail()))
        .update();
      Assert.state(updated == 1, "Failed to create user");
    }

    public int isEmailTaken(String email) {
      return jdbcClient.sql("select * from users where email = :email")
        .param("email", email)
        .query()
        .listOfRows()
        .size();
    }
}

