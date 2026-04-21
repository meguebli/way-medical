package fr.wayup.medical.api.auth.service;

import fr.wayup.medical.api.auth.api.dto.AuthRequest;
import fr.wayup.medical.api.auth.api.dto.AuthResponse;
import fr.wayup.medical.api.auth.api.dto.LogoutRequest;
import fr.wayup.medical.api.auth.api.dto.RefreshTokenRequest;

public interface AuthService {

  AuthResponse authenticate(AuthRequest request);

  AuthResponse refresh(RefreshTokenRequest request);

  void logout(LogoutRequest request);
}
