package com.example.crawfish.service.impl;

import com.example.crawfish.dto.UserDto;
import com.example.crawfish.model.User;
import com.example.crawfish.repository.UserRepository;
import com.example.crawfish.service.UserService;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;

  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  // @Override
  // List<UserDto> findAll() {
  //   List<User> users = userRepository.findAll();
  //   return users.stream().map((user) -> mapToUserDto(user)).collect(Collectors.toList()); 
  // }

  @Override
  public void registerUser(UserDto userDto) {
    int emailTaken = userRepository.isEmailTaken(userDto.getEmail());
    if (emailTaken > 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is already taken");
    }
    userRepository.registerUser(userDto);
  }
}
