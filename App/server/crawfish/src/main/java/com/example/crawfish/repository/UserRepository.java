package com.example.crawfish.repository;

import com.example.crawfish.model.User;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

  private final JdbcClient jdbcClient;

  public UserRepository(JdbcClient jdbcClient) {
    this.jdbcClient = jdbcClient;
  }

  public List<User> findAll() {
    return jdbcClient.sql("select * from users")
            .query(User.class)
            .list();
  } 
}
