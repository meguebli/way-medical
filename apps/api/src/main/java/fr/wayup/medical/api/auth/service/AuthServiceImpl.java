package fr.wayup.medical.api.auth.service;

import fr.wayup.medical.api.auth.api.dto.AuthRequest;
import fr.wayup.medical.api.auth.api.dto.AuthResponse;
import fr.wayup.medical.api.auth.api.dto.LogoutRequest;
import fr.wayup.medical.api.auth.api.dto.RefreshTokenRequest;
import fr.wayup.medical.api.auth.persistence.RefreshTokenEntity;
import fr.wayup.medical.api.auth.security.RefreshTokenService;
import fr.wayup.medical.api.auth.security.JwtTokenService;
import fr.wayup.medical.api.common.exception.BusinessException;
import fr.wayup.medical.api.user.persistence.UserEntity;
import fr.wayup.medical.api.user.persistence.UserRepository;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtTokenService jwtTokenService;
  private final RefreshTokenService refreshTokenService;
  private final UserRepository userRepository;

  @Override
  public AuthResponse authenticate(AuthRequest request) {
    try {
      Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(request.email(), request.password())
      );

      UserDetails userDetails = (UserDetails) authentication.getPrincipal();
      UserEntity user = userRepository.findByEmail(userDetails.getUsername())
          .orElseThrow(() -> new BusinessException(HttpStatus.UNAUTHORIZED, "User not found"));

      String accessToken = jwtTokenService.generateToken(userDetails);
      String refreshToken = refreshTokenService.createRefreshToken(user, jwtTokenService.getRefreshExpirationSeconds());
      return new AuthResponse(
          accessToken,
          refreshToken,
          jwtTokenService.getExpirationSeconds(),
          jwtTokenService.getRefreshExpirationSeconds(),
          "Bearer"
      );
    } catch (BadCredentialsException exception) {
      throw new BusinessException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }
  }

  @Override
  public AuthResponse refresh(RefreshTokenRequest request) {
    RefreshTokenEntity refreshToken = refreshTokenService.validateRefreshToken(request.refreshToken());
    UserEntity user = refreshToken.getUser();
    UserDetails userDetails = buildUserDetails(user);

    refreshTokenService.revoke(refreshToken);

    String accessToken = jwtTokenService.generateToken(userDetails);
    String rotatedRefreshToken = refreshTokenService.createRefreshToken(user, jwtTokenService.getRefreshExpirationSeconds());
    return new AuthResponse(
        accessToken,
        rotatedRefreshToken,
        jwtTokenService.getExpirationSeconds(),
        jwtTokenService.getRefreshExpirationSeconds(),
        "Bearer"
    );
  }

  @Override
  public void logout(LogoutRequest request) {
    refreshTokenService.revokeRefreshToken(request.refreshToken());
  }

  private UserDetails buildUserDetails(UserEntity user) {
    var authorities = new ArrayList<>(user.getRole().permissions().stream()
        .map(permission -> new SimpleGrantedAuthority(permission.authority()))
        .toList());
    authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));

    return org.springframework.security.core.userdetails.User.builder()
        .username(user.getEmail())
        .password(user.getPasswordHash())
        .disabled(!user.isEnabled())
        .authorities(authorities)
        .build();
  }
}
