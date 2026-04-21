package fr.wayup.medical.api.user.api.dto;

import fr.wayup.medical.api.user.domain.UserRole;
import java.time.OffsetDateTime;

public record UserResponse(
    Long id,
    String firstName,
    String lastName,
    String email,
    UserRole role,
    boolean enabled,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
}

