# WAY Medical — Login Interfaces Documentation

## Overview

Complete role-based login system with dedicated interfaces for three user tiers:
- **Patient** — Access medical records, appointments, prescriptions
- **Médecin / Staff** — Manage consultations, schedule, and patient care
- **Administration** — Full system management, billing, user control

---

## Architecture

### 2-Step Login Flow

```
┌─────────────────────────────────┐
│    Step 1: Tier Selection       │
│  (Patient / Doctor / Admin)     │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│    Step 2: Login Form           │
│  (Email + Password)             │
│  + Test Credentials Display     │
│  + Quick Access Demo Button     │
└──────────────┬──────────────────┘
               │
               ▼
        ┌──────────────┐
        │ Authenticated│
        │   (Home)     │
        └──────────────┘
```

---

## UI Components

### Logo & Header
- **Icon**: Gradient blue badge with "he" initials
- **Brand**: "WAY Medical" with "Healthcare Platform" subtext
- **Position**: Top-center, above tier selection

### Step 1: Tier Selection

**Layout**: 3-column responsive grid of cards

#### Patient Card
- **Icon**: Person icon in primary blue background
- **Title**: "Patient"
- **Description**: "Accédez à votre dossier médical, RDV et résultats"
- **Color Scheme**: `--wm-primary-light` + `--wm-primary-strong`
- **Hover State**: Border color changes to primary, lift animation (+2px translateY)

#### Doctor / Staff Card
- **Icon**: Medical services icon in teal background
- **Title**: "Médecin / Staff"
- **Description**: "Gérez vos consultations et votre planning"
- **Color Scheme**: `--wm-teal-light` + `--wm-teal-dark`
- **Hover State**: Same as above

#### Admin Card
- **Icon**: Admin panel icon in violet background
- **Title**: "Administration"
- **Description**: "Gérez établissements, utilisateurs et facturation"
- **Color Scheme**: `--wm-violet-light` + `--wm-violet`
- **Hover State**: Same as above

**Interactions**:
- Clicking any card transitions to login form
- Arrow icon appears on hover
- Smooth slide-up animation (300ms)

---

### Step 2: Login Form

#### Header Section
- **Back Button**: Chevron + "Retour" link
- **Title**: Dynamic based on selected tier ("Patient", "Médecin / Staff", "Administration")
- **Subtitle**: "Connectez-vous avec vos identifiants"

#### Form Fields

**Email Field**
- Label: "EMAIL" (uppercase, 600 weight)
- Placeholder: "votre@email.com"
- Validation: Required + valid email format
- Focus State: Blue border + 3px blue shadow (0 0 0 3px rgba(0, 92, 187, 0.12))
- Error State: Red border + red shadow
- Error Message: "Email valide requis"

**Password Field**
- Label: "MOT DE PASSE" (uppercase, 600 weight)
- Placeholder: "••••••••"
- Validation: Required + min 8 characters
- Toggle Icon: Eye icon (right-aligned, changes on click)
- Focus State: Blue border + blue shadow
- Error State: Red border + red shadow
- Error Message: "Mot de passe requis"

#### Credentials Info Box

**Dynamic styling by tier**:
- **Patient**: `var(--wm-primary-light)` background, `--wm-primary-strong` text
- **Doctor**: `var(--wm-teal-light)` background, `--wm-teal-dark` text
- **Admin**: `var(--wm-violet-light)` background, `--wm-violet` text

**Content**:
```
IDENTIFIANTS DE TEST
Email:     marie.dupont@mail.fr  (or doctor/admin equivalent)
Mdp:       ChangeMe123!
```

#### Error Banner
- **Visibility**: Only shown when `errorMessage()` is set
- **Content**: Error icon + message text
- **Color**: Danger red (`--wm-danger` text, `--wm-danger-light` background)
- **Message Examples**:
  - "Connexion échouée. Vérifiez vos identifiants ou l'état du serveur."

#### Submit Button
- **Label**: "Se connecter" (or "Connexion en cours..." when loading)
- **Style**: Primary raised button with icon
- **Icon**: Login icon (left-aligned)
- **State**: Disabled when form invalid or loading
- **Disabled Opacity**: 0.6

#### Form Divider
- **Text**: "ou" (centered)
- **Visual**: Horizontal lines on left/right of text

#### Demo Access Section
- **Label**: "ACCÈS DÉMO RAPIDE" (uppercase, muted text)
- **Button**: Stroked button with play icon
- **Action**: Auto-fills test credentials and submits form
- **State**: Disabled when loading

---

## Test Credentials

### Patient Login
```
Email:    marie.dupont@mail.fr
Password: ChangeMe123!
Role:     PATIENT
```

### Doctor / Staff Login
```
Email:    e.fontaine@clinic.fr
Password: ChangeMe123!
Role:     DOCTOR or STAFF
```

### Admin Login
```
Email:    c.dupuis@clinic.fr
Password: ChangeMe123!
Role:     ADMIN
```

---

## Design System Integration

### Colors Used
- **Primary Blue**: Logo, form focus, Patient card
- **Teal**: Doctor card, focus states
- **Violet**: Admin card
- **Green**: Success states
- **Red**: Errors and danger
- **Grays**: Borders, text hierarchy, backgrounds

### Typography
- **Logo**: 24px, weight 800, letter-spacing -0.02em
- **Headings (h1)**: 28px, weight 800
- **Labels**: `--fs-sm` (13px), weight 600, uppercase
- **Input Text**: `--fs-sm`, regular weight
- **Helper Text**: `--fs-xs` (11px), muted color
- **Error Text**: `--fs-xs`, danger color, weight 500

### Spacing
- **Page Padding**: 20px on all sides
- **Panel Padding**: 40px
- **Form Gap**: 20px between fields
- **Logo Bottom Margin**: 40px
- **Header Bottom Margin**: 24px

### Shadows
- **Panel**: `0 24px 48px rgba(31, 57, 88, 0.12)`
- **Hover Cards**: `0 8px 24px rgba(0, 92, 187, 0.12)`
- **Focus Inputs**: `0 0 0 3px rgba(0, 92, 187, 0.12)` (or red for errors)

### Border Radius
- **Panel**: 20px (`--r-xl` is 18px, slightly larger)
- **Input**: `--r-md` (10px)
- **Credentials Box**: 10px
- **Tier Cards**: 16px

### Animations
- **Slide In**: 300ms ease-out from bottom (`translateY(20px)`)
- **Hover**: 180ms ease for all interactive elements
- **Focus**: 180ms border-color, box-shadow transitions

---

## User Flows

### Flow 1: Known User (Direct Login)
1. **Land on login page**
2. **Click tier card** (Patient/Doctor/Admin)
3. **Form pre-fills with test credentials**
4. **Click "Se connecter"** or "Accès rapide"
5. **Redirect to dashboard** (role-based)

### Flow 2: New User (Manual Entry)
1. **Land on login page**
2. **Click tier card**
3. **Clear auto-filled credentials**
4. **Enter own email + password**
5. **Click "Se connecter"**
6. **Validation error if invalid**
7. **Success → redirect to dashboard**

### Flow 3: Back to Tier Selection
1. **On login form page**
2. **Click "Retour" button**
3. **Return to tier selection**
4. **Form resets**
5. **Can select different tier**

---

## State Management

### Signals
```typescript
currentStep: signal<'tier-select' | 'login'> = 'tier-select'
selectedTier: signal<UserTier | null> = null
isLoading: signal<boolean> = false
errorMessage: signal<string> = ''
showPassword: signal<boolean> = false
```

### Form Group
```typescript
FormGroup {
  email:    ['', [required, email]]
  password: ['', [required, minLength(8)]]
}
```

---

## Accessibility & UX

### Keyboard Navigation
- Tab order: Tier cards → Back button → Form fields → Submit button
- Enter key submits form
- Escape key (optional) goes back

### Error Handling
- **Field-level validation**: Shows message below field
- **Form-level errors**: Banner at top of form
- **Network errors**: Generic message (no server details exposed)
- **Loading state**: Button shows "Connexion en cours..."

### Password Field UX
- Toggle button to show/hide password
- Clear placeholder text for accessibility
- Icon changes on toggle (visibility/visibility_off)

### Responsive Design
- **Desktop**: 3-column tier grid, 520px max-width login panel
- **Tablet**: Responsive tier grid (auto-fit with 160px min)
- **Mobile**: Single column, full width with padding

---

## Security Features

### Frontend
- Password field is masked by default
- Toggle to show password for verification
- Form validation prevents submission of invalid data
- Error messages generic (no user enumeration)

### Backend Integration
- JWT token stored on successful login
- `AuthApiService.login()` handles credentials
- Token decoded for role-based navigation
- Automatic redirect to role-specific dashboard

---

## Future Enhancements

- [ ] "Forgot Password" link
- [ ] Social login (SSO)
- [ ] Multi-factor authentication (MFA)
- [ ] Remember me checkbox
- [ ] Account creation flow
- [ ] Terms & Privacy links
- [ ] Language selector (FR/EN)
- [ ] Accessibility improvements (ARIA labels)
- [ ] Password strength meter
- [ ] Email verification flow

---

## Component Integration

### Imports
```typescript
import { NgFor, NgIf }
import { ReactiveFormsModule }
import { MatButtonModule }
import { MatIconModule }
```

### Service Dependencies
```typescript
AuthApiService.login(credentials)  // POST /login
Router.navigate(['/'])             // Redirect on success
```

### Routes
```typescript
'/login' → LoginComponent
'/' (with authGuard) → MainLayoutComponent (role-based redirect)
```

---

## Files Modified

- **`src/app/features/auth/login.component.ts`** — Complete redesign with 2-step flow and role-based credentials

---

## Styling Notes

- All colors use CSS custom properties (`--wm-*` tokens)
- No external CSS libraries required
- Responsive grid uses `repeat(auto-fit, minmax(160px, 1fr))`
- Smooth animations with `cubic-bezier(0.4, 0, 0.2, 1)`
- Box shadows match design system (`--sh-lg` pattern)
- Border styling uses `1.5px` for input focus rings (2px shadow)

