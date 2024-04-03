package com.example.crawfish.service;

import com.example.crawfish.dto.UserDto;

public interface UserService {
  void checkIfEmailIsTaken(UserDto userDto);
}
