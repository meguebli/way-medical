package fr.wayup.medical.api.user.api.mapper;

import fr.wayup.medical.api.user.api.dto.CreateUserRequest;
import fr.wayup.medical.api.user.api.dto.UserResponse;
import fr.wayup.medical.api.user.persistence.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserResponse toResponse(UserEntity entity);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "passwordHash", ignore = true)
  @Mapping(target = "enabled", constant = "true")
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  UserEntity toEntity(CreateUserRequest request);
}

