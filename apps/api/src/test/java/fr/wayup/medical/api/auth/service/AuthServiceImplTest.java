package fr.wayup.medical.api.auth.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import fr.wayup.medical.api.auth.api.dto.AuthRequest;
import fr.wayup.medical.api.auth.api.dto.AuthResponse;
import fr.wayup.medical.api.auth.api.dto.LogoutRequest;
import fr.wayup.medical.api.auth.api.dto.RefreshTokenRequest;
import fr.wayup.medical.api.auth.persistence.RefreshTokenEntity;
import fr.wayup.medical.api.auth.security.RefreshTokenService;
import fr.wayup.medical.api.auth.security.JwtTokenService;
import fr.wayup.medical.api.common.exception.BusinessException;
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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

  @Mock
  private AuthenticationManager authenticationManager;

  @Mock
  private JwtTokenService jwtTokenService;

  @Mock
  private RefreshTokenService refreshTokenService;

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private AuthServiceImpl authService;

  @Test
  void shouldAuthenticateAndReturnJwtResponse() {
    AuthRequest request = new AuthRequest("admin@wayupit.fr", "password");
    UserDetails userDetails = User.withUsername("admin@wayupit.fr").password("encoded").roles("ADMIN").build();
    Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    UserEntity user = UserEntity.builder()
        .id(1L)
        .email("admin@wayupit.fr")
        .passwordHash("encoded")
        .role(UserRole.ADMIN)
        .enabled(true)
        .build();

    when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
        .thenReturn(authentication);
    when(userRepository.findByEmail("admin@wayupit.fr")).thenReturn(Optional.of(user));
    when(jwtTokenService.generateToken(userDetails)).thenReturn("jwt-token");
    when(jwtTokenService.getExpirationSeconds()).thenReturn(3600L);
    when(jwtTokenService.getRefreshExpirationSeconds()).thenReturn(604800L);
    when(refreshTokenService.createRefreshToken(user, 604800L)).thenReturn("refresh-token");

    AuthResponse response = authService.authenticate(request);

    assertThat(response.accessToken()).isEqualTo("jwt-token");
    assertThat(response.refreshToken()).isEqualTo("refresh-token");
    assertThat(response.expiresIn()).isEqualTo(3600L);
    assertThat(response.refreshExpiresIn()).isEqualTo(604800L);
    assertThat(response.tokenType()).isEqualTo("Bearer");
  }

  @Test
  void shouldRejectInvalidCredentials() {
    AuthRequest request = new AuthRequest("admin@wayupit.fr", "wrong-password");

    when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
        .thenThrow(new BadCredentialsException("Bad credentials"));

    assertThatThrownBy(() -> authService.authenticate(request))
        .isInstanceOf(BusinessException.class)
        .hasMessage("Invalid credentials");
  }

  @Test
  void shouldRefreshTokens() {
    UserEntity user = UserEntity.builder()
        .id(1L)
        .email("admin@wayupit.fr")
        .passwordHash("encoded")
        .role(UserRole.ADMIN)
        .enabled(true)
        .build();
    RefreshTokenEntity refreshTokenEntity = RefreshTokenEntity.builder()
        .id(10L)
        .user(user)
        .expiresAt(OffsetDateTime.now().plusDays(1))
        .revoked(false)
        .build();

    when(refreshTokenService.validateRefreshToken("refresh-token")).thenReturn(refreshTokenEntity);
    when(jwtTokenService.generateToken(any(UserDetails.class))).thenReturn("new-access-token");
    when(jwtTokenService.getExpirationSeconds()).thenReturn(3600L);
    when(jwtTokenService.getRefreshExpirationSeconds()).thenReturn(604800L);
    when(refreshTokenService.createRefreshToken(user, 604800L)).thenReturn("new-refresh-token");

    AuthResponse response = authService.refresh(new RefreshTokenRequest("refresh-token"));

    assertThat(response.accessToken()).isEqualTo("new-access-token");
    assertThat(response.refreshToken()).isEqualTo("new-refresh-token");
  }

  @Test
  void shouldLogoutByRevokingRefreshToken() {
    authService.logout(new LogoutRequest("refresh-token"));
  }
}
