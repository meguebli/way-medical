package fr.wayup.medical.api.auth.service;

import fr.wayup.medical.api.auth.api.dto.AuthRequest;
import fr.wayup.medical.api.auth.api.dto.AuthResponse;

public interface AuthService {

  AuthResponse authenticate(AuthRequest request);
}

