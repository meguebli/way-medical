package fr.wayup.medical.api.config;

import fr.wayup.medical.api.user.domain.UserRole;
import fr.wayup.medical.api.user.persistence.UserEntity;
import fr.wayup.medical.api.user.persistence.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class SecurityDataInitializer {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Bean
  @Profile("local")
  CommandLineRunner initLocalAdmin() {
    return args -> userRepository.findByEmail("admin@wayupit.fr")
        .orElseGet(() -> userRepository.save(UserEntity.builder()
            .firstName("System")
            .lastName("Admin")
            .email("admin@wayupit.fr")
            .passwordHash(passwordEncoder.encode("ChangeMe123!"))
            .role(UserRole.ADMIN)
            .enabled(true)
            .build()));
  }
}

