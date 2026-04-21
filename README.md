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
|  |- web/        # Angular
|  |- mobile/     # React mobile
|  `- api/        # Java Spring Boot
|- packages/      # contrats, schemas, librairies partagees
|- infra/         # IaC, CI/CD, deploiement, observabilite, environnements
|- docs/          # architecture, ADR, securite, delivery
|- scripts/       # scripts d'automatisation
`- .github/       # templates et standards GitHub
```

## Stack retenue

- Backend: Java Spring Boot
- Frontend web: Angular
- Mobile: React
- Base de donnees: PostgreSQL
- Gestion agile: Jira
- Documentation: Confluence

## Environnements

- `RCT`: recette / validation fonctionnelle
- `PPR`: pre-production
- `PROD`: production

Chaque environnement doit avoir:

- sa configuration separee
- ses secrets separes
- sa base de donnees separee
- ses pipelines et controles de deploiement

## Standards Git proposes

- Mode de travail: Git Flow
- Branche production: `main`
- Branche integration: `develop`
- Branches de travail:
  - `feature/<scope>-<jira>-<short-name>`
  - `release/<version>`
  - `hotfix/<scope>-<jira>-<short-name>`
  - `support/<name>` si necessaire
- Commits: style Conventional Commits

Exemples:

- `feature/api-SCRUM-101-authentication`
- `feature/web-SCRUM-145-patient-dashboard`
- `release/0.1.0`
- `hotfix/api-SCRUM-220-login-failure`

## Demarrage

1. Lire [CONTRIBUTING.md](CONTRIBUTING.md)
2. Lire [docs/architecture/monorepo.md](docs/architecture/monorepo.md)
3. Lire [docs/security/README.md](docs/security/README.md)
4. Lire [docs/process/git-flow.md](docs/process/git-flow.md)

## Points d'attention produit medical

- Ne jamais committer de donnees patients ou de secrets.
- Journaliser de facon minimale et anonymisee.
- Introduire les controles de securite des la phase initiale.
- Maintenir une tracabilite des decisions d'architecture via les ADR.

## Prochaines etapes recommandees

- Scaffold des applications Angular, Spring Boot et mobile React
- Mettre en place CI/CD par environnement `RCT`, `PPR`, `PROD`
- Ajouter lint, tests, SAST, secret scanning, dependency scanning
- Configurer les protections de branches sur la forge

## Outils utiles

- Jira automation: [scripts/jira/README.md](scripts/jira/README.md)
- Git Flow helpers: [docs/process/git-flow.md](docs/process/git-flow.md)
- GitHub protection guide: [docs/process/github-protection.md](docs/process/github-protection.md)
