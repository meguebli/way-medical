package fr.wayup.medical.api.user.service;

import fr.wayup.medical.api.user.api.dto.CreateUserRequest;
import fr.wayup.medical.api.user.api.dto.UserResponse;
import java.util.List;

public interface UserService {

  UserResponse createUser(CreateUserRequest request);

  UserResponse getUserById(Long id);

  List<UserResponse> getAllUsers();
}

