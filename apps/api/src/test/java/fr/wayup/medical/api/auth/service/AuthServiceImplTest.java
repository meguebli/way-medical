package fr.wayup.medical.api.auth.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import fr.wayup.medical.api.auth.api.dto.AuthRequest;
import fr.wayup.medical.api.auth.api.dto.AuthResponse;
import fr.wayup.medical.api.auth.security.JwtTokenService;
import fr.wayup.medical.api.common.exception.BusinessException;
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

  @InjectMocks
  private AuthServiceImpl authService;

  @Test
  void shouldAuthenticateAndReturnJwtResponse() {
    AuthRequest request = new AuthRequest("admin@wayupit.fr", "password");
    UserDetails userDetails = User.withUsername("admin@wayupit.fr").password("encoded").roles("ADMIN").build();
    Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

    when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
        .thenReturn(authentication);
    when(jwtTokenService.generateToken(userDetails)).thenReturn("jwt-token");
    when(jwtTokenService.getExpirationSeconds()).thenReturn(3600L);

    AuthResponse response = authService.authenticate(request);

    assertThat(response.accessToken()).isEqualTo("jwt-token");
    assertThat(response.expiresIn()).isEqualTo(3600L);
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
}
