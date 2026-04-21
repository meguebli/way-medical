package fr.wayup.medical.api.user.service;

import fr.wayup.medical.api.common.exception.BusinessException;
import fr.wayup.medical.api.user.api.dto.CreateUserRequest;
import fr.wayup.medical.api.user.api.dto.UserResponse;
import fr.wayup.medical.api.user.api.mapper.UserMapper;
import fr.wayup.medical.api.user.persistence.UserEntity;
import fr.wayup.medical.api.user.persistence.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;

  @Override
  @Transactional
  public UserResponse createUser(CreateUserRequest request) {
    if (userRepository.existsByEmail(request.email())) {
      throw new BusinessException(HttpStatus.CONFLICT, "A user already exists with this email");
    }

    UserEntity entity = userMapper.toEntity(request);
    entity.setPasswordHash(passwordEncoder.encode(request.password()));

    return userMapper.toResponse(userRepository.save(entity));
  }

  @Override
  public UserResponse getUserById(Long id) {
    return userMapper.toResponse(userRepository.findById(id)
        .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "User not found")));
  }

  @Override
  public List<UserResponse> getAllUsers() {
    return userRepository.findAll()
        .stream()
        .map(userMapper::toResponse)
        .toList();
  }
}

