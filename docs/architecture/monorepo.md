# Monorepo Architecture

## Pourquoi un monorepo

- Vision unique du produit
- Partage de composants et contrats
- Standards uniformes
- Simplification de la CI/CD

## Repartition

- `apps/web`: application Angular
- `apps/mobile`: application React mobile
- `apps/api`: services backend Java Spring Boot
- `packages/`: contrats API, schemas, librairies partagees
- `infra/`: deploiement, environnements, observabilite, IaC

## Stack de reference

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL

### Frontend web

- Angular
- appels API via contrats documentes

### Mobile

- React
- architecture orientee modules / fonctionnalites

### Data

- PostgreSQL
- migrations versionnees
- separation stricte par environnement

## Environnements

- `RCT`: recette et validation fonctionnelle
- `PPR`: pre-production proche de la production
- `PROD`: production

Principes:

- aucune base partagee entre environnements
- variables et secrets separes
- pipelines de promotion traces
- validation manuelle recommandee entre `PPR` et `PROD`

## Collaboration

- Jira pour backlog, epics, stories, bugs, sprints
- Confluence pour documentation produit, procedures et cadrage
- Git pour code, ADR, scripts et configuration versionnee

## Recommandations

- Garder des frontieres claires entre domaines
- Partager uniquement ce qui doit vraiment etre mutualise
- Versionner les contrats API et schemas
- Documenter les decisions dans `docs/adr/`
- Definir une strategie de migration de base de donnees des le debut
- Standardiser les conventions de nommage Jira, branches et releases

