package com.example.crawfish.controller;

import com.example.crawfish.dto.UserDto;
import com.example.crawfish.service.UserService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/findAll")
  public List<UserDto> findAll() {
    // Your logic to find all users
  }

  @ResponseStatus(HttpStatus.CREATED)
  @PostMapping("/register")
  public void registerUser(@RequestBody UserDto userDto) {
    userService.checkIfEmailIsTaken(userDto);
    // Additional logic to register user
  }
}