package fr.wayup.medical.api.auth.api;

import fr.wayup.medical.api.auth.api.dto.AuthRequest;
import fr.wayup.medical.api.auth.api.dto.AuthResponse;
import fr.wayup.medical.api.auth.api.dto.LogoutRequest;
import fr.wayup.medical.api.auth.api.dto.RefreshTokenRequest;
import fr.wayup.medical.api.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthController {

  private final AuthService authService;

  @PostMapping("/login")
  @Operation(summary = "Authenticate a user and issue a JWT")
  public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
    return ResponseEntity.ok(authService.authenticate(request));
  }

  @PostMapping("/refresh")
  @Operation(summary = "Refresh an expired access token with a valid refresh token")
  public ResponseEntity<AuthResponse> refresh(@Valid @RequestBody RefreshTokenRequest request) {
    return ResponseEntity.ok(authService.refresh(request));
  }

  @PostMapping("/logout")
  @Operation(summary = "Revoke the current refresh token")
  public ResponseEntity<Void> logout(@Valid @RequestBody LogoutRequest request) {
    authService.logout(request);
    return ResponseEntity.noContent().build();
  }
}
