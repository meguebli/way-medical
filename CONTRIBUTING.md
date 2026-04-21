# Contributing

## Principes

- Une branche par sujet.
- Une pull request claire, relisible et testable.
- Pas de commit direct sur `main` hors urgence et processus valide.
- Pas de commit direct sur `develop` hors maintenance encadree.
- Toute decision structurante doit etre documentee.

## Workflow Git Flow

1. `main` represente la production
2. `develop` represente l'integration continue
3. Les `feature/*` partent de `develop`
4. Les `release/*` partent de `develop`
5. Les `hotfix/*` partent de `main`
6. Toute integration se fait par pull request et revue

Scopes recommandes:

- `api`
- `web`
- `mobile`
- `db`
- `infra`
- `docs`
- `security`

Conventions de branche:

- `feature/<scope>-<jira>-<short-name>`
- `release/<version>`
- `hotfix/<scope>-<jira>-<short-name>`

Exemples:

- `feature/api-SCRUM-101-authentication`
- `feature/web-SCRUM-145-login-screen`
- `hotfix/api-SCRUM-220-token-expiration`
- `release/0.1.0`

## Convention de commit

Format:

```text
type(scope): short description
```

Types conseilles:

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `chore`
- `build`
- `ci`
- `perf`
- `security`

## Pull Request

Une PR doit idealement:

- decrire le besoin
- mentionner le ticket Jira
- lister les changements
- indiquer les risques
- expliquer comment tester
- mentionner les impacts securite / donnees

## Revue de code

Verifier au minimum:

- lisibilite
- comportement fonctionnel
- securite
- tests
- impacts observabilite / logs
- absence de secrets et donnees sensibles

## Jira et Confluence

- Toute fonctionnalite ou correction doit etre rattachee a un ticket Jira
- Les decisions d'architecture et procedures d'exploitation doivent etre documentees dans Confluence
- Les ADR du repo restent la reference technique versionnee

Convention conseillee pour les branches feature:

```text
feature/api-SCRUM-123-authentication
feature/web-SCRUM-456-login-timeout
```

## Branch protection recommandees

- Protection forte sur `main`
- Protection sur `develop`
- Merge uniquement via PR
- Au moins 1 reviewer obligatoire
- Checks CI obligatoires avant merge
- Historique lineaire ou merge strategy standardisee
