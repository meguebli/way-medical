package fr.wayup.medical.api.auth.api.dto;

public record AuthResponse(
    String accessToken,
    String refreshToken,
    long expiresIn,
    long refreshExpiresIn,
    String tokenType
) {
}
