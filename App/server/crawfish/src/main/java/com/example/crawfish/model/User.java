package com.example.crawfish.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public record User (
  @Id
  String id,
  String username,
  String email
) {}

