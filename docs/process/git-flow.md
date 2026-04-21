# Git Flow

## Branches de reference

- `main`: code en production
- `develop`: branche d'integration

## Branches de travail

- `feature/*`: nouvelles fonctionnalites
- `release/*`: preparation de release
- `hotfix/*`: correction urgente en production

## Regles

- Une `feature/*` part de `develop` et revient dans `develop`
- Une `release/*` part de `develop` puis revient dans `main` et `develop`
- Une `hotfix/*` part de `main` puis revient dans `main` et `develop`

## Nommage

```text
feature/<scope>-<jira>-<short-name>
release/<version>
hotfix/<scope>-<jira>-<short-name>
```

Exemples:

- `feature/api-SCRUM-101-authentication`
- `feature/mobile-SCRUM-102-session-storage`
- `release/0.1.0`
- `hotfix/web-SCRUM-220-fix-login`

## Commandes de base

Creer une feature:

```powershell
git checkout develop
git pull
git checkout -b feature/api-SCRUM-101-authentication
```

Creer une release:

```powershell
git checkout develop
git pull
git checkout -b release/0.1.0
```

Creer un hotfix:

```powershell
git checkout main
git pull
git checkout -b hotfix/api-SCRUM-220-fix-login
```

## Merge recommande

- `feature/*` -> `develop`
- `release/*` -> `main`, puis retour vers `develop`
- `hotfix/*` -> `main`, puis retour vers `develop`

## Politique equipe

- Pas de commit direct sur `main`
- Pas de commit direct sur `develop`
- PR obligatoire
- Ticket Jira obligatoire dans le nom de branche
- Tag Git pour chaque release production

