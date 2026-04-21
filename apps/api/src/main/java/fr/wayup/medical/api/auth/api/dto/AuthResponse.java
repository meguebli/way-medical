package fr.wayup.medical.api.auth.api.dto;

public record AuthResponse(
    String accessToken,
    long expiresIn,
    String tokenType
) {
}

