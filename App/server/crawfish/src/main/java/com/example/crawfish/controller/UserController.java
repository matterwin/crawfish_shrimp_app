package com.example.crawfish.controller;

import com.example.crawfish.dto.UserDto;
import com.example.crawfish.model.User;
import com.example.crawfish.service.UserService;

import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
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

  @GetMapping("/findAllUsers")
  public List<UserDto> findAllUsers() {
    List<UserDto> userDtos = userService.findAllUsers();
    return userDtos;
  }

  @ResponseStatus(HttpStatus.CREATED)
  @PostMapping("/register")
  public void registerUser(@RequestBody User user) { 
    userService.registerUser(user); 
  }
}
