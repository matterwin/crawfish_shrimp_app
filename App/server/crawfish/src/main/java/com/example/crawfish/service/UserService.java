package com.example.crawfish.service;

import com.example.crawfish.dto.UserDto;
import com.example.crawfish.model.User;

import java.util.List;

public interface UserService {
  void registerUser(User user);
  List<UserDto> findAllUsers();
}
