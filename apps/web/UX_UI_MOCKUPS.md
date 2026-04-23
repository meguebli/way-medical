# WAY Medical — UX/UI Mockups & Visual References

## Mockups ASCII pour Prototypage Rapide

---

# 1. LOGIN — TIER SELECTION (Desktop 1280×800)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│                              [he] WAY Medical                                │
│                          Healthcare Platform                                 │
│                                                                               │
│                              Bienvenue                                       │
│              Sélectionnez votre profil pour accéder à WAY Medical            │
│                                                                               │
│     ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐   │
│     │                  │    │                  │    │                  │   │
│     │     [👤]         │    │     [⚕️]         │    │    [⚙️]          │   │
│     │                  │    │                  │    │                  │   │
│     │ Patient          │    │ Médecin / Staff  │    │ Administration   │   │
│     │                  │    │                  │    │                  │   │
│     │ Accédez à votre  │    │ Gérez vos        │    │ Gérez            │   │
│     │ dossier médical, │    │ consultations    │    │ établissements   │   │
│     │ RDV et résultats │    │ et votre         │    │ utilisateurs et  │   │
│     │                  │    │ planning         │    │ facturation      │   │
│     │                  │    │                  │    │                  │   │
│     │              [→] │    │              [→] │    │              [→] │   │
│     └──────────────────┘    └──────────────────┘    └──────────────────┘   │
│                                                                               │
│                 WAY Medical © 2026 • Plateforme sécurisée                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Visual Specs:
- **Cards**: 160-240px width, 200px min height
- **Icons**: 56×56px, colored backgrounds (blue/teal/violet)
- **Hover**: Blue border, lift +2px, arrow appears
- **Typography**: 16px title, 12px description, centered

---

# 2. LOGIN — FORM (Desktop 1280×900)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│              [he] WAY Medical                                                │
│              Healthcare Platform                                             │
│                                                                               │
│                                                                               │
│                        ┌─────────────────────────┐                          │
│                        │ ← Retour                │                          │
│                        │                         │                          │
│                        │ Patient                 │                          │
│                        │ Connectez-vous avec vos │                          │
│                        │ identifiants            │                          │
│                        │                         │                          │
│                        │ EMAIL                   │                          │
│                        │ ┌────────────────────┐  │                          │
│                        │ │ marie.dupont@...   │  │                          │
│                        │ └────────────────────┘  │                          │
│                        │                         │                          │
│                        │ MOT DE PASSE            │                          │
│                        │ ┌────────────────────┐  │                          │
│                        │ │ ••••••••        [👁] │                          │
│                        │ └────────────────────┘  │                          │
│                        │                         │                          │
│                        │ ┌─────────────────────┐ │                          │
│                        │ │ IDENTIFIANTS TEST   │ │  (blue bg)              │
│                        │ │ Email: marie...     │ │                          │
│                        │ │ Mdp: ChangeMe123!  │ │                          │
│                        │ └─────────────────────┘ │                          │
│                        │                         │                          │
│                        │ ┌────────────────────┐  │                          │
│                        │ │ [✓] Se connecter   │  │  (blue button)         │
│                        │ └────────────────────┘  │                          │
│                        │                         │                          │
│                        │        — ou —           │                          │
│                        │ ┌────────────────────┐  │                          │
│                        │ │ ▶  Accès rapide    │  │  (stroked button)      │
│                        │ └────────────────────┘  │                          │
│                        │                         │                          │
│                        └─────────────────────────┘                          │
│                                                                               │
│              WAY Medical © 2026 • Plateforme sécurisée                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Visual Specs:
- **Panel**: 520px width, 40px padding, 20px border-radius
- **Form**: 20px gap between fields
- **Inputs**: 44px height, 1.5px border, blue focus ring
- **Buttons**: 44px height, full width or half-width
- **Colors**: Blue primary for form, colored boxes for credentials

---

# 3. ADMIN DASHBOARD (Desktop 1920×2400)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ he  WAY MEDICAL              Search...                    he  Notifications  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│ OPERATIONS CENTER                                  [📋 Manage] [📡 Monitor]  │
│ WAY Medical — Overview                                                       │
│ Thursday, April 23, 2026 • Polyclinique Saint-Louis                         │
│                                                                                │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│ │ 👥           │ │ 📅           │ │ 💰           │ │ 👔           │        │
│ │ 1,248        │ │ 87           │ │ €48.7k       │ │ 34           │        │
│ │ Active       │ │ Today's      │ │ Monthly      │ │ Active       │        │
│ │ Patients     │ │ Appointments │ │ Revenue      │ │ Staff        │        │
│ │ +23 this wk  │ │ 8 pending    │ │ +12.4%       │ │ 2 on leave   │        │
│ │              │ │              │ │              │ │              │        │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                                                │
│ ┌───────────────────────────────────┐ ┌────────────────────────────────┐   │
│ │ Appointment Status                │ │ Revenue                        │   │
│ │                                   │ │ Today - All services           │   │
│ │ 52        │ 28        │ 14        │ │ €48,750 this month    [+12.4%]│   │
│ │ ━━━       │ ━━━       │ ━━━       │ │                               │   │
│ │ Approved  │ Completed │ Pending   │ │ Consultations: €24,300        │   │
│ │                                   │ │ Procedures:    €14,800        │   │
│ │ 7         │ 3         │ 8         │ │ Lab/Imaging:   €9,650         │   │
│ │ ━━        │ ━        │ ━━━       │ │                               │   │
│ │ Cancelled │ No-Show   │ Requested │ │ ╱╲                           │   │
│ │                                   │ │╱  ╲        ╱╲                │   │
│ │                                   │ │    ╲╱╲  ╱╲╱  ╲╱             │   │
│ └───────────────────────────────────┘ └────────────────────────────────┘   │
│                                                                                │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ Service Performance                                                      │ │
│ ├──────────────────────────────────────────────────────────────────────────┤ │
│ │ 💓 Cardiology  │ Cardiac Care   │ Polyclinique │ 3    │ 3 days  │ 142 ▓▓│ │
│ │ 🏥 General Med │ Primary Care   │ Polyclinique │ 5    │ 1 day   │ 234 ▓▓│ │
│ │ 🔍 Radiology   │ Imaging        │ Polyclinique │ 2    │ 5 days  │  89 ▓ │ │
│ │ 🎨 Dermatology │ Skin Care      │ Polyclinique │ 2    │ 8 days  │  76   │ │
│ │ 🧠 Neurology   │ Neuroscience   │ Polyclinique │ 1    │ 12 days │  54   │ │
│ │ 🔬 Oncology    │ Cancer Care    │ Centre Med   │ 3    │ 7 days  │  68   │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                                │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ Activity Feed                                           Staff on Duty    │ │
│ ├──────────────────────────────────────────────────────────────────────────┤ │
│ │ ● 14:32  New appointment request                      👤 Dr. Fontaine   │ │
│ │ ● 13:45  Consultation completed                       👤 Dr. Martin     │ │
│ │ ⚠ 12:10  Lab result: Abnormal  [X]                    👤 Sophie Bernard │ │
│ │ ● 11:20  New patient registration                     👤 Dr. Leblanc    │ │
│ │ ● 10:15  Payment received                             👤 Marie Dupont   │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                                │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ System Alerts (2 active)                 Hourly Appointments            │ │
│ ├──────────────────────────────────────────────────────────────────────────┤ │
│ │ ⚠ Database backup failed                  08:00  ▓▓                     │ │
│ │ ℹ SSL certificate expires in 30 days      09:00  ▓▓▓▓                   │ │
│ │                                           10:00  ▓▓▓▓▓▓                 │ │
│ │                                           11:00  ▓▓▓                    │ │
│ │                                           12:00  ▓▓▓▓▓▓▓▓▓             │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                                │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Visual Specs:
- **KPI Cards**: 4-column grid, 240×160px each
- **Status Grid**: 3×2 layout with colored bars (green/blue/amber/red)
- **Tables**: Full-width, row hover light blue
- **Charts**: SVG line chart (300×100px), bar charts (horizontal)
- **Cards**: Consistent 18px border-radius, shadow-card

---

# 4. APPOINTMENT BOOKING WIZARD (Desktop 1280×900)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Appointments > Book Appointment                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ○──────●──────○──────○                                                    │
│  │      │      │      │                                                    │
│  1      2      3      4                                                    │
│ Services Doctor Date   Confirm                                              │
│ Select   Choose  & Time                                                     │
│                                                                               │
│ ─────────────────────────────────────────────────────────────────────────   │
│                                                                               │
│ Select a Medical Service                                                    │
│ Choose the service that matches your medical need.                         │
│                                                                               │
│ [🔍 Search services...]                                                    │
│                                                                               │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐           │
│ │ ❤️               │ │ 🏥               │ │ 🔍               │           │
│ │                  │ │                  │ │                  │           │
│ │ Cardiology       │ │ General Medicine │ │ Radiology        │           │
│ │ Cardiac Care     │ │ Primary Care     │ │ Imaging          │           │
│ │ 3 doctors avail  │ │ 5 doctors avail  │ │ 2 doctors avail  │           │
│ │                  │ │                  │ │                  │           │
│ │ ✓                │ │                  │ │                  │           │
│ └──────────────────┘ └──────────────────┘ └──────────────────┘           │
│                                                                               │
│ ┌──────────────────┐                                                       │
│ │ 🎨               │                                                       │
│ │                  │                                                       │
│ │ Dermatology      │                                                       │
│ │ Skin Care        │                                                       │
│ │ 2 doctors avail  │                                                       │
│ │                  │                                                       │
│ └──────────────────┘                                                       │
│                                                                               │
│                                                    [Cancel]  [Next >]       │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Step 2 Example (Date & Time):
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│  ○──────○──────●──────○                                                    │
│                                                                               │
│ Select Date & Time                                                          │
│ Available slots for Dr. Fontaine                                            │
│                                                                               │
│ ┌─────────────────────────┐ ┌──────────────────────────────┐               │
│ │ April 2025              │ │ Available Times              │               │
│ │ Su Mo Tu We Th Fr Sa    │ │ April 25, 2025               │               │
│ │        1  2  3  4  5    │ │                              │               │
│ │  6  7  8  9 10 11 12    │ │ [10:00] [10:30] [11:00]     │               │
│ │ 13 14 15 16 17 18 19    │ │ [11:30] [14:00] [14:30]     │               │
│ │ 20 21 22 23 24 25 26    │ │ [15:00] [15:30] [16:00]     │               │
│ │ 27 28 29 30            │ │ [16:30]                      │               │
│ │                         │ │                              │               │
│ └─────────────────────────┘ └──────────────────────────────┘               │
│                                                                               │
│ Selected: April 25, 2025 at 14:00                                          │
│                                                    [< Back]  [Next >]       │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Visual Specs:
- **Stepper**: 4 circles connected by lines, active=blue, done=green checkmark
- **Service Cards**: 160×160px, 3-4 columns, hover lift
- **Doctor Cards**: 200×200px, 2-3 columns with star ratings
- **Calendar**: 7×5 grid (days), selected=blue, today=border
- **Time Slots**: 6-column button grid, selected=blue bg

---

# 5. PATIENT DASHBOARD (Desktop 1920×1400)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ he  WAY MEDICAL              Search...                    he  Notifications  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│ Good morning, Claire!                         [📅 Book Appointment]         │
│ Thursday, April 23, 2026                                                    │
│                                                                                │
│ ╔══════════════════════════════════════════════════════════════════════════╗│
│ ║ 📅 NEXT APPOINTMENT                                                      ║│
│ ║ Dr. Eric Fontaine - Cardiology Consultation                              ║│
│ ║ 🕒 Thursday, April 25 at 14:00 | 📍 Cardiology Lab 2B                    ║│
│ ║ [See Details]  [Reschedule]                                              ║│
│ ╚══════════════════════════════════════════════════════════════════════════╝│
│                                                                                │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│ │ 📅 2         │ │ 🩺 1         │ │ 🔬 2         │ │ 💊 3         │       │
│ │ Upcoming     │ │ Active       │ │ Pending      │ │ Active       │       │
│ │ Appointments │ │ Treatments   │ │ Lab Results  │ │ Prescriptions│       │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                                                │
│ ┌─────────────────────────────────────┐ ┌────────────────────────────────┐ │
│ │ Appointments                        │ │ Treatments                     │ │
│ ├─────────────────────────────────────┤ ├────────────────────────────────┤ │
│ │                                     │ │ 💊 Amoxicilline 500mg         │ │
│ │ 📅 APR 25  14:00                    │ │ Twice daily for 7 days        │ │
│ │ Dr. Fontaine | Cardiology           │ │ ▓▓▓▓▓▓░░░░░ 60%             │ │
│ │ [Details]                           │ │ Prescribed by: Dr. Fontaine   │ │
│ │                                     │ │                                │ │
│ │ 📅 MAY 02  10:30                    │ │ 💊 Lisinopril 10mg            │ │
│ │ Dr. Martin | General Medicine       │ │ Once daily for 30 days        │ │
│ │ [Details]                           │ │ ▓▓▓▓▓▓▓▓▓░░ 90%             │ │
│ │                                     │ │ Prescribed by: Dr. Martin     │ │
│ │ [See all appointments →]            │ │                                │ │
│ └─────────────────────────────────────┘ └────────────────────────────────┘ │
│                                                                                │
│ ┌─────────────────────────────────────┐ ┌────────────────────────────────┐ │
│ │ Consultations                       │ │ Health Metrics                 │ │
│ ├─────────────────────────────────────┤ ├────────────────────────────────┤ │
│ │                                     │ │ ❤️        🩸        ⚖️        🌡️ │ │
│ │ ● 14:32  Cardiology Consultation    │ │ 72 bpm  120/80    68 kg  36.8°│ │
│ │   Dr. Fontaine | [#diagnosis]       │ │ Heart   Blood     Weight Temp │ │
│ │                                     │ │                                │ │
│ │ ● 10:15  Follow-up Check            │ │ All metrics normal ✓           │ │
│ │   Dr. Martin | [#routine]           │ │                                │ │
│ │                                     │ │ [View history →]              │ │
│ │ ● Apr 18  Lab Review                │ │                                │ │
│ │   Dr. Fontaine | [#labs]            │ │                                │ │
│ │                                     │ │                                │ │
│ │ [See all consultations →]           │ │                                │ │
│ └─────────────────────────────────────┘ └────────────────────────────────┘ │
│                                                                                │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Visual Specs:
- **Next Appointment Banner**: Full-width blue gradient, 120px height
- **KPI Cards**: 4-column grid, 200×140px
- **2-Column Grid**: 50/50 split on desktop
- **Timelines**: Vertical dots + connector lines
- **Health Cards**: 4-column grid, square aspect ratio
- **Progress Bars**: 100% width within cards, colored

---

# 6. TREATMENT LIST (Desktop 1920×1200)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ he  WAY MEDICAL              Search...                    he  Notifications  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│ TRAITEMENTS                                      [➕ Nouveau Traitement]     │
│ Suivi thérapeutique                                                         │
│ Médicaments et traitements partagés, avec lecture rapide des statuts        │
│                                                                                │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ FILTRES                                                                  │ │
│ ├──────────────────────────────────────────────────────────────────────────┤ │
│ │ PATIENT: [Search...]  │  STATUT: [Tous ▼]  │  [⟳ Réinitialiser]        │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                                │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│ │ ✓ 5      │ │ ⏸ 2     │ │ ✔ 8      │ │ ✗ 1      │                        │
│ │ Actifs   │ │ En pause │ │ Terminés │ │ Annulés  │                        │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘                        │
│                                                                                │
│ ┌────────────────────────┐ ┌────────────────────────┐ ┌────────────────────┐│
│ │ 💊 Amoxicilline        │ │ 💊 Lisinopril          │ │ 💊 Metformin       ││
│ │ Antibiotic             │ │ Blood Pressure         │ │ Diabetes           ││
│ │ [Active]               │ │ [Active]               │ │ [Paused]           ││
│ │                        │ │                        │ │                    ││
│ │ Patient: Marie Dupont  │ │ Patient: Marie Dupont  │ │ Patient: Marc Jean ││
│ │ Posologie: 500mg 2x    │ │ Posologie: 10mg 1x     │ │ Posologie: 500mg 2x││
│ │ Fréquence: Per day     │ │ Fréquence: Per day     │ │ Fréquence: Per day ││
│ │ Début: 15 Apr 2025     │ │ Début: 10 Apr 2025     │ │ Début: 20 Feb 2025 ││
│ │ Fin: 22 Apr 2025       │ │ Fin: —                 │ │ Fin: —             ││
│ │                        │ │                        │ │                    ││
│ │ [Voir]  [Modifier]     │ │ [Voir]  [Modifier]     │ │ [Voir]  [Modifier] ││
│ └────────────────────────┘ └────────────────────────┘ └────────────────────┘│
│                                                                                │
│ ┌────────────────────────┐ ┌────────────────────────┐ ┌────────────────────┐│
│ │ 💊 Aspirin             │ │ 💊 Omeprazole          │ │ 💊 Paracetamol     ││
│ │ Pain Relief            │ │ Gastric Acid           │ │ Pain Relief        ││
│ │ [Active]               │ │ [Completed]            │ │ [Cancelled]        ││
│ │                        │ │                        │ │                    ││
│ │ Patient: Claire Dupuis │ │ Patient: Paul Miller   │ │ Patient: Jean Duval││
│ │ Posologie: 500mg 3x    │ │ Posologie: 20mg 2x     │ │ Posologie: 1000mg  ││
│ │ Fréquence: Per day     │ │ Fréquence: Per day     │ │ Fréquence: 3x/day  ││
│ │ Début: 01 Jan 2025     │ │ Début: 15 Mar 2025     │ │ Début: 10 Jan 2025 ││
│ │ Fin: —                 │ │ Fin: 30 Apr 2025       │ │ Fin: 20 Jan 2025   ││
│ │                        │ │                        │ │                    ││
│ │ [Voir]  [Modifier]     │ │ [Voir]  [Modifier]     │ │ [Voir]  [Modifier] ││
│ └────────────────────────┘ └────────────────────────┘ └────────────────────┘│
│                                                                                │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Visual Specs:
- **Header**: Title + "Nouveau" button
- **Filter Card**: 3-column form (Patient search, Status select, Reset button)
- **KPI Strip**: 4-column grid with colored icons (green/amber/blue/red)
- **Treatment Cards**: 3-column grid, responsive to 2-col (tablet) and 1-col (mobile)
- **Card Structure**: Header (icon+name+badge) | Body (info grid) | Footer (2 buttons)

---

# Color Reference Guide

## Brand Colors in Context

```
BLUE GRADIENT (Primary)
┌─────────────────┐
│ #003d7a (Dark)  │  Logo top, text on light bg
│ #005cbb (Main)  │  Primary buttons, active states, focus rings
│ #e8f0fb (Light) │  Input focus background, card hover
│ #f0f5ff (Sub)   │  Page background accent, subtle backgrounds
└─────────────────┘

TEAL (Medical/Doctor)
┌─────────────────┐
│ #0369a1 (Dark)  │  Doctor card text
│ #0284c7 (Main)  │  Doctor icons, teal accents
│ #e0f2fe (Light) │  Doctor card backgrounds
└─────────────────┘

SEMANTIC COLORS
┌─────────────────────────────────┐
│ Success (Green)    #15803d      │  Checkmarks, approved status
│ Warning (Amber)    #d97706      │  Pending, paused status
│ Danger (Red)       #dc2626      │  Errors, cancelled status
│ Violet (Admin)     #6d28d9      │  Admin roles, admin cards
└─────────────────────────────────┘

NEUTRAL GRAYS
┌──────────────────────────────────┐
│ Text Strong        #07101f (Darkest)
│ Text Default       #0f1f35
│ Muted              #536580
│ Muted Light        #8fa3bc
│ Border             #d1dbe8
│ Border Light       #e4ecf5
│ Background         #f2f5f9
│ Surface            #ffffff
└──────────────────────────────────┘
```

---

# Responsive Breakpoints

## Desktop (1920px)
```
Full width layouts, 4-column grids, all content visible
```

## Tablet (768px)
```
2-column layouts, KPI cards 2×2, cards 2-col
Sidebar collapses, tables horizontal scroll
```

## Mobile (375px)
```
Single column, stacked cards, KPI cards 1-col with scroll
Forms full-width, buttons 100% width
Compact spacing, minimal white space
```

---

# Animation Examples

## Button Hover
```
Transform: scale(1.02)
Duration: 150ms
Easing: ease-out
Shadow: Increase opacity
```

## Card Hover
```
Transform: translateY(-2px)
Box-shadow: 0 8px 24px rgba(0, 92, 187, 0.12)
Duration: 180ms
Easing: ease
```

## Focus Ring
```
Outline: 2px solid #005cbb
Outline-offset: 2px
Animation: None (instant)
```

## Panel Entrance
```
From: opacity 0, translateY(20px)
To: opacity 1, translateY(0)
Duration: 300ms
Easing: ease-out
```

---

# Tools to Generate These Mockups

## Option 1: Figma (Recommended)
```
✓ Create all components as described
✓ Export as PNG/SVG
✓ Create interactive prototypes
✓ Share with team
```

## Option 2: Sketch
```
✓ Import components
✓ Export assets
✓ Collaborate in real-time
```

## Option 3: Adobe XD
```
✓ Full design system setup
✓ Prototyping & animations
✓ Developer handoff
```

## Option 4: Web-based Tools
```
- Penpot.app (open source, free)
- Webflow (design + frontend)
- Storybook (React components)
```

---

# Next Steps to Create Actual Images

### From This Document:

1. **Open Figma** (or design tool of choice)

2. **Use FIGMA_SETUP_GUIDE.md** to:
   - Create all component library
   - Set up pages and frames
   - Define typography & colors

3. **Use COMPONENT_SPECIFICATIONS.md** to:
   - Apply exact dimensions
   - Set precise spacing
   - Add all color tokens

4. **Export**:
   - Single frames as PNG (2x resolution)
   - Components as SVG
   - Interactive prototypes
   - Design specs PDF

5. **Share**:
   - Figma link (read-only)
   - PNG mockups (stakeholders)
   - PDF specs (developers)
   - Storybook (components)

---

## Quick Visual Summary

```
📱 5 Major Interfaces
├─ Login (2 screens: Tier selection + Form)
├─ Admin Dashboard (Full operational view)
├─ Appointment Booking (4-step wizard)
├─ Patient Dashboard (Personalized health view)
└─ Treatment List (Medication management)

🎨 Consistent Design System
├─ 5 primary colors (blue, teal, green, amber, red)
├─ 9 neutral grays (text to background)
├─ Typography scale (11px to 36px)
├─ Spacing scale (4px grid)
├─ 22 reusable components
└─ 3 responsive breakpoints

✨ Quality Standards
├─ WCAG 2.1 AA accessibility
├─ Smooth animations (180ms)
├─ Focus states on all interactive elements
├─ Consistent 18px border-radius
├─ Soft shadows throughout
└─ Mobile-first responsive design
```

