# WAY Medical — Figma Workflow Complet Step-by-Step

## ⏱️ Durée totale: 30-35 heures
**Recommandé**: 3-4 jours intensifs ou 1-2 semaines régulières

---

# STEP 1: SETUP FIGMA (30 minutes)

## 1.1 Créer le File

```
1. Aller sur figma.com
2. Cliquer "Create new file" → "Design file"
3. Nommer: "WAY Medical - Design System"
4. Cliquer "Create"
```

## 1.2 Enable Sharing

```
Menu → Share
├─ Inviter team members (optional)
├─ Can edit / Can view roles
└─ Copier le link pour collaboration
```

## 1.3 Setup Workspace

```
Préférences → Settings
├─ Default units: pixels (px)
├─ Enable multiplayer cursors: ON
├─ Auto save: ON
└─ Show pixel values: ON
```

---

# STEP 2: CRÉER DESIGN TOKENS (1.5 heures)

## 2.1 Setup Color Variables

```
Menu → Windows → Variables

Click "Create new collection"
Name: "Colors"

Créer Groups:
├─ primary
│   ├─ primary-strong: #003d7a
│   ├─ primary: #005cbb
│   ├─ primary-mid: #1a6fcc
│   ├─ primary-light: #e8f0fb
│   └─ primary-subtle: #f0f5ff
│
├─ teal
│   ├─ teal-dark: #0369a1
│   ├─ teal: #0284c7
│   └─ teal-light: #e0f2fe
│
├─ semantic
│   ├─ success: #15803d
│   ├─ success-light: #dcfce7
│   ├─ warning: #d97706
│   ├─ warning-light: #fef3c7
│   ├─ danger: #dc2626
│   ├─ danger-light: #fee2e2
│   └─ violet: #6d28d9
│
└─ neutral
    ├─ text-strong: #07101f
    ├─ text: #0f1f35
    ├─ text-secondary: #334155
    ├─ muted: #536580
    ├─ muted-light: #8fa3bc
    ├─ border: #d1dbe8
    ├─ border-light: #e4ecf5
    ├─ bg: #f2f5f9
    ├─ bg-soft: #f8fafc
    ├─ surface: #ffffff
    └─ surface-raised: #fafbfd
```

**Action**: Pour chaque couleur:
1. Cliquer "+"
2. Entrer nom exact
3. Cliquer carré couleur
4. Entrer hex code
5. Confirm

## 2.2 Setup Typography Variables

```
Collection: "Typography"

Font Families Group:
├─ sans: "Inter"
└─ mono: "JetBrains Mono"

Font Sizes Group:
├─ xs: 11px
├─ sm: 13px
├─ base: 15px
├─ md: 16px
├─ lg: 18px
├─ xl: 20px
├─ 2xl: 24px
├─ 3xl: 30px
└─ 4xl: 36px

Font Weights Group:
├─ regular: 400
├─ medium: 500
├─ semibold: 600
├─ bold: 700
└─ extra-bold: 800

Line Heights Group:
├─ tight: 1.2
├─ normal: 1.5
└─ relaxed: 1.8
```

## 2.3 Setup Spacing Variables

```
Collection: "Spacing"

Spacing Scale:
├─ sp-1: 4px
├─ sp-2: 8px
├─ sp-3: 12px
├─ sp-4: 16px
├─ sp-5: 20px
├─ sp-6: 24px
├─ sp-8: 32px
├─ sp-10: 40px
└─ sp-12: 48px
```

## 2.4 Create Text Styles

```
Menu → Assets → + → Create text style

Create each:

Text Style: Display / Bold
├─ Font: Inter
├─ Size: 32px
├─ Weight: 800
├─ Line-height: 1.2
└─ Letter-spacing: -0.02em

Text Style: Heading / Bold
├─ Font: Inter
├─ Size: 24px
├─ Weight: 800
└─ Line-height: 1.2

Text Style: Title / Large
├─ Font: Inter
├─ Size: 20px
├─ Weight: 700
└─ Line-height: 1.4

Text Style: Label / Bold
├─ Font: Inter
├─ Size: 13px
├─ Weight: 600
├─ Text-transform: Uppercase
└─ Letter-spacing: 0.05em

Text Style: Body / Regular
├─ Font: Inter
├─ Size: 15px
├─ Weight: 400
└─ Line-height: 1.6

Text Style: Small / Regular
├─ Font: Inter
├─ Size: 11px
├─ Weight: 400
└─ Line-height: 1.4

Text Style: Code / Mono
├─ Font: JetBrains Mono
├─ Size: 12px
├─ Weight: 400
└─ Line-height: 1.5
```

---

# STEP 3: CRÉER PAGE 1 - SETUP & TOKENS (1 heure)

## 3.1 Create Frame

```
Menu → File
Right-click → New page → "01_Setup"
Create frame: 1280×2000px
Label: "Setup & Design System"
```

## 3.2 Add Color Palette Section

```
Frame: "Colors" (1280×600px)
├─ Title: "Color Palette" (32px, 800w, primary-strong)
├─ Subtitle: "All colors used in WAY Medical" (13px, muted)
│
└─ Color Grid (20 swatches):
   For each color variable:
   ├─ Component: Color Swatch (60×60px)
   │   ├─ Rectangle: fill from variable
   │   └─ Label: variable name + hex
   │
   Organize by:
   ├─ Primary (5)
   ├─ Teal (3)
   ├─ Semantic (7)
   └─ Neutral (9)
```

## 3.3 Add Typography Section

```
Frame: "Typography" (1280×400px)
├─ Title: "Typography Scale"
│
├─ Display / Bold: "Aa 32px / 800w"
├─ Heading: "Aa 24px / 800w"
├─ Title: "Aa 20px / 700w"
├─ Label: "AA 13px / 600w UPPERCASE"
├─ Body: "Aa 15px / 400w"
├─ Small: "Aa 11px / 400w"
└─ Code: "Aa 12px / 400w (JetBrains)"
```

## 3.4 Add Spacing Section

```
Frame: "Spacing" (1280×300px)
├─ Title: "Spacing Scale"
│
└─ Visual grid showing:
   4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px
   Each with: visual bar + label + pixel value
```

## 3.5 Add Shadows Section

```
Frame: "Shadows" (1280×300px)
├─ Card: Shadow card
│   └─ --sh-card: 0 2px 8px rgba(15,31,53,0.06)
├─ MD: Shadow card
│   └─ --sh-md: 0 4px 16px rgba(15,31,53,0.08)
├─ LG: Shadow card
│   └─ --sh-lg: 0 8px 32px rgba(15,31,53,0.10)
└─ XL: Shadow card
    └─ --sh-xl: 0 16px 48px rgba(15,31,53,0.12)

Each with CSS value displayed
```

---

# STEP 4: CRÉER PAGE 2 - SHARED COMPONENTS (8-10 heures)

## 4.1 Create Component: Button

```
Page: "02_Components"
Frame: "Button" (1200×800px)

Master Component structure:
├─ Frame: "Button / Default" (160×44px)
│   ├─ Background: Primary (from variable)
│   ├─ Border-radius: 10px
│   ├─ Padding: 0 20px
│   ├─ Text: "Button Label" (13px, 700w, white)
│   ├─ Icon: Optional (left, 18px)
│   └─ Shadow: None
│
├─ Right-click → "Create component"
└─ Name: "Button"

Then create Variants:

Variant: Style
├─ Primary (blue bg, white text)
├─ Stroked (blue border, blue text, white bg)
└─ Text (no bg, blue text)

Variant: Size
├─ Large (44px height)
└─ Small (36px height)

Variant: State
├─ Default
├─ Hover (shadow: 0 4px 16px, opacity lighter)
├─ Active (pressed effect)
└─ Disabled (opacity 0.5)

To create variant:
1. Duplicate component
2. Modify style
3. Right-click → "Create as component"
4. In Properties → Add "Variant" property
5. Set values: Style=Stroked, Size=Large, etc.
```

**Créer pour chaque variant:**
- Button / Primary / Large / Default
- Button / Primary / Large / Hover
- Button / Primary / Large / Disabled
- Button / Stroked / Small / Default
- [etc. all combinations]

**Total: 24 button variants**

## 4.2 Create Component: Input

```
Frame: "Input" (400×160px)

Master: "Input / Text / Default"
├─ Label: "EMAIL" (11px, 600w, uppercase, muted)
├─ Input field (44px height)
│   ├─ Border: 1.5px solid #d1dbe8
│   ├─ Border-radius: 10px
│   ├─ Background: white
│   ├─ Padding: 10px 14px
│   └─ Text: "Placeholder..." (13px, placeholder-gray)
└─ Error message (optional, 11px, red)

Create component
Add variants:

Variant: Type
├─ Text
├─ Email
├─ Password
└─ Textarea

Variant: State
├─ Default
├─ Focus (border-blue, shadow-blue)
├─ Error (border-red, shadow-red)
└─ Disabled

Total: 12 input variants
```

## 4.3 Create Component: Badge

```
Frame: "Badge" (300×200px)

Master: "Badge / Status / Approved"
├─ Container: 24px height, fit-content
├─ Background: #dcfce7 (from success-light variable)
├─ Border: 1px solid #bbf7d0
├─ Border-radius: 6px
├─ Padding: 4px 8px
├─ Text: "Approved" (11px, 600w, #15803d)
└─ Create component

Variants:

Status variants:
├─ Approved (green)
├─ Pending (amber)
├─ Completed (blue)
├─ Cancelled (red)
├─ Paused (amber)
└─ Active (green)

Role variants:
├─ Admin (violet)
├─ Doctor (blue)
├─ Staff (teal)
└─ Patient (green)

Total: 12 badge variants
```

## 4.4 Create Component: KPI Card

```
Frame: "KPI Card" (300×200px)

Master: "KPI Card / Default"
├─ Background: white
├─ Border: 1px solid #e4ecf5
├─ Border-radius: 18px
├─ Padding: 20px 24px
├─ Icon (44×44px, colored bg, border-radius 14px)
├─ Value (30px, 800w, dark-text)
├─ Label (13px, muted)
├─ Change indicator (11px, 600w, green/red/gray)
└─ Accent bar (3px bottom, colored)

Create component
Add variants:

Color variants:
├─ Primary (blue icon, blue bar)
├─ Teal (teal icon, teal bar)
├─ Success (green icon, green bar)
└─ Warning (amber icon, amber bar)

Total: 4 KPI variants
```

## 4.5 Create Component: Card

```
Frame: "Card" (400×300px)

Master: "Card / With Header"
├─ Background: white
├─ Border: 1px solid #e4ecf5
├─ Border-radius: 18px
├─ Shadow: --sh-card
├─ Header section (padding 20px 24px, border-bottom)
│   ├─ Title: "Card Title" (16px, 600w)
│   ├─ Subtitle: optional (13px, muted)
│   └─ Action: optional button
├─ Body section (padding 20px 24px, flex: 1)
│   └─ Content area
└─ Footer section (optional, padding 14px 24px, border-top)
    └─ Action buttons

Variants:
├─ With Header / With Footer
├─ With Header / No Footer
├─ No Header / With Footer
└─ No Header / No Footer

Total: 4 card variants
```

## 4.6 Create Component: Avatar

```
Frame: "Avatar" (300×250px)

Master: "Avatar / MD"
├─ Shape: Circle (40×40px)
├─ Background: primary-light (from variable)
├─ Text: "CD" (initials, 16px, 600w, primary-strong)
├─ Border: None
└─ Create component

Variants:

Size variants:
├─ Small (32px)
├─ Medium (40px)
├─ Large (48px)
└─ XL (64px)

Color variants:
├─ Primary (blue)
├─ Teal (teal)
├─ Success (green)
├─ Warning (amber)
└─ Danger (red)

Total: 20 avatar variants
```

## 4.7 Create Component: Tier Card

```
Frame: "Tier Card" (300×300px)

Master: "Tier Card / Patient"
├─ Border: 1.5px solid #e4ecf5
├─ Border-radius: 16px
├─ Background: white
├─ Padding: 24px 16px
├─ Icon (56×56px, border-radius 12px)
│   └─ Background: primary-light (from variable)
├─ Title: "Patient" (16px, 600w, dark)
├─ Description (12px, muted)
├─ Arrow icon (hidden, position absolute top-right)
└─ Create component

Variants:
├─ Patient (blue)
├─ Doctor (teal)
└─ Admin (violet)

Total: 3 tier card variants
```

## 4.8 Create Component: Stepper

```
Frame: "Stepper" (1000×150px)

Master: "Stepper / 4 Steps"
├─ Layout: Grid, 7 columns
├─ Step 1: Circle (48×48px)
│   ├─ Background: future (light gray)
│   ├─ Number: "1" (18px, 600w)
│   ├─ Label: "Services" (13px, 600w, muted)
│   └─ Sublabel: "Select" (11px, muted)
├─ Connector: Line (2px height, light gray)
├─ Step 2: Circle (active, blue background, white "2")
├─ Connector: Line (blue)
├─ Step 3: Circle (future)
├─ Connector: Line (light gray)
└─ Step 4: Circle (future)

Variants:
├─ Current Step 1
├─ Current Step 2
├─ Current Step 3
└─ Current Step 4

Total: 4 stepper variants
```

---

# STEP 5: CRÉER PAGES 3-7 - INTERFACE SCREENS (12-15 heures)

## 5.1 Page 3: Login Interface

### Create Page
```
Menu → File → New page
Name: "03_Login"
```

### Frame 1: Desktop / Tier Selection
```
Frame: "Login / Desktop / Tier Selection" (1280×800px)

Structure:
├─ Logo (center, top 60px)
│   ├─ Background: gradient blue
│   ├─ Text: "WAY Medical"
│   ├─ Subtext: "Healthcare Platform"
│   └─ Size: 48×48px icon + text
├─ Heading: "Bienvenue" (32px, 800w, center)
├─ Subtitle (15px, muted, center)
├─ Grid: 3 columns, gap 20px
│   ├─ Component: "Tier Card / Patient" (instance)
│   ├─ Component: "Tier Card / Doctor" (instance)
│   └─ Component: "Tier Card / Admin" (instance)
└─ Footer: "WAY Medical © 2026..." (center, bottom)
```

### Frame 2: Desktop / Login Form
```
Frame: "Login / Desktop / Form" (1280×900px)

Structure:
├─ Logo (top-center)
├─ Panel (520px centered)
│   ├─ Back button: "← Retour"
│   ├─ Heading: "Patient"
│   ├─ Subtitle: "Connectez-vous..."
│   ├─ Form group: Email
│   │   ├─ Label: "EMAIL"
│   │   ├─ Component: Input / Text / Default
│   │   └─ Error msg (hidden)
│   ├─ Form group: Password
│   │   ├─ Label: "MOT DE PASSE"
│   │   ├─ Component: Input / Password / Default
│   │   └─ Eye icon (toggle)
│   ├─ Credentials box (patient color)
│   │   ├─ Title: "IDENTIFIANTS DE TEST"
│   │   ├─ Row: Email + code
│   │   └─ Row: Password + code
│   ├─ Error banner (hidden by default)
│   ├─ Component: Button / Primary / Large
│   ├─ Divider: "ou"
│   └─ Component: Button / Stroked
└─ Footer
```

### Frame 3-5: Login Form - States
```
Create variations:
├─ Form / Error (email field red, error banner visible)
├─ Form / Loading (button text "Connexion en cours...", spinner)
└─ Form / Success (confirmation message)
```

### Frame 6-7: Mobile Versions
```
"Login / Mobile / Tier Selection" (375×812px)
├─ Same content, 1-column layout
├─ Full-width cards
└─ Responsive spacing

"Login / Mobile / Form" (375×1200px)
├─ Full-width form
├─ Stacked elements
└─ Larger touch targets
```

## 5.2 Page 4: Admin Dashboard

### Create Page
```
Name: "04_Admin_Dashboard"
```

### Frame: Desktop Full Page
```
Frame: "Admin Dashboard / Desktop" (1920×2400px)

Header section (60px):
├─ Logo + "WAY MEDICAL"
├─ Search bar
└─ Notifications + Profile

Content:
├─ Eyebrow: "OPERATIONS CENTER"
├─ Title: "WAY Medical — Overview"
├─ Subtitle: Date + location

KPI Strip (1×4 grid):
├─ Component: KPI Card / Primary (1,248 patients)
├─ Component: KPI Card / Teal (87 appointments)
├─ Component: KPI Card / Success (€48.7k revenue)
└─ Component: KPI Card / Warning (34 staff)

2-Column Grid:
├─ Left:
│   ├─ Card: Appointment Status (3×2 grid of counts)
│   └─ Status Count components × 6
├─ Right:
│   ├─ Card: Revenue
│   │   ├─ Large number: €48,750
│   │   ├─ Breakdown items
│   │   └─ SVG line chart (import or draw)
│   └─ Service breakdown

Full-width cards:
├─ Service Performance Table
│   └─ 6 rows with icons, chips, progress bars
├─ Activity Feed
│   └─ Event items with icons + timestamps
├─ Staff on Duty
│   └─ Staff list items
├─ System Alerts
│   └─ Alert items (dismissible)
└─ Hourly Chart
    └─ 12 horizontal bars (colored)
```

### Frame: Tablet Version (768px)
```
"Admin Dashboard / Tablet" (768×3000px)
├─ All sections stack to 1-column
├─ KPI grid 2×2
├─ Cards full-width
└─ Tables with horizontal scroll
```

## 5.3 Page 5: Appointment Booking

### Create Page
```
Name: "05_Appointment_Booking"
```

### Frame: Step 0
```
Frame: "Booking / Step 0 / Service Selection" (1280×900px)

├─ Breadcrumb: "Appointments > Book Appointment"
├─ Stepper (Step 1 active)
├─ Title: "Select a Medical Service"
├─ Subtitle
├─ Search input
├─ Services grid (4 columns)
│   ├─ Service Card × 4-6
│   │   ├─ Icon (56×56)
│   │   ├─ Service name
│   │   ├─ Specialty
│   │   ├─ Doctor count
│   │   └─ Checkmark (hidden)
│   └─ Selected state on first card
└─ Navigation buttons: Cancel, Next (disabled until selected)
```

### Frame: Step 1
```
Frame: "Booking / Step 1 / Doctor Selection" (1280×900px)

├─ Stepper (Step 2 active, Step 1 done ✓)
├─ Title: "Choose Your Doctor"
├─ Subtitle: Service name in bold
├─ Doctors grid (3 columns)
│   ├─ Doctor Card × 6
│   │   ├─ Avatar (lg)
│   │   ├─ Name
│   │   ├─ Specialty
│   │   ├─ Star rating (5 stars)
│   │   ├─ Reviews count
│   │   ├─ Next available
│   │   └─ Checkmark
│   └─ Selected state on first card
└─ Navigation: Back, Next
```

### Frame: Step 2
```
Frame: "Booking / Step 2 / Date & Time" (1280×900px)

├─ Stepper (Step 3 active)
├─ Title: "Select Date & Time"
├─ Subtitle: Doctor name
├─ 2-column layout:
│   ├─ Mini calendar (7×5 grid)
│   │   ├─ Days with states: available/selected/today/past
│   │   └─ Selected day: 25
│   └─ Time slots grid (6 columns)
│       ├─ Time buttons (format: 10:00)
│       ├─ Selected: 14:00
│       └─ Button states: available/selected/disabled
├─ Selected display: "April 25, 2025 at 14:00"
└─ Navigation: Back, Next
```

### Frame: Step 3
```
Frame: "Booking / Step 3 / Confirmation" (1280×900px)

├─ Stepper (Step 4 active, all done ✓)
├─ Title: "Confirm Your Booking"
├─ Summary cards (3 sections):
│   ├─ Service card
│   │   └─ "Cardiology - Cardiac Care"
│   ├─ Doctor card
│   │   └─ "Dr. Eric Fontaine"
│   └─ DateTime card
│       └─ "Thursday, April 25 at 14:00"
├─ Reason field (textarea)
│   └─ "Why are you booking this appointment?"
└─ Navigation: Cancel, [✓ Confirm Booking] (primary)
```

### Frame: Mobile Versions
```
"Booking / Mobile / All Steps" (375×1200px)
├─ Stepper: Horizontal scroll or simplified
├─ Service grid: 1 column
├─ Doctor grid: 1 column
├─ Calendar: Full width
└─ Time slots: 3-4 per row
```

## 5.4 Page 6: Patient Dashboard

### Create Page
```
Name: "06_Patient_Dashboard"
```

### Frame: Desktop
```
Frame: "Patient Dashboard / Desktop" (1920×1400px)

Hero section:
├─ Greeting: "Good morning, Claire!"
├─ Date: "Thursday, April 23, 2026"
└─ CTA button: "📅 Book Appointment"

Next Appointment Banner (full-width):
├─ Blue gradient background
├─ Icon: calendar (52×52, white)
├─ Label: "NEXT APPOINTMENT" (uppercase)
├─ Title: "Dr. Eric Fontaine - Cardiology Consultation"
├─ Meta: Time, Doctor, Location
└─ Buttons: "See Details", "Reschedule"

KPI strip (1×4):
├─ KPI Card / upcoming apts (2)
├─ KPI Card / active treatments (1)
├─ KPI Card / pending labs (2)
└─ KPI Card / prescriptions (3)

2-Column Grid:
├─ Left column:
│   ├─ Card: Appointments
│   │   ├─ Timeline-style list
│   │   ├─ Appointment item × 3
│   │   │   ├─ Date block (APR 25)
│   │   │   ├─ Time (14:00)
│   │   │   ├─ Doctor | Service
│   │   │   └─ Status badge
│   │   └─ "See all →" link
│   └─ Card: Consultations
│       ├─ Timeline dots + connector
│       ├─ Consultation item × 3
│       │   ├─ Timestamp
│       │   ├─ Doctor | Title
│       │   ├─ Tags (colored chips)
│       │   └─ Preview text
│       └─ "See all →" link
├─ Right column:
│   ├─ Card: Treatments
│   │   ├─ Treatment card × 2-3
│   │   │   ├─ Icon (40×40)
│   │   │   ├─ Name
│   │   │   ├─ Dosage
│   │   │   ├─ Progress bar
│   │   │   └─ Prescribed by
│   │   └─ "See all →" link
│   └─ Card: Health Metrics (2×2 grid)
│       ├─ Health Metric / Normal (HR)
│       ├─ Health Metric / Normal (BP)
│       ├─ Health Metric / Normal (Weight)
│       ├─ Health Metric / Normal (Temp)
│       └─ "View history →" link
```

## 5.5 Page 7: Treatment List

### Create Page
```
Name: "07_Treatment_List"
```

### Frame: Desktop
```
Frame: "Treatment List / Desktop" (1920×1200px)

Header:
├─ Eyebrow: "TRAITEMENTS"
├─ Title: "Suivi thérapeutique"
├─ Description
└─ Button: "➕ Nouveau"

Filter Card:
├─ Section title: "FILTRES"
├─ 3-column form:
│   ├─ Patient search input
│   ├─ Status select dropdown
│   └─ Reset button (stroked)
└─ Form spacing: gap 16px

Status KPI strip (1×4):
├─ KPI Card / Active (green check icon)
├─ KPI Card / Paused (amber pause icon)
├─ KPI Card / Completed (blue check_all icon)
└─ KPI Card / Cancelled (red cancel icon)

Treatment cards grid (3 columns):
├─ Treatment Card × 6
│   ├─ Header:
│   │   ├─ Icon (40×40, teal bg)
│   │   ├─ Name (16px, 600w)
│   │   ├─ Type (11px, muted)
│   │   └─ Status badge
│   ├─ Body (info grid):
│   │   ├─ Patient: Marie Dupont
│   │   ├─ Posologie: 500mg 2x
│   │   ├─ Frequency: Per day
│   │   ├─ Start: 15 Apr 2025
│   │   └─ End: 22 Apr 2025
│   └─ Footer (2 buttons):
│       ├─ "Voir" (stroked)
│       └─ "Modifier" (primary)
├─ Card with status: Active
├─ Card with status: Paused
└─ Card with status: Cancelled

Empty state (if 0 results):
├─ Icon: inbox (48px, muted)
├─ Title: "No treatments found"
└─ Description: "Try different search criteria"
```

### Frame: Mobile/Tablet
```
"Treatment / Tablet" (768×1800px)
├─ All cards 2-column grid
└─ Full-width form

"Treatment / Mobile" (375×2400px)
├─ All cards 1-column
└─ Filters stacked
```

---

# STEP 6: EXPORT DES IMAGES (2-3 heures)

## 6.1 Export Hero Screenshots

```
For each frame (7 total):

1. Select frame
2. Right-click → "Copy as..." → "Copy PNG (2x)"
   OR File → Export
3. Settings:
   ├─ Format: PNG
   ├─ Scale: 2x (for retina)
   └─ Suffix: @2x
4. Save to: /exports/hero/
5. Filename format:
   ├─ 01-login-tier-selection@2x.png
   ├─ 02-login-form@2x.png
   ├─ 03-admin-dashboard@2x.png
   ├─ 04-patient-dashboard@2x.png
   ├─ 05-appointment-booking-step0@2x.png
   ├─ 05-appointment-booking-step3@2x.png
   └─ 07-treatment-list@2x.png
```

## 6.2 Export Components as SVG

```
For each component:

1. Select component
2. File → Export
3. Settings:
   ├─ Format: SVG
   ├─ Include "Copy styles" option
   └─ No scale needed for SVG
4. Save to: /exports/components/
5. Filename format:
   ├─ button.svg
   ├─ input.svg
   ├─ badge.svg
   ├─ card.svg
   ├─ kpi-card.svg
   ├─ avatar.svg
   ├─ tier-card.svg
   └─ stepper.svg
```

## 6.3 Export Mobile Screenshots

```
For each mobile frame (10 total):

1. Select frame (375px width)
2. File → Export
3. Format: PNG 2x
4. Save to: /exports/mobile/
5. Names:
   ├─ 01-login-tier-mobile@2x.png
   ├─ 02-login-form-mobile@2x.png
   ├─ 03-appointment-step0-mobile@2x.png
   └─ [etc.]
```

## 6.4 Export Design System PNG

```
For page 01_Setup:

1. Select each section frame
2. Export as PNG 2x
3. Save to: /exports/system/
4. Names:
   ├─ color-palette@2x.png
   ├─ typography-scale@2x.png
   ├─ spacing-grid@2x.png
   └─ shadows@2x.png
```

---

# STEP 7: CRÉER SPEC SHEET PDF (1 heure)

## 7.1 Export Figma as PDF

```
Menu → File → Export → PDF

Pour chaque page:
1. Select page
2. Export as PDF
3. Include components
4. Save as: way-medical-specs.pdf
```

## 7.2 Organize PDF (optionnel)

```
Combine PDFs in order:
├─ Cover
├─ Design System (colors, typography, spacing)
├─ Components (all 22)
├─ Screens (7 main screens)
├─ Mobile variants (3 screens)
└─ Developer specs (CSS values, measurements)

Tools: Adobe Acrobat, Preview (Mac), or online PDF merge
```

---

# STEP 8: PARTAGER & LIVRER (30 minutes)

## 8.1 Share Figma Link

```
Menu → Share → Change to "Editor" or "Viewer"
├─ Copy link
├─ Send to team
└─ Enable comments for feedback
```

## 8.2 Create Export Folder Structure

```
designs/
├─ hero/
│   ├─ 01-login-tier-selection@2x.png
│   ├─ 02-login-form@2x.png
│   ├─ 03-admin-dashboard@2x.png
│   ├─ 04-patient-dashboard@2x.png
│   ├─ 05-appointment-booking-step0@2x.png
│   ├─ 05-appointment-booking-step3@2x.png
│   └─ 07-treatment-list@2x.png
│
├─ components/
│   ├─ button.svg
│   ├─ input.svg
│   ├─ badge.svg
│   ├─ card.svg
│   ├─ kpi-card.svg
│   ├─ avatar.svg
│   └─ [all components]
│
├─ mobile/
│   ├─ 01-login-tier-mobile@2x.png
│   ├─ 02-login-form-mobile@2x.png
│   └─ [etc.]
│
├─ tablet/
│   ├─ 01-login-tier-tablet@2x.png
│   └─ [etc.]
│
├─ system/
│   ├─ color-palette@2x.png
│   ├─ typography-scale@2x.png
│   ├─ spacing-grid@2x.png
│   └─ shadows@2x.png
│
└─ way-medical-design-system.pdf
```

## 8.3 Create README

```
File: designs/README.md

# WAY Medical Design System

## Contents
- `/hero/` - Full page mockups (2x resolution)
- `/components/` - SVG components for development
- `/mobile/` - Responsive mobile designs (375px)
- `/tablet/` - Tablet designs (768px)
- `/system/` - Design tokens visuals
- `way-medical-design-system.pdf` - Complete specs

## Usage
1. Designers: Open Figma link for editable designs
2. Developers: Use SVG components + specs
3. Stakeholders: View hero PNGs + PDF specs

## Links
- Figma: [link]
- Dev Docs: [link]
- Component Guide: [link]

## Contact
Design Lead: [email]
```

---

# RÉSUMÉ TIMELINE

```
Task                          Hours    Duration
─────────────────────────────────────────────
Step 1: Setup Figma           0.5     30 min
Step 2: Design Tokens         1.5     1.5 hours
Step 3: Setup Page            1       1 hour
Step 4: Components            8-10    1-2 days
Step 5: Interface Screens     12-15   2-3 days
Step 6: Export Images         2-3     2 hours
Step 7: PDF Spec             1       1 hour
Step 8: Share & Deliver      0.5     30 min
─────────────────────────────────────────────
TOTAL                        30-35    3-4 days
```

---

# CHECKLIST QUALITÉ

```
Design System:
□ All colors defined (20+ colors)
□ All typography styles created (7 styles)
□ Spacing variables set (9 sizes)
□ Shadow definitions created (4 shadows)

Components (22 total):
□ Button (24 variants)
□ Input (12 variants)
□ Badge (12 variants)
□ Card (4 variants)
□ KPI Card (4 variants)
□ Avatar (20 variants)
□ Tier Card (3 variants)
□ Stepper (4 variants)
□ [All components tested]

Interfaces (7 total):
□ Login (Desktop + Mobile + States)
□ Admin Dashboard (Desktop + Tablet + Mobile)
□ Appointment Booking (4 steps + Mobile)
□ Patient Dashboard (Desktop + Mobile)
□ Treatment List (Desktop + Tablet + Mobile)
□ All components used as instances
□ All states visualized

Exports:
□ 7 hero PNGs (2x resolution)
□ 22 component SVGs
□ 10 mobile screenshots
□ 10 tablet screenshots
□ 4 system design images
□ 1 complete PDF spec sheet

Delivery:
□ Figma link shared
□ Folder structure organized
□ README created
□ Team notified
```

---

# 🎉 Vous êtes Prêt!

Suivez ce workflow step-by-step et vous aurez un design system complet en 3-4 jours!

**Next: Commencez par Step 1 maintenant! 🚀**

