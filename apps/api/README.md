# API

Backend principal en Java Spring Boot.

## Stack backend

- Spring Boot 3
- Spring Security
- Spring Data JPA
- PostgreSQL
- Flyway
- Springdoc OpenAPI / Swagger
- JUnit 5 / Mockito

## Architecture livree

- `config/`: security, OpenAPI, bootstrap local
- `common/`: erreurs API et exception handler
- `user/`:
  - `api/`: controller, DTO, mapper
  - `domain/`: enums et modele de domaine simple
  - `persistence/`: entity et repository
  - `security/`: user details service
  - `service/`: service interface et implementation

## Fonctionnalites de base

- Spring Security avec auth JWT et protection par roles
- endpoint login `/api/v1/auth/login`
- endpoint Swagger disponible
- validation des requetes
- gestion centralisee des exceptions
- configuration par profils `local`, `rct`, `ppr`, `prod`
- migration Flyway initiale
- base de tests unitaires orientee TDD

## Demarrage theorique

Quand Java 21 et Maven seront installes:

```powershell
cd apps/api
mvn spring-boot:run
```

Avec PostgreSQL Docker local:

```powershell
mvn spring-boot:run -Dspring-boot.run.profiles=local-postgres
```

Swagger:

- `/swagger-ui.html`

Compte local bootstrap:

- `admin@wayupit.fr`
- `ChangeMe123!`

JWT:

- header: `Authorization: Bearer <token>`
