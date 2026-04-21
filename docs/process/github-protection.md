# GitHub Branch Protection

## Branches a proteger

- `main`
- `develop`

## Regles recommandees pour `main`

- Require a pull request before merging
- Require approvals: minimum 1
- Dismiss stale approvals when new commits are pushed
- Require status checks to pass before merging
- Required checks:
  - `Repository Standards`
  - `PowerShell Scripts`
  - `Branch Policy`
- Require conversation resolution before merging
- Require review from Code Owners
- Restrict direct pushes
- Allow only `release/*` and `hotfix/*` via pull request

## Regles recommandees pour `develop`

- Require a pull request before merging
- Require approvals: minimum 1
- Require status checks to pass before merging
- Required checks:
  - `Repository Standards`
  - `PowerShell Scripts`
  - `Branch Policy`
- Require conversation resolution before merging
- Require review from Code Owners
- Restrict direct pushes
- Allow only `feature/*`, `release/*`, `hotfix/*` via pull request

## Parametres utiles

- Merge strategy recommandee: squash ou merge commit standardise
- Auto-delete head branches apres merge
- Dependabot alerts activees
- Secret scanning active si disponible
- Code scanning active des que la stack est scaffolded

## Procedure GitHub

1. Ouvrir `Settings`
2. Aller dans `Branches`
3. Ajouter une branch protection rule pour `main`
4. Ajouter une branch protection rule pour `develop`
5. Cocher les regles ci-dessus

