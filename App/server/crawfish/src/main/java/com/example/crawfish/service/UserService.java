package com.example.crawfish.service;

import com.example.crawfish.dto.UserDto;
import com.example.crawfish.model.User;

import java.util.List;

public interface UserService {
  void registerUser(UserDto userDto);
  /* List<UserDto> findAll(); */
}
