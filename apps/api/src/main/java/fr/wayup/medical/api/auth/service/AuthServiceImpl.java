package fr.wayup.medical.api.auth.service;

import fr.wayup.medical.api.auth.api.dto.AuthRequest;
import fr.wayup.medical.api.auth.api.dto.AuthResponse;
import fr.wayup.medical.api.auth.security.JwtTokenService;
import fr.wayup.medical.api.common.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtTokenService jwtTokenService;

  @Override
  public AuthResponse authenticate(AuthRequest request) {
    try {
      Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(request.email(), request.password())
      );

      UserDetails userDetails = (UserDetails) authentication.getPrincipal();
      String token = jwtTokenService.generateToken(userDetails);
      return new AuthResponse(token, jwtTokenService.getExpirationSeconds(), "Bearer");
    } catch (BadCredentialsException exception) {
      throw new BusinessException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }
  }
}

