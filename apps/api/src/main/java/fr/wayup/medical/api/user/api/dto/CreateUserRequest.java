package fr.wayup.medical.api.user.api.dto;

import fr.wayup.medical.api.user.domain.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(
    @NotBlank @Size(max = 100) String firstName,
    @NotBlank @Size(max = 100) String lastName,
    @NotBlank @Email @Size(max = 150) String email,
    @NotBlank @Size(min = 12, max = 100) String password,
    @NotNull UserRole role
) {
}

