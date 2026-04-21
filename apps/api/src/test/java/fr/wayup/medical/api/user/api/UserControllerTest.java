package fr.wayup.medical.api.user.api;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import fr.wayup.medical.api.auth.security.JwtAuthenticationFilter;
import fr.wayup.medical.api.config.SecurityConfig;
import fr.wayup.medical.api.common.exception.GlobalExceptionHandler;
import fr.wayup.medical.api.user.api.dto.UserResponse;
import fr.wayup.medical.api.user.domain.UserRole;
import fr.wayup.medical.api.user.security.CustomUserDetailsService;
import fr.wayup.medical.api.user.service.UserService;
import java.time.OffsetDateTime;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(UserController.class)
@Import({SecurityConfig.class, GlobalExceptionHandler.class})
class UserControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private UserService userService;

  @MockBean
  private CustomUserDetailsService customUserDetailsService;

  @MockBean
  private JwtAuthenticationFilter jwtAuthenticationFilter;

  @Test
  @WithMockUser(roles = "ADMIN")
  void shouldReturnUsersForAuthenticatedAdmin() throws Exception {
    UserResponse response = new UserResponse(
        1L,
        "Ali",
        "Meguebli",
        "contact@wayupit.fr",
        UserRole.ADMIN,
        true,
        OffsetDateTime.now(),
        OffsetDateTime.now()
    );

    when(userService.getAllUsers()).thenReturn(List.of(response));

    mockMvc.perform(get("/api/v1/users"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].email").value("contact@wayupit.fr"));
  }

  @Test
  @WithMockUser(roles = "ADMIN")
  void shouldRejectInvalidPayload() throws Exception {
    mockMvc.perform(post("/api/v1/users")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "firstName": "",
                  "lastName": "Meguebli",
                  "email": "invalid",
                  "password": "short",
                  "role": "ADMIN"
                }
                """))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.message").value("Validation failed"));
  }
}
