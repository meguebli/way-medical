package fr.wayup.medical.api.user.domain;

public enum UserPermission {
  USERS_READ("users:read"),
  USERS_CREATE("users:create");

  private final String authority;

  UserPermission(String authority) {
    this.authority = authority;
  }

  public String authority() {
    return authority;
  }
}
