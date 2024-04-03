package com.example.crawfish.controller;

import com.example.crawfish.repository.UserRepository;
import com.example.crawfish.model.User;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

  private final UserRepository userRepository;

  public UserController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @GetMapping("/findAll")
  List<User> findAll() {
    return userRepository.findAll();
  }
}
