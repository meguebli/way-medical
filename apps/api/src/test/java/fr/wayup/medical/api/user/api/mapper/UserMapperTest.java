package fr.wayup.medical.api.user.api.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import fr.wayup.medical.api.user.api.dto.CreateUserRequest;
import fr.wayup.medical.api.user.domain.UserRole;
import fr.wayup.medical.api.user.persistence.UserEntity;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

class UserMapperTest {

  private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

  @Test
  void shouldMapCreateRequestToEntityWithoutSensitiveGeneratedFields() {
    CreateUserRequest request = new CreateUserRequest(
        "Ali",
        "Meguebli",
        "contact@wayupit.fr",
        "StrongPassword123!",
        UserRole.ADMIN
    );

    UserEntity entity = userMapper.toEntity(request);

    assertThat(entity.getId()).isNull();
    assertThat(entity.getFirstName()).isEqualTo("Ali");
    assertThat(entity.getLastName()).isEqualTo("Meguebli");
    assertThat(entity.getEmail()).isEqualTo("contact@wayupit.fr");
    assertThat(entity.getPasswordHash()).isNull();
    assertThat(entity.isEnabled()).isTrue();
    assertThat(entity.getRole()).isEqualTo(UserRole.ADMIN);
  }
}

