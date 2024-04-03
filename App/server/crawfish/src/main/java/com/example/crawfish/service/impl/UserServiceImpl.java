package com.example.crawfish.service.impl;

import com.example.crawfish.dto.UserDto;
import com.example.crawfish.repository.UserRepository;
import com.example.crawfish.service.UserService;

import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;

  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public void checkIfEmailIsTaken(UserDto userDto) {
  } 
}
