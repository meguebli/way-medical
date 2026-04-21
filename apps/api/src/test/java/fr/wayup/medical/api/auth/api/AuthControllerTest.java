package fr.wayup.medical.api.auth.api;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import fr.wayup.medical.api.auth.api.dto.AuthResponse;
import fr.wayup.medical.api.auth.security.JwtAuthenticationFilter;
import fr.wayup.medical.api.auth.service.AuthService;
import fr.wayup.medical.api.common.exception.GlobalExceptionHandler;
import fr.wayup.medical.api.config.SecurityConfig;
import fr.wayup.medical.api.user.security.CustomUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(AuthController.class)
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class AuthControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private AuthService authService;

  @MockBean
  private CustomUserDetailsService customUserDetailsService;

  @MockBean
  private JwtAuthenticationFilter jwtAuthenticationFilter;

  @Test
  void shouldReturnJwtOnSuccessfulLogin() throws Exception {
    when(authService.authenticate(any())).thenReturn(new AuthResponse("jwt-token", "refresh-token", 3600L, 604800L, "Bearer"));

    mockMvc.perform(post("/api/v1/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "email": "admin@wayupit.fr",
                  "password": "ChangeMe123!"
                }
                """))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accessToken").value("jwt-token"))
        .andExpect(jsonPath("$.refreshToken").value("refresh-token"))
        .andExpect(jsonPath("$.tokenType").value("Bearer"));
  }

  @Test
  void shouldRefreshJwt() throws Exception {
    when(authService.refresh(any())).thenReturn(new AuthResponse("new-jwt", "new-refresh", 3600L, 604800L, "Bearer"));

    mockMvc.perform(post("/api/v1/auth/refresh")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "refreshToken": "refresh-token"
                }
                """))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accessToken").value("new-jwt"))
        .andExpect(jsonPath("$.refreshToken").value("new-refresh"));
  }

  @Test
  void shouldLogout() throws Exception {
    mockMvc.perform(post("/api/v1/auth/logout")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "refreshToken": "refresh-token"
                }
                """))
        .andExpect(status().isNoContent());
  }
}
