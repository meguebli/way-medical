# Monorepo Architecture

## Pourquoi un monorepo

- Vision unique du produit
- Partage de composants et contrats
- Standards uniformes
- Simplification de la CI/CD

## Repartition

- `apps/web`: interface web
- `apps/mobile`: application mobile
- `apps/api`: services backend et API
- `packages/`: types, SDK, design system, utilitaires partages
- `infra/`: deploiement, environnements, observabilite, IaC

## Recommandations

- Garder des frontieres claires entre domaines
- Partager uniquement ce qui doit vraiment etre mutualise
- Versionner les contrats API et schemas
- Documenter les decisions dans `docs/adr/`

