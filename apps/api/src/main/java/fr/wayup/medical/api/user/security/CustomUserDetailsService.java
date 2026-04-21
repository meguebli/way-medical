package fr.wayup.medical.api.user.security;

import fr.wayup.medical.api.user.persistence.UserEntity;
import fr.wayup.medical.api.user.persistence.UserRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserEntity user = userRepository.findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    List<SimpleGrantedAuthority> authorities = new ArrayList<>(user.getRole().permissions().stream()
        .map(permission -> new SimpleGrantedAuthority(permission.authority()))
        .toList());
    authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));

    return User.builder()
        .username(user.getEmail())
        .password(user.getPasswordHash())
        .disabled(!user.isEnabled())
        .authorities(authorities)
        .build();
  }
}
