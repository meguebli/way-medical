# Environments

## Cibles

- `RCT`
- `PPR`
- `PROD`

## Regles communes

- Une configuration par environnement
- Une base PostgreSQL par environnement
- Des credentials differents par environnement
- Journalisation et monitoring actifs sur tous les environnements

## RCT

- cible de recette
- tests d'integration et validation fonctionnelle
- donnees de test anonymisees ou synthetiques

## PPR

- environnement miroir de la production autant que possible
- validation finale avant mise en production
- jeux de donnees controles

## PROD

- acces restreints
- changement via processus valide
- supervision, sauvegarde et rollback obligatoires

