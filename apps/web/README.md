# Web

Frontend web en Angular.

## Stack frontend

- Angular standalone
- Angular Material
- Http interceptor pour token Bearer
- refresh token et logout branches au backend
- Change detection `OnPush`
- lazy loading par route
- Karma / Jasmine pour tests unitaires

## Structure livree

- `core/`: config, services, interceptor
- `features/auth/`: login branche au backend JWT
- `features/dashboard/`: premiere feature standalone
- `app.config.ts`: providers Angular globaux
- `app.routes.ts`: routing lazy

## Points performance

- composants standalone
- `OnPush` par defaut sur les composants livrés
- lazy loading de la feature dashboard
- budgets Angular dans `angular.json`

## Tests

- test service token
- test interceptor token
- test service auth backend
- test composant login
- test composant dashboard

## Demarrage theorique

Quand les dependances npm seront installees:

```powershell
cd apps/web
npm install
npm start
```
