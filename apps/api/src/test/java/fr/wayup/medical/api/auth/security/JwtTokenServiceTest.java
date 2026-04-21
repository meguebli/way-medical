package fr.wayup.medical.api.auth.security;

import static org.assertj.core.api.Assertions.assertThat;

import fr.wayup.medical.api.auth.config.JwtProperties;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

class JwtTokenServiceTest {

  private final JwtTokenService jwtTokenService = new JwtTokenService(
      new JwtProperties("V2F5TWVkaWNhbFN1cGVyU2VjcmV0S2V5Rm9ySldUMTIzNDU2Nzg5MDEyMzQ1Ng==", 3600, 604800)
  );

  @Test
  void shouldGenerateAndValidateJwtToken() {
    UserDetails userDetails = User.withUsername("admin@wayupit.fr")
        .password("encoded")
        .roles("ADMIN")
        .build();

    String token = jwtTokenService.generateToken(userDetails);

    assertThat(token).isNotBlank();
    assertThat(jwtTokenService.extractUsername(token)).isEqualTo("admin@wayupit.fr");
    assertThat(jwtTokenService.isTokenValid(token, userDetails)).isTrue();
  }
}
