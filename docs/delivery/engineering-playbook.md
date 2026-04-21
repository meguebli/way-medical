# Engineering Playbook

## Outils de delivery

- Jira pour le suivi agile
- Confluence pour la documentation transverse
- Git pour le code source et la tracabilite technique

## Organisation recommandee dans Jira

- Epic pour les grands domaines produit
- Story pour la valeur fonctionnelle
- Task pour l'implementation technique
- Bug pour les anomalies
- Spike pour l'investigation

## Definition of Ready

Une story est prete si:

- le besoin est compris
- les criteres d'acceptation sont definis
- les impacts securite et data sont identifies
- les dependances sont connues

## Definition of Done

Une story est terminee si:

- code merge via PR
- ticket Jira mis a jour
- tests executes
- documentation Confluence ou repo mise a jour si necessaire
- aucun secret ni donnee sensible ajoutes

## Release flow recommande

1. Developpement et integration continue
2. Deploiement sur `RCT`
3. Validation metier et technique
4. Promotion vers `PPR`
5. Go/no-go
6. Promotion vers `PROD`

