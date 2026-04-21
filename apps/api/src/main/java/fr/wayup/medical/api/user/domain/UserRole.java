package fr.wayup.medical.api.user.domain;

import java.util.Set;

public enum UserRole {
  ADMIN(Set.of(UserPermission.USERS_READ, UserPermission.USERS_CREATE)),
  MANAGER(Set.of(UserPermission.USERS_READ)),
  PRACTITIONER(Set.of());

  private final Set<UserPermission> permissions;

  UserRole(Set<UserPermission> permissions) {
    this.permissions = permissions;
  }

  public Set<UserPermission> permissions() {
    return permissions;
  }
}
