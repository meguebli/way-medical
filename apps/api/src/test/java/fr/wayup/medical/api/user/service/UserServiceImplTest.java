package fr.wayup.medical.api.user.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import fr.wayup.medical.api.common.exception.BusinessException;
import fr.wayup.medical.api.user.api.dto.CreateUserRequest;
import fr.wayup.medical.api.user.api.dto.UserResponse;
import fr.wayup.medical.api.user.api.mapper.UserMapper;
import fr.wayup.medical.api.user.domain.UserRole;
import fr.wayup.medical.api.user.persistence.UserEntity;
import fr.wayup.medical.api.user.persistence.UserRepository;
import java.time.OffsetDateTime;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private UserMapper userMapper;

  @Mock
  private PasswordEncoder passwordEncoder;

  @InjectMocks
  private UserServiceImpl userService;

  @Test
  void shouldCreateUserWhenEmailDoesNotExist() {
    CreateUserRequest request = new CreateUserRequest("Ali", "Meguebli", "contact@wayupit.fr", "StrongPassword123!", UserRole.ADMIN);
    UserEntity mappedEntity = UserEntity.builder()
        .firstName("Ali")
        .lastName("Meguebli")
        .email("contact@wayupit.fr")
        .role(UserRole.ADMIN)
        .enabled(true)
        .build();
    UserEntity savedEntity = UserEntity.builder()
        .id(1L)
        .firstName("Ali")
        .lastName("Meguebli")
        .email("contact@wayupit.fr")
        .passwordHash("encoded")
        .role(UserRole.ADMIN)
        .enabled(true)
        .createdAt(OffsetDateTime.now())
        .updatedAt(OffsetDateTime.now())
        .build();
    UserResponse response = new UserResponse(1L, "Ali", "Meguebli", "contact@wayupit.fr", UserRole.ADMIN, true, savedEntity.getCreatedAt(), savedEntity.getUpdatedAt());

    when(userRepository.existsByEmail(request.email())).thenReturn(false);
    when(userMapper.toEntity(request)).thenReturn(mappedEntity);
    when(passwordEncoder.encode(request.password())).thenReturn("encoded");
    when(userRepository.save(mappedEntity)).thenReturn(savedEntity);
    when(userMapper.toResponse(savedEntity)).thenReturn(response);

    UserResponse created = userService.createUser(request);

    assertThat(created.id()).isEqualTo(1L);
    assertThat(mappedEntity.getPasswordHash()).isEqualTo("encoded");
    verify(userRepository).save(mappedEntity);
  }

  @Test
  void shouldRejectDuplicateEmail() {
    CreateUserRequest request = new CreateUserRequest("Ali", "Meguebli", "contact@wayupit.fr", "StrongPassword123!", UserRole.ADMIN);

    when(userRepository.existsByEmail(request.email())).thenReturn(true);

    assertThatThrownBy(() -> userService.createUser(request))
        .isInstanceOf(BusinessException.class)
        .hasMessage("A user already exists with this email");
  }

  @Test
  void shouldReturnUserById() {
    UserEntity entity = UserEntity.builder()
        .id(7L)
        .email("manager@wayupit.fr")
        .firstName("Med")
        .lastName("Manager")
        .passwordHash("hash")
        .role(UserRole.MANAGER)
        .enabled(true)
        .build();
    UserResponse response = new UserResponse(7L, "Med", "Manager", "manager@wayupit.fr", UserRole.MANAGER, true, null, null);

    when(userRepository.findById(7L)).thenReturn(Optional.of(entity));
    when(userMapper.toResponse(entity)).thenReturn(response);

    assertThat(userService.getUserById(7L)).isEqualTo(response);
  }
}

