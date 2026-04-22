param(
  [switch]$WhatIf
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-RequiredEnvVar {
  param([Parameter(Mandatory = $true)][string]$Name)

  $value = [Environment]::GetEnvironmentVariable($Name)
  if ([string]::IsNullOrWhiteSpace($value)) {
    throw "Missing environment variable: $Name"
  }

  return $value
}

function Get-JiraHeaders {
  $email = Get-RequiredEnvVar -Name "JIRA_EMAIL"
  $token = Get-RequiredEnvVar -Name "JIRA_API_TOKEN"
  $pair = "{0}:{1}" -f $email, $token
  $encoded = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($pair))

  return @{
    Authorization = "Basic $encoded"
    Accept = "application/json"
    "Content-Type" = "application/json"
  }
}

function Invoke-JiraGet {
  param([Parameter(Mandatory = $true)][string]$Path)

  $baseUrl = Get-RequiredEnvVar -Name "JIRA_BASE_URL"
  $uri = "{0}{1}" -f $baseUrl.TrimEnd("/"), $Path
  return Invoke-RestMethod -Method Get -Uri $uri -Headers (Get-JiraHeaders)
}

function Invoke-JiraPost {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][object]$Body
  )

  $baseUrl = Get-RequiredEnvVar -Name "JIRA_BASE_URL"
  $uri = "{0}{1}" -f $baseUrl.TrimEnd("/"), $Path
  $jsonBody = $Body | ConvertTo-Json -Depth 20
  return Invoke-RestMethod -Method Post -Uri $uri -Headers (Get-JiraHeaders) -Body $jsonBody
}

function Get-JiraProjectKey {
  return Get-RequiredEnvVar -Name "JIRA_PROJECT_KEY"
}

function ConvertTo-UrlEncoded {
  param([Parameter(Mandatory = $true)][string]$Value)
  return [System.Uri]::EscapeDataString($Value)
}

function Get-IssueTypeByNames {
  param([Parameter(Mandatory = $true)][string[]]$IssueTypeNames)

  $issueTypes = Invoke-JiraGet -Path "/rest/api/3/issuetype"

  foreach ($issueTypeName in $IssueTypeNames) {
    $issueType = $issueTypes | Where-Object { $_.name -eq $issueTypeName } | Select-Object -First 1
    if ($issueType) {
      return $issueType
    }
  }

  $availableTypes = ($issueTypes | Select-Object -ExpandProperty name) -join ", "
  throw "None of the expected issue types were found. Tried: $($IssueTypeNames -join ', '). Available types: $availableTypes"
}

function Find-IssueBySummaryAndType {
  param(
    [Parameter(Mandatory = $true)][string]$Summary,
    [Parameter(Mandatory = $true)][string]$IssueTypeName
  )

  $projectKey = Get-JiraProjectKey
  $escapedSummary = $Summary.Replace("\", "\\").Replace('"', '\"')
  $jql = 'project = "{0}" AND issuetype = "{1}" AND summary ~ "\"{2}\"" ORDER BY created DESC' -f $projectKey, $IssueTypeName, $escapedSummary
  $encodedJql = ConvertTo-UrlEncoded -Value $jql
  $result = Invoke-JiraGet -Path "/rest/api/3/search/jql?jql=$encodedJql&maxResults=10&fields=summary"

  $matches = @($result.issues | Where-Object { $_.fields.summary -eq $Summary })
  if ($matches.Count -eq 0) {
    return $null
  }

  return $matches[0]
}

function New-AdfParagraph {
  param([Parameter(Mandatory = $true)][string]$Text)

  return @{
    type = "paragraph"
    content = @(
      @{
        type = "text"
        text = $Text
      }
    )
  }
}

function New-IssuePayload {
  param(
    [Parameter(Mandatory = $true)][string]$Summary,
    [Parameter(Mandatory = $true)][string]$Description,
    [Parameter(Mandatory = $true)][string]$IssueTypeId,
    [string]$ParentKey
  )

  $fields = @{
    project = @{ key = (Get-JiraProjectKey) }
    summary = $Summary
    description = @{
      type = "doc"
      version = 1
      content = @(
        (New-AdfParagraph -Text $Description)
      )
    }
    issuetype = @{ id = $IssueTypeId }
  }

  if (-not [string]::IsNullOrWhiteSpace($ParentKey)) {
    $fields.parent = @{ key = $ParentKey }
  }

  return @{ fields = $fields }
}

$backlog = @(
  @{
    epic = "Architecture securisee de la plateforme mobile sante"
    description = "Concevoir l'architecture front-end, back-end, base de donnees et la separation des environnements avec un niveau de securite adapte aux donnees de sante."
    stories = @(
      @{
        summary = "Definir l'architecture cible front back base de donnees"
        description = "Formaliser l'architecture Angular, Spring Boot, PostgreSQL, mobile et les flux principaux."
        tasks = @(
          @{ summary = "Produire le schema d'architecture technique de reference"; description = "Documenter les composants et leurs interfaces." },
          @{ summary = "Definir les flux reseau entre mobile API base et services tiers"; description = "Preciser les ports, protocoles et zones de securite." }
        )
      },
      @{
        summary = "Definir la strategie de securite applicative et mobile"
        description = "Poser les principes de securite pour l'API, les tokens, le mobile et les donnees de sante."
        tasks = @(
          @{ summary = "Documenter les exigences JWT refresh token et logout"; description = "Aligner la strategie de session sur les besoins de securite." },
          @{ summary = "Definir les exigences OWASP mobile et API"; description = "Selectionner les controles prioritaires pour l'application." }
        )
      }
    )
  },
  @{
    epic = "Conception de la base de donnees medicale"
    description = "Modeliser les entites cles et la protection des donnees sensibles pour l'application de sante."
    stories = @(
      @{
        summary = "Modeliser patients medecins consultations et dossiers medicaux"
        description = "Concevoir le modele relationnel central du domaine medical."
        tasks = @(
          @{ summary = "Produire le MCD UML des entites medicales"; description = "Inclure patients, professionnels, rendez-vous, consultations et dossiers." },
          @{ summary = "Definir les relations et contraintes d'integrite"; description = "Precisier les cardinalites, cles et regles de reference." }
        )
      },
      @{
        summary = "Proteger les donnees medicales sensibles en base"
        description = "Definir les champs sensibles, les regles de chiffrement et la gouvernance d'acces."
        tasks = @(
          @{ summary = "Identifier les champs a chiffrer ou pseudonymiser"; description = "Lister les donnees sensibles au sens RGPD et metier." },
          @{ summary = "Definir la politique de retention et d'audit des donnees"; description = "Tracer les acces et definir les regles de conservation." }
        )
      }
    )
  },
  @{
    epic = "Developpement des modules principaux"
    description = "Mettre en oeuvre les modules coeur de l'application mobile de gestion d'etablissement de sante."
    stories = @(
      @{
        summary = "Developper la gestion des patients"
        description = "Permettre la creation, la consultation et la mise a jour des donnees patient."
        tasks = @(
          @{ summary = "Creer les endpoints backend de gestion patient"; description = "Prevoir CRUD, validation et securite." },
          @{ summary = "Concevoir les ecrans mobiles de gestion patient"; description = "Assurer une UX mobile first claire et securisee." }
        )
      },
      @{
        summary = "Developper la gestion des dossiers medicaux partages"
        description = "Permettre l'acces controle au dossier medical et son partage interne."
        tasks = @(
          @{ summary = "Definir les regles d'acces au dossier medical"; description = "Appliquer besoin d'en connaitre et tracabilite." },
          @{ summary = "Implementer la consultation et mise a jour du dossier"; description = "Gerer historique, pieces jointes et audit." }
        )
      },
      @{
        summary = "Developper la gestion des rendez-vous et preconsultations"
        description = "Couvrir choix du service, approbation, affectation et actes paramedicaux avant consultation."
        tasks = @(
          @{ summary = "Implementer le workflow de rendez-vous par service"; description = "Inclure demande, validation, planification et annulation." },
          @{ summary = "Implementer la check-list preconsultation"; description = "Tracer les actes realises avant le medecin." }
        )
      },
      @{
        summary = "Developper la gestion des utilisateurs et roles"
        description = "Gerber les comptes staff medical admin et patient avec droits differencies."
        tasks = @(
          @{ summary = "Definir les roles et permissions fines de la plateforme"; description = "Formaliser les habilitations par type d'utilisateur." },
          @{ summary = "Mettre en place l'administration des comptes"; description = "Prevoir creation, activation et revocation." }
        )
      }
    )
  },
  @{
    epic = "Securisation des donnees"
    description = "Mettre en place les mecanismes de securite essentiels sur les donnees, les acces et les journaux."
    stories = @(
      @{
        summary = "Implementer le hachage des mots de passe et la gestion des secrets"
        description = "Choisir les mecanismes de hachage et proteger les secrets applicatifs."
        tasks = @(
          @{ summary = "Valider la strategie de hachage des mots de passe"; description = "S'assurer de la conformite des parametres choisis." },
          @{ summary = "Externaliser les secrets par environnement"; description = "Sortir les secrets du code et definir leur rotation." }
        )
      },
      @{
        summary = "Implementer le chiffrement et le controle d'acces"
        description = "Chiffrer les donnees sensibles et securiser l'authentification et l'autorisation."
        tasks = @(
          @{ summary = "Mettre en oeuvre le chiffrement des donnees sensibles"; description = "Definir les champs et les mecanismes de chiffrement." },
          @{ summary = "Verrouiller l'authentification et les autorisations"; description = "Appliquer JWT, refresh token, logout et permissions." }
        )
      },
      @{
        summary = "Mettre en place la journalisation et la surveillance securite"
        description = "Tracer les acces, les echecs, les exports et les operations sensibles."
        tasks = @(
          @{ summary = "Definir les logs de securite obligatoires"; description = "Tracer les acces, erreurs et actions critiques." },
          @{ summary = "Mettre en place un suivi automatique des logs sensibles"; description = "Permettre audit et alerting securite." }
        )
      }
    )
  },
  @{
    epic = "Gestion des environnements et deploiement"
    description = "Mettre en place DEV, RCT, PPR, PROD ainsi que les pipelines CI/CD."
    stories = @(
      @{
        summary = "Structurer les environnements DEV RCT PPR PROD"
        description = "Definir la configuration, les secrets, les donnees et les acces pour chaque environnement."
        tasks = @(
          @{ summary = "Documenter la configuration cible par environnement"; description = "Lister variables, endpoints et dependances." },
          @{ summary = "Definir les jeux de donnees et regles de segregation"; description = "Garantir la separation des environnements." }
        )
      },
      @{
        summary = "Mettre en place les pipelines CI CD"
        description = "Automatiser build, tests, qualite et deploiement sur les environnements cibles."
        tasks = @(
          @{ summary = "Creer la pipeline CI de build et tests"; description = "Couvrir front, back et controles de qualite." },
          @{ summary = "Preparer les jobs de deploiement par environnement"; description = "Gerer promotion et validations de release." }
        )
      }
    )
  },
  @{
    epic = "Tests et validation"
    description = "Valider la conformite fonctionnelle, technique et securitaire du systeme."
    stories = @(
      @{
        summary = "Mettre en place les tests fonctionnels et techniques"
        description = "Structurer la strategie de tests unitaires, integration et bout en bout."
        tasks = @(
          @{ summary = "Definir la matrice de tests par module"; description = "Associer les cas de tests aux fonctionnalites." },
          @{ summary = "Automatiser les tests unitaires et d'integration"; description = "Couvrir les composants critiques." }
        )
      },
      @{
        summary = "Realiser les tests de securite et de conformite"
        description = "Verifier les acces, les logs, les exports et la resistance des controles."
        tasks = @(
          @{ summary = "Ecrire les scenarios de tests de securite"; description = "Inclure auth, permissions, logs et gestion des tokens." },
          @{ summary = "Verifier la conformite des flux de donnees"; description = "Controler les regles RGPD et traces d'audit." }
        )
      }
    )
  },
  @{
    epic = "Documentation et soutenance"
    description = "Documenter techniquement et fonctionnellement le systeme et preparer la presentation projet."
    stories = @(
      @{
        summary = "Rediger la documentation technique et fonctionnelle"
        description = "Formaliser architecture, API, modele de donnees, workflows et guides d'exploitation."
        tasks = @(
          @{ summary = "Produire les documents UML et architecture"; description = "Documenter les vues fonctionnelles et techniques." },
          @{ summary = "Rassembler la documentation utilisateur et exploitation"; description = "Preparer les supports pour l'equipe et la soutenance." }
        )
      },
      @{
        summary = "Preparer la soutenance du projet"
        description = "Construire un support clair de presentation technique et metier."
        tasks = @(
          @{ summary = "Structurer le plan de soutenance"; description = "Mettre en avant objectifs, architecture, securite et demarche." },
          @{ summary = "Preparer la demonstration des modules clefs"; description = "Montrer la valeur du parcours patient et staff." }
        )
      }
    )
  },
  @{
    epic = "n8n data orchestration"
    description = "Automatiser l'integration et le rafraichissement des donnees medicales via n8n."
    stories = @(
      @{
        summary = "Mettre en place la chaine hebdomadaire de rafraichissement des donnees medicales"
        description = "Concevoir le pipeline n8n d'extraction, nettoyage et alimentation des donnees."
        tasks = @(
          @{ summary = "Configurer l'extraction des donnees depuis PostgreSQL"; description = "Definir sources, frequence et controles." },
          @{ summary = "Construire le pipeline de nettoyage et alimentation datamart"; description = "Transformer puis exposer les indicateurs." }
        )
      },
      @{
        summary = "Anonymiser partiellement les donnees pour PREPROD"
        description = "Preparer des jeux de donnees exploitables sans exposition excessive des donnees de sante."
        tasks = @(
          @{ summary = "Definir les regles d'anonymisation et pseudonymisation"; description = "Preciser les champs et niveaux de masquage." },
          @{ summary = "Automatiser la generation d'indicateurs hebdomadaires"; description = "Produire des indicateurs alimentés par n8n." }
        )
      }
    )
  },
  @{
    epic = "n8n gestion documentaire intelligente"
    description = "Automatiser le cycle de vie des documents medicaux via n8n."
    stories = @(
      @{
        summary = "Automatiser le workflow d'upload et validation des documents medicaux"
        description = "Prendre en charge verification de format, hash, classement et historisation."
        tasks = @(
          @{ summary = "Verifier automatiquement le format et le hash des documents"; description = "Controler integrite et conformite du fichier." },
          @{ summary = "Mettre en place le classement et l'historisation des documents"; description = "Conserver les versions et le rangement metier." }
        )
      },
      @{
        summary = "Alerter sur les documents medicaux manquants"
        description = "Declencher des alertes n8n quand un document attendu est absent ou incomplet."
        tasks = @(
          @{ summary = "Definir les regles de completude documentaire"; description = "Identifier les pieces attendues par workflow." },
          @{ summary = "Mettre en oeuvre les notifications de relance"; description = "Alerter les equipes concernées en cas de manquant." }
        )
      }
    )
  },
  @{
    epic = "n8n supervision et conformite"
    description = "Automatiser les controles de conformite et la supervision des flux de donnees."
    stories = @(
      @{
        summary = "Automatiser le controle des acces et des exports de donnees"
        description = "Suivre les acces, les logs d'echec, les sauvegardes et les exports sensibles."
        tasks = @(
          @{ summary = "Mettre en place le suivi des echecs d'acces et sauvegardes"; description = "Centraliser les evenements critiques dans n8n." },
          @{ summary = "Automatiser l'audit des exports de donnees"; description = "Tracer les exports et lever des alertes si besoin." }
        )
      },
      @{
        summary = "Encadrer l'usage de n8n dans un contexte medical"
        description = "Poser les limites et controles de n8n vis-a-vis du backend et des donnees de sante."
        tasks = @(
          @{ summary = "Documenter les limites de n8n face aux regles metier sensibles"; description = "Rappeler que n8n ne remplace pas le backend Spring." },
          @{ summary = "Definir la securite self hosted et la gestion de la cle d'encryption"; description = "Encadrer les environnements et les credentials n8n." }
        )
      }
    )
  }
)

$epicType = Get-IssueTypeByNames -IssueTypeNames @("Epic")
$storyType = Get-IssueTypeByNames -IssueTypeNames @("Story")
$childType = Get-IssueTypeByNames -IssueTypeNames @("Subtask", "Sous-tâche", "Sous-tache")

foreach ($epic in $backlog) {
  $epicIssue = Find-IssueBySummaryAndType -Summary $epic.epic -IssueTypeName "Epic"

  if (-not $epicIssue) {
    if ($WhatIf) {
      Write-Host ("[WhatIf] Would create Epic: {0}" -f $epic.epic) -ForegroundColor Yellow
      $epicKey = "EPIC-PREVIEW"
    } else {
      $epicPayload = New-IssuePayload -Summary $epic.epic -Description $epic.description -IssueTypeId $epicType.id
      $epicIssue = Invoke-JiraPost -Path "/rest/api/3/issue" -Body $epicPayload
      Write-Host ("Created Epic: {0} -> {1}" -f $epic.epic, $epicIssue.key) -ForegroundColor Green
      $epicKey = $epicIssue.key
    }
  } else {
    Write-Host ("Skipping Epic already present: {0} -> {1}" -f $epic.epic, $epicIssue.key) -ForegroundColor DarkYellow
    $epicKey = $epicIssue.key
  }

  foreach ($story in $epic.stories) {
    $storyIssue = Find-IssueBySummaryAndType -Summary $story.summary -IssueTypeName "Story"

    if (-not $storyIssue) {
      if ($WhatIf) {
        Write-Host ("[WhatIf] Would create Story: {0}" -f $story.summary) -ForegroundColor Yellow
        $storyKey = "STORY-PREVIEW"
      } else {
        $storyPayload = New-IssuePayload -Summary $story.summary -Description $story.description -IssueTypeId $storyType.id -ParentKey $epicKey
        $storyIssue = Invoke-JiraPost -Path "/rest/api/3/issue" -Body $storyPayload
        Write-Host ("Created Story: {0} -> {1}" -f $story.summary, $storyIssue.key) -ForegroundColor Green
        $storyKey = $storyIssue.key
      }
    } else {
      Write-Host ("Skipping Story already present: {0} -> {1}" -f $story.summary, $storyIssue.key) -ForegroundColor DarkYellow
      $storyKey = $storyIssue.key
    }

    foreach ($task in $story.tasks) {
      $taskIssue = Find-IssueBySummaryAndType -Summary $task.summary -IssueTypeName $childType.name
      if ($taskIssue) {
        Write-Host ("Skipping Ticket already present: {0} -> {1}" -f $task.summary, $taskIssue.key) -ForegroundColor DarkYellow
        continue
      }

      if ($WhatIf) {
        Write-Host ("[WhatIf] Would create Ticket: {0}" -f $task.summary) -ForegroundColor Yellow
        continue
      }

      $taskPayload = New-IssuePayload -Summary $task.summary -Description $task.description -IssueTypeId $childType.id -ParentKey $storyKey
      $taskIssue = Invoke-JiraPost -Path "/rest/api/3/issue" -Body $taskPayload
      Write-Host ("Created Ticket: {0} -> {1}" -f $task.summary, $taskIssue.key) -ForegroundColor Green
    }
  }
}
