# Contributing

## Principes

- Une branche par sujet.
- Une pull request claire, relisible et testable.
- Pas de commit direct sur `main` hors urgence et processus valide.
- Toute decision structurante doit etre documentee.

## Workflow Git

1. Creer une branche depuis `main`
2. Nommer la branche selon la convention:
   - `feat/<scope>-<short-name>`
   - `fix/<scope>-<short-name>`
   - `chore/<scope>-<short-name>`
   - `docs/<scope>-<short-name>`
3. Commiter avec des messages explicites
4. Ouvrir une PR
5. Faire relire avant merge

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

