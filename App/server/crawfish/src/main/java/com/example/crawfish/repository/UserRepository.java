package com.example.crawfish.repository;

import com.example.crawfish.dto.UserDto;
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

    public List<UserDto> findAll() {
      return jdbcClient.sql("SELECT id, username, email FROM users;")
              .query(UserDto.class)
              .list();
    }

    public void registerUser(UserDto userDto) {
      var updated = jdbcClient.sql("INSERT INTO users(id, username, email) VALUES (?, ?, ?);")
              .params(List.of(userDto.getId(), userDto.getUsername(), userDto.getEmail()))
              .update();
      Assert.state(updated == 1, "Failed to create user");
    }
}

