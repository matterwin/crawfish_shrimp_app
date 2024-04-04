package com.example.crawfish.mapper;

import com.example.crawfish.dto.UserDto;
import com.example.crawfish.model.User;

public class UserMapper {
  public static User mapToUser(UserDto userDto) {
    return User.builder()
            .username(userDto.getUsername())
            .email(userDto.getEmail())
            .build();
  }

  public static UserDto mapToUserDto(User user) {
    return UserDto.builder()
            .username(user.getUsername())
            .email(user.getEmail())
            .build();
    }
}

