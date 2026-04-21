# Jira PowerShell Scripts

Scripts PowerShell pour automatiser la creation d'elements Jira depuis le repository.

## Variables d'environnement requises

```powershell
$env:JIRA_BASE_URL="https://wayupit-med3.atlassian.net"
$env:JIRA_PROJECT_KEY="SCRUM"
$env:JIRA_BOARD_ID="1"
$env:JIRA_EMAIL="contact@wayupit.fr"
$env:JIRA_API_TOKEN="your_token"
```

## Option recommandee avec `.env`

1. Copier [.env.example](C:/Users/amegg/Desktop/WAY-MEDICAL/.env.example) vers `.env`
2. Remplacer les valeurs par les votres
3. Charger le fichier avant execution

```powershell
Copy-Item .env.example .env
.\scripts\jira\load-env.ps1
```

## Script disponible

### Creer les epics initiaux

Simulation:

```powershell
.\scripts\jira\load-env.ps1
.\scripts\jira\create-epics.ps1 -WhatIf
```

Execution:

```powershell
.\scripts\jira\load-env.ps1
.\scripts\jira\create-epics.ps1
```

### Creer les stories initiales

Simulation:

```powershell
.\scripts\jira\load-env.ps1
.\scripts\jira\create-stories.ps1 -WhatIf
```

Execution:

```powershell
.\scripts\jira\load-env.ps1
.\scripts\jira\create-stories.ps1
```

### Creer les tasks initiales

Note:
Le script cree des sous-taches sous les Stories, car votre projet Jira expose un type enfant `Subtask` et non un type parent `Task`.

Simulation:

```powershell
.\scripts\jira\load-env.ps1
.\scripts\jira\create-tasks.ps1 -WhatIf
```

Execution:

```powershell
.\scripts\jira\load-env.ps1
.\scripts\jira\create-tasks.ps1
```

### Creer Sprint 0

Simulation:

```powershell
.\scripts\jira\load-env.ps1
.\scripts\jira\create-sprint0.ps1 -WhatIf
```

Ou avec board explicite:

```powershell
.\scripts\jira\create-sprint0.ps1 -BoardId 1 -WhatIf
```

Execution:

```powershell
.\scripts\jira\load-env.ps1
.\scripts\jira\create-sprint0.ps1
```

Execution avec affectation de tickets:

```powershell
.\scripts\jira\load-env.ps1
.\scripts\jira\create-sprint0.ps1 -IssueKeys SCRUM-12,SCRUM-13,SCRUM-14
```

## Epics par defaut

- Backend Spring Boot
- Frontend Angular
- Mobile React
- Database PostgreSQL
- Data Platform and Governance
- DevOps Platform
- n8n Orchestrator
- Security and Compliance
- Product and Functional Setup

## Securite

- Ne pas committer les tokens Jira
- Utiliser un token dedie a l'automatisation
- Revoquer et regenerer un token expose par erreur
