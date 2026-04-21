# WAY-MEDICAL

Base de monorepo pour une plateforme web/mobile medicale avec front-end, back-end et DevOps.

## Objectifs

- Structurer le projet pour une equipe pluridisciplinaire.
- Poser des standards Git et de collaboration des le debut.
- Faciliter la montee en qualite, la securite et la conformite.

## Structure

```text
WAY-MEDICAL/
|- apps/
|  |- web/        # application web
|  |- mobile/     # application mobile
|  `- api/        # API / backend
|- packages/      # bibliotheques partagees
|- infra/         # IaC, CI/CD, deploiement, observabilite
|- docs/          # architecture, ADR, securite, procedures
|- scripts/       # scripts d'automatisation
`- .github/       # templates et standards GitHub
```

## Standards Git proposes

- Branche principale: `main`
- Branches de travail:
  - `feat/<scope>-<short-name>`
  - `fix/<scope>-<short-name>`
  - `chore/<scope>-<short-name>`
  - `docs/<scope>-<short-name>`
  - `hotfix/<scope>-<short-name>`
- Commits: style Conventional Commits

Exemples:

- `feat(api): add patient authentication endpoint`
- `fix(web): prevent session timeout loop`
- `docs(repo): add contribution guidelines`

## Demarrage

1. Lire [CONTRIBUTING.md](CONTRIBUTING.md)
2. Lire [docs/architecture/monorepo.md](docs/architecture/monorepo.md)
3. Lire [docs/security/README.md](docs/security/README.md)

## Points d'attention produit medical

- Ne jamais committer de donnees patients ou de secrets.
- Journaliser de facon minimale et anonymisee.
- Introduire les controles de securite des la phase initiale.
- Maintenir une tracabilite des decisions d'architecture via les ADR.

## Prochaines etapes recommandees

- Choisir la stack technique cible:
  - Web: React / Next.js ou autre
  - Mobile: React Native / Flutter / natif
  - API: Node.js / NestJS / FastAPI / autre
- Mettre en place CI/CD
- Ajouter lint, tests, SAST, secret scanning, dependency scanning
- Configurer les protections de branches sur la forge

