# Local PostgreSQL

## Objectif

Base PostgreSQL locale dediee au projet `WAY-MEDICAL` via Docker Desktop.

## Stack locale

- conteneur: `way-medical-postgres`
- image: `postgres:16-alpine`
- port hote: `5441`
- base: `way_medical`
- utilisateur: `way_medical_app`

## Fichiers

- [docker-compose.yml](C:/Users/amegg/Desktop/WAY-MEDICAL/infra/docker/postgres/docker-compose.yml)
- [.env.example](C:/Users/amegg/Desktop/WAY-MEDICAL/infra/docker/postgres/.env.example)
- [01-init-way-medical.sql](C:/Users/amegg/Desktop/WAY-MEDICAL/infra/docker/postgres/init/01-init-way-medical.sql)

## Demarrage

```powershell
cd C:\Users\amegg\Desktop\WAY-MEDICAL\infra\docker\postgres
docker compose up -d
```

## Verification

```powershell
docker ps
docker logs way-medical-postgres
```

## Connexion

- Host: `localhost`
- Port: `5441`
- Database: `way_medical`
- User: `way_medical_app`
- Password: `way_medical_pwd`

## Backend Spring Boot

Profil recommande:

- `local-postgres`

Exemple:

```powershell
cd C:\Users\amegg\Desktop\WAY-MEDICAL\apps\api
mvn spring-boot:run -Dspring-boot.run.profiles=local-postgres
```

