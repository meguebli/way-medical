# Jira Backlog Health App

## Epic 1

### Architecture securisee de la plateforme mobile sante

#### Stories

- Definir l'architecture cible front back base de donnees
- Definir la strategie de securite applicative et mobile

#### Tickets

- Produire le schema d'architecture technique de reference
- Definir les flux reseau entre mobile API base et services tiers
- Documenter les exigences JWT refresh token et logout
- Definir les exigences OWASP mobile et API

## Epic 2

### Conception de la base de donnees medicale

#### Stories

- Modeliser patients medecins consultations et dossiers medicaux
- Proteger les donnees medicales sensibles en base

#### Tickets

- Produire le MCD UML des entites medicales
- Definir les relations et contraintes d'integrite
- Identifier les champs a chiffrer ou pseudonymiser
- Definir la politique de retention et d'audit des donnees

## Epic 3

### Developpement des modules principaux

#### Stories

- Developper la gestion des patients
- Developper la gestion des dossiers medicaux partages
- Developper la gestion des rendez-vous et preconsultations
- Developper la gestion des utilisateurs et roles

#### Tickets

- Creer les endpoints backend de gestion patient
- Concevoir les ecrans mobiles de gestion patient
- Definir les regles d'acces au dossier medical
- Implementer la consultation et mise a jour du dossier
- Implementer le workflow de rendez-vous par service
- Implementer la check-list preconsultation
- Definir les roles et permissions fines de la plateforme
- Mettre en place l'administration des comptes

## Epic 4

### Securisation des donnees

#### Stories

- Implementer le hachage des mots de passe et la gestion des secrets
- Implementer le chiffrement et le controle d'acces
- Mettre en place la journalisation et la surveillance securite

#### Tickets

- Valider la strategie de hachage des mots de passe
- Externaliser les secrets par environnement
- Mettre en oeuvre le chiffrement des donnees sensibles
- Verrouiller l'authentification et les autorisations
- Definir les logs de securite obligatoires
- Mettre en place un suivi automatique des logs sensibles

## Epic 5

### Gestion des environnements et deploiement

#### Stories

- Structurer les environnements DEV RCT PPR PROD
- Mettre en place les pipelines CI CD

#### Tickets

- Documenter la configuration cible par environnement
- Definir les jeux de donnees et regles de segregation
- Creer la pipeline CI de build et tests
- Preparer les jobs de deploiement par environnement

## Epic 6

### Tests et validation

#### Stories

- Mettre en place les tests fonctionnels et techniques
- Realiser les tests de securite et de conformite

#### Tickets

- Definir la matrice de tests par module
- Automatiser les tests unitaires et d'integration
- Ecrire les scenarios de tests de securite
- Verifier la conformite des flux de donnees

## Epic 7

### Documentation et soutenance

#### Stories

- Rediger la documentation technique et fonctionnelle
- Preparer la soutenance du projet

#### Tickets

- Produire les documents UML et architecture
- Rassembler la documentation utilisateur et exploitation
- Structurer le plan de soutenance
- Preparer la demonstration des modules clefs

## Epic 8

### n8n data orchestration

#### Stories

- Mettre en place la chaine hebdomadaire de rafraichissement des donnees medicales
- Anonymiser partiellement les donnees pour PREPROD

#### Tickets

- Configurer l'extraction des donnees depuis PostgreSQL
- Construire le pipeline de nettoyage et alimentation datamart
- Definir les regles d'anonymisation et pseudonymisation
- Automatiser la generation d'indicateurs hebdomadaires

## Epic 9

### n8n gestion documentaire intelligente

#### Stories

- Automatiser le workflow d'upload et validation des documents medicaux
- Alerter sur les documents medicaux manquants

#### Tickets

- Verifier automatiquement le format et le hash des documents
- Mettre en place le classement et l'historisation des documents
- Definir les regles de completude documentaire
- Mettre en oeuvre les notifications de relance

## Epic 10

### n8n supervision et conformite

#### Stories

- Automatiser le controle des acces et des exports de donnees
- Encadrer l'usage de n8n dans un contexte medical

#### Tickets

- Mettre en place le suivi des echecs d'acces et sauvegardes
- Automatiser l'audit des exports de donnees
- Documenter les limites de n8n face aux regles metier sensibles
- Definir la securite self hosted et la gestion de la cle d'encryption
