package fr.wayup.medical.api.auth.security;

import fr.wayup.medical.api.auth.persistence.RefreshTokenEntity;
import fr.wayup.medical.api.auth.persistence.RefreshTokenRepository;
import fr.wayup.medical.api.common.exception.BusinessException;
import fr.wayup.medical.api.user.persistence.UserEntity;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.OffsetDateTime;
import java.util.HexFormat;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

  private final RefreshTokenRepository refreshTokenRepository;

  @Transactional
  public String createRefreshToken(UserEntity user, long expirationSeconds) {
    String rawToken = UUID.randomUUID() + "." + UUID.randomUUID();
    RefreshTokenEntity entity = RefreshTokenEntity.builder()
        .tokenHash(hash(rawToken))
        .user(user)
        .expiresAt(OffsetDateTime.now().plusSeconds(expirationSeconds))
        .revoked(false)
        .createdAt(OffsetDateTime.now())
        .build();

    refreshTokenRepository.save(entity);
    return rawToken;
  }

  @Transactional
  public RefreshTokenEntity validateRefreshToken(String rawToken) {
    RefreshTokenEntity entity = refreshTokenRepository.findByTokenHash(hash(rawToken))
        .orElseThrow(() -> new BusinessException(HttpStatus.UNAUTHORIZED, "Invalid refresh token"));

    if (entity.isRevoked() || entity.getExpiresAt().isBefore(OffsetDateTime.now())) {
      throw new BusinessException(HttpStatus.UNAUTHORIZED, "Refresh token is expired or revoked");
    }

    return entity;
  }

  @Transactional
  public void revokeRefreshToken(String rawToken) {
    refreshTokenRepository.findByTokenHash(hash(rawToken))
        .ifPresent(this::revoke);
  }

  @Transactional
  public void revoke(RefreshTokenEntity entity) {
    entity.setRevoked(true);
    entity.setRevokedAt(OffsetDateTime.now());
    refreshTokenRepository.save(entity);
  }

  private String hash(String rawToken) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] bytes = digest.digest(rawToken.getBytes(StandardCharsets.UTF_8));
      return HexFormat.of().formatHex(bytes);
    } catch (NoSuchAlgorithmException exception) {
      throw new IllegalStateException("SHA-256 algorithm unavailable", exception);
    }
  }
}

