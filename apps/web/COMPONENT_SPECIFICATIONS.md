# WAY Medical — Component Specifications Quick Reference

## Quick Component Specs for Each Interface

---

# 1. LOGIN INTERFACE COMPONENTS

## Component: Tier Card (3 Variants)

### Patient Tier Card
```
Dimensions: 160-240px width × 200px min height (responsive)
Layout: Vertical flex, center-aligned
Spacing: 12px gaps between elements

Elements:
├── Icon Container
│   ├─ Size: 56×56px
│   ├─ Background: #e8f0fb (--wm-primary-light)
│   ├─ Border-radius: 12px
│   ├─ Content: Person icon, 28px, #003d7a (--wm-primary-strong)
│
├── Title
│   ├─ Font: Inter, 16px, 600w
│   ├─ Color: #07101f (--wm-text-strong)
│   └─ Line-height: 1.4
│
├── Description
│   ├─ Font: Inter, 12px, 400w
│   ├─ Color: #536580 (--wm-muted)
│   ├─ Line-height: 1.5
│   └─ Max-width: 90%
│
└── Arrow Icon (Hidden by default)
    ├─ Size: 18px
    ├─ Color: #005cbb (--wm-primary)
    ├─ Position: Absolute (top: 10px, right: 10px)
    └─ Opacity: 0 (0.3s ease on hover)

Card Container:
├─ Border: 1.5px solid #e4ecf5 (--wm-border-light)
├─ Border-radius: 16px
├─ Background: #ffffff (--wm-surface)
├─ Padding: 24px 16px
├─ Box-shadow: None (default), 0 8px 24px rgba(0,92,187,0.12) on hover
├─ Cursor: Pointer
├─ Transition: all 180ms ease
└─ Transform: None (default), translateY(-2px) on hover

States:
├─ Default: Light border, no shadow
├─ Hover: Blue border (#005cbb), shadow-lg, lift -2px, arrow visible
├─ Active: Blue border, filled background (#f0f5ff)
└─ Focus: 2px outline in primary color

Doctor/Admin variants: Same structure, different colors
├─ Doctor: Icon BG #e0f2fe, icon #0369a1, border hover #0284c7
└─ Admin: Icon BG #ede9fe, icon #6d28d9, border hover #6d28d9
```

## Component: Form Input (Text & Password)

### Email Input
```
Dimensions: Full width (300px+ on desktop, 100% on mobile) × 60px total height

Structure:
├─ Label Container (height: 28px)
│   ├─ Text: "EMAIL"
│   ├─ Font: Inter, 11px, 600w, uppercase, 0.05em letter-spacing
│   ├─ Color: #536580 (--wm-muted)
│   └─ Margin-bottom: 8px
│
├─ Input Container (height: 44px, relative)
│   ├─ Border: 1.5px solid #d1dbe8 (--wm-border)
│   ├─ Border-radius: 10px
│   ├─ Background: #ffffff (--wm-surface)
│   ├─ Padding: 10px 14px
│   ├─ Font: Inter, 13px, 400w
│   ├─ Color: #0f1f35 (--wm-text)
│   └─ Transition: border-color 180ms, box-shadow 180ms
│
└─ Error Message (height: 20px, optional)
    ├─ Font: Inter, 11px, 500w
    ├─ Color: #dc2626 (--wm-danger)
    └─ Margin-top: 4px

States:
├─ Default
│   ├─ Border: #d1dbe8
│   ├─ Shadow: None
│   └─ Cursor: Text
│
├─ Focus
│   ├─ Border: #005cbb (--wm-primary)
│   ├─ Shadow: 0 0 0 3px rgba(0, 92, 187, 0.12)
│   └─ Outline: None
│
├─ Error (Invalid Email)
│   ├─ Border: #dc2626 (--wm-danger)
│   ├─ Shadow: 0 0 0 3px rgba(220, 38, 38, 0.12)
│   └─ Error message visible
│
└─ Disabled
    ├─ Background: #f8fafc (--wm-bg-soft)
    ├─ Opacity: 0.5
    └─ Cursor: Not-allowed

Placeholder:
├─ Color: #a8b8cc (--wm-placeholder)
├─ Font: Same as input
└─ Opacity: 0.6
```

### Password Input (Variant)
```
Same as Email, plus:

Toggle Icon (right side):
├─ Position: Absolute, right: 12px, top: 34px
├─ Icon: visibility (18px) or visibility_off
├─ Color: #8fa3bc (--wm-muted-light)
├─ Cursor: Pointer
├─ Transition: color 180ms
├─ Hover color: #005cbb (--wm-primary)
└─ Background: None, padding: 4px

Behavior:
├─ Default: type="password" (masked)
├─ Click toggle: type="text" (visible)
└─ Toggle again: type="password" (masked)
```

## Component: Credentials Info Box (Dynamic Color)

### Patient Variant
```
Dimensions: Full width × auto height
Padding: 14px
Border-radius: 10px
Background: #e8f0fb (--wm-primary-light)
Border: 1px solid #e8f0fb

Content:
├─ Title
│   ├─ Font: Inter, 11px, 700w, uppercase, 0.05em letter-spacing
│   ├─ Color: #003d7a (--wm-primary-strong)
│   └─ Margin-bottom: 8px
│
├─ Row 1 (Email)
│   ├─ Label: "Email:" (font: 600w, color: primary-strong)
│   ├─ Code: "marie.dupont@mail.fr"
│   │   ├─ Font: JetBrains Mono, 11px, 400w
│   │   ├─ Background: rgba(0,0,0,0.08)
│   │   ├─ Padding: 3px 7px
│   │   └─ Border-radius: 4px
│   └─ Layout: flex, space-between
│
└─ Row 2 (Password)
    ├─ Label: "Mdp:" (600w, primary-strong)
    ├─ Code: "ChangeMe123!"
    └─ Same styling as Email row

Doctor variant:
├─ Background: #e0f2fe (--wm-teal-light)
├─ Border: #e0f2fe
├─ Text color: #0369a1 (--wm-teal-dark)
└─ Email: "e.fontaine@clinic.fr"

Admin variant:
├─ Background: #ede9fe (--wm-violet-light)
├─ Border: #ede9fe
├─ Text color: #6d28d9 (--wm-violet)
└─ Email: "c.dupuis@clinic.fr"
```

## Component: Error Banner

```
Dimensions: Full width × 48px minimum
Padding: 12px 14px
Border-radius: 10px
Background: #fee2e2 (--wm-danger-light)
Border: 1px solid #fecaca (--wm-danger-border)

Layout: Flex, center-aligned, gap: 10px

Elements:
├─ Icon
│   ├─ Icon: error
│   ├─ Size: 18px
│   ├─ Color: #dc2626 (--wm-danger)
│   └─ Flex-shrink: 0
│
└─ Message Text
    ├─ Font: Inter, 13px, 500w
    ├─ Color: #dc2626 (--wm-danger)
    ├─ Line-height: 1.5
    └─ Flex: 1

Animation (on mount):
├─ From: Opacity 0, translateY(-10px)
├─ To: Opacity 1, translateY(0)
└─ Duration: 200ms ease-out

Message Examples:
├─ "Connexion échouée. Vérifiez vos identifiants ou l'état du serveur."
├─ "Email invalide"
└─ "Mot de passe incorrect"
```

---

# 2. ADMIN DASHBOARD COMPONENTS

## Component: KPI Card (4 Variants)

### Base KPI Card
```
Dimensions: Responsive, ~240×160px on desktop, 100% on mobile
Padding: 20px 24px
Border: 1px solid #e4ecf5 (--wm-border-light)
Border-radius: 18px
Background: #ffffff (--wm-surface)
Box-shadow: 0 2px 8px rgba(15, 31, 53, 0.06) (--sh-card)
Transition: box-shadow 180ms, transform 180ms
Overflow: hidden (for accent bar)

Layout: Flex column, gap: 0

Elements:
├─ Icon Container
│   ├─ Size: 44×44px
│   ├─ Border-radius: 14px
│   ├─ Background: Colored light variant
│   ├─ Display: Flex, align-items: center, justify-content: center
│   ├─ Margin-bottom: 12px
│   └─ Icon: 22px, colored strong
│
├─ Value
│   ├─ Font: Inter, 30px, 800w
│   ├─ Color: #07101f (--wm-text-strong)
│   ├─ Line-height: 1
│   ├─ Letter-spacing: -0.03em
│   ├─ Margin-bottom: 4px
│   └─ Example: "1,248"
│
├─ Label
│   ├─ Font: Inter, 13px, 500w
│   ├─ Color: #536580 (--wm-muted)
│   ├─ Margin-bottom: 8px
│   └─ Example: "Active Patients"
│
├─ Change Indicator
│   ├─ Font: Inter, 11px, 600w
│   ├─ Padding: 2px 7px
│   ├─ Border-radius: 9999px
│   ├─ Display: Inline-flex
│   ├─ Gap: 3px
│   ├─ Margin-top: 8px
│   ├─ Icon: 12px
│   ├─ Variants:
│   │   ├─ Up: Background #dcfce7, Color #15803d
│   │   ├─ Down: Background #fee2e2, Color #dc2626
│   │   └─ Flat: Background #f1f5f9, Color #536580
│   └─ Example: "↑ +23 this week"
│
└─ Accent Bar
    ├─ Position: Absolute, bottom: 0, left: 0, right: 0
    ├─ Height: 3px
    ├─ Background: Accent color (varies per KPI type)
    ├─ Border-radius: 0 0 18px 18px
    └─ Example: Blue for patients, Green for revenue

States:
├─ Default: As described
├─ Hover: Box-shadow → 0 4px 16px, transform: translateY(-1px)
└─ Focus: Outline: 2px solid primary

Color Variants:
├─ Patients (Icon BG: #e8f0fb, Icon: #003d7a, Bar: #005cbb)
├─ Appointments (Icon BG: #e0f2fe, Icon: #0369a1, Bar: #0284c7)
├─ Revenue (Icon BG: #dcfce7, Icon: #15803d, Bar: #15803d)
└─ Staff (Icon BG: #fef3c7, Icon: #b45309, Bar: #d97706)
```

## Component: Status Count Card

```
Dimensions: Auto, min 140px width × auto height
Padding: 0
Border: None
Background: Transparent

Layout: Text center

Elements:
├─ Number (Count)
│   ├─ Font: Inter, 30px, 800w
│   ├─ Color: #07101f (--wm-text-strong)
│   ├─ Line-height: 1
│   ├─ Letter-spacing: -0.03em
│   ├─ Margin-bottom: 8px
│   └─ Example: "52"
│
├─ Label
│   ├─ Font: Inter, 13px, 500w
│   ├─ Color: #536580 (--wm-muted)
│   ├─ Example: "Approved"
│   └─ Margin-bottom: 12px
│
└─ Progress Bar
    ├─ Height: 3px (at bottom)
    ├─ Background: Semantic color
    ├─ Width: 100%
    ├─ Border-radius: 0 0 6px 6px
    └─ No container, inline bar

Variants:
├─ Approved: Bar color #15803d (--wm-success)
├─ Completed: Bar color #005cbb (--wm-primary)
├─ Pending: Bar color #d97706 (--wm-warning)
├─ Cancelled: Bar color #dc2626 (--wm-danger)
├─ No-show: Bar color #8fa3bc (--wm-muted-light)
└─ Requested: Bar color #0284c7 (--wm-teal)
```

## Component: Service Performance Table Row

```
Dimensions: Full-width table row, 56px height
Border-bottom: 1px solid #e4ecf5 (--wm-border-light)

Cells (7 total):
├─ 1. Service Icon + Name (flex, 220px)
│   ├─ Icon: 30×30px, border-radius 10px, colored
│   ├─ Name: Inter, 13px, 600w, color primary-strong
│   └─ Layout: flex, gap 10px, align-items center
│
├─ 2. Specialty (flex: 1, 120px min)
│   ├─ Content: Chip/badge format
│   ├─ Background: Primary light
│   ├─ Text: 11px, primary-strong, uppercase
│   └─ Padding: 4px 8px
│
├─ 3. Establishment (flex: 1, 200px)
│   ├─ Font: Inter, 13px, 400w
│   ├─ Color: #536580 (--wm-muted)
│   └─ White-space: nowrap
│
├─ 4. Doctors Count (flex: 1, 80px)
│   ├─ Font: Inter, 13px, 600w
│   └─ Color: #0f1f35 (--wm-text)
│
├─ 5. Avg. Wait (flex: 1, 80px)
│   ├─ Font: Inter, 13px, 400w
│   └─ Color: #536580 (--wm-muted)
│
├─ 6. Monthly Apts (flex: 1, 150px)
│   ├─ Layout: flex, align-items center, gap 8px
│   ├─ Progress bar: 60px width, 4px height, blue
│   ├─ Count: 13px, 600w, dark text
│   └─ Bar color: #005cbb (--wm-primary)
│
└─ 7. Status (flex: 1, 80px)
    ├─ Badge: .badge.badge-active
    ├─ Background: #dcfce7, Text: #15803d
    ├─ Border: 1px solid success-border
    └─ Font: 11px, 600w

Row Hover:
├─ Background: #f0f5ff (--wm-primary-subtle)
├─ Transition: 180ms ease
└─ Cursor: Pointer
```

---

# 3. APPOINTMENT BOOKING WIZARD COMPONENTS

## Component: Stepper (4 Steps)

```
Dimensions: Full-width × auto height (min 120px)
Padding: 20px 0
Margin-bottom: 32px

Structure:
├─ Step Track Container
│   ├─ Layout: Grid, 7 columns (step, connector, step, connector, step, connector, step)
│   ├─ Gap: 0 (connectors span between steps)
│   └─ Align-items: center
│
├─ Step Item (repeats 4 times)
│   ├─ Layout: Flex column, align-items center, gap 8px
│   ├─ Width: auto
│   │
│   ├─ Step Circle
│   │   ├─ Size: 48×48px
│   │   ├─ Border-radius: 50%
│   │   ├─ Display: flex, align-items center, justify-content center
│   │   ├─ Font: Inter, 18px, 600w
│   │   ├─ States (color variants):
│   │   │   ├─ Future: Border 2px #e4ecf5, background #ffffff, number gray
│   │   │   ├─ Current: Background #005cbb, color white, shadow-md
│   │   │   └─ Done: Background #15803d, color white, icon: checkmark
│   │   └─ Content: Step number OR checkmark icon (18px)
│   │
│   ├─ Step Info
│   │   ├─ Text-align: center
│   │   │
│   │   ├─ Step Label
│   │   │   ├─ Font: Inter, 13px, 600w
│   │   │   ├─ Color (states):
│   │   │   │   ├─ Future: #8fa3bc (--wm-muted-light)
│   │   │   │   ├─ Current: #005cbb (--wm-primary)
│   │   │   │   └─ Done: #15803d (--wm-success)
│   │   │   └─ Example: "Services"
│   │   │
│   │   └─ Step Subtitle
│   │       ├─ Font: Inter, 11px, 400w
│   │       ├─ Color: #536580 (--wm-muted)
│   │       └─ Example: "Select Service"
│   │
│   └─ Min-width: 100px (for mobile wrap)
│
└─ Step Connector (between steps)
    ├─ Layout: Flex, 1 (flex-grow)
    ├─ Height: 2px
    ├─ Background: Done step? #15803d : #e4ecf5
    ├─ Transition: background 300ms ease
    ├─ Margin: 0 10px
    └─ Min-width: 40px (responsive)

Animation:
├─ Check icon bounce (when step completes): scale(0.8) → scale(1.1), 200ms
├─ Number fade-out, check fade-in: 150ms cross-fade
└─ Connector color change: 300ms ease
```

## Component: Service Card (Selection)

```
Dimensions: Responsive (4 cols desktop, 3 cols tablet, 1 col mobile) × auto height
Min-width: 160px

Container:
├─ Border: 1.5px solid #e4ecf5 (--wm-border-light)
├─ Border-radius: 16px
├─ Background: #ffffff (--wm-surface)
├─ Padding: 20px 16px
├─ Cursor: Pointer
├─ Transition: all 180ms ease
├─ Position: relative

Layout: Flex column, gap 10px, align-items center

Elements:
├─ Icon Container
│   ├─ Size: 56×56px
│   ├─ Border-radius: 12px
│   ├─ Background: Colored light (varies per service)
│   ├─ Display: flex, align-items center, justify-content center
│   ├─ Icon: 28px, colored strong
│   └─ Margin-bottom: 4px
│
├─ Service Name
│   ├─ Font: Inter, 16px, 600w
│   ├─ Color: #07101f (--wm-text-strong)
│   ├─ Text-align: center
│   └─ Example: "Cardiology"
│
├─ Specialty
│   ├─ Font: Inter, 13px, 400w
│   ├─ Color: #536580 (--wm-muted)
│   ├─ Text-align: center
│   └─ Example: "Cardiac Care"
│
├─ Doctor Count
│   ├─ Font: Inter, 11px, 400w
│   ├─ Color: #536580 (--wm-muted)
│   ├─ Layout: flex, gap 4px, justify-content center
│   ├─ Icon: people (14px)
│   └─ Example: "3 doctors available"
│
└─ Checkmark Icon (top-right, hidden by default)
    ├─ Size: 24px
    ├─ Color: #005cbb (--wm-primary)
    ├─ Position: Absolute, top 8px, right 8px
    ├─ Opacity: 0 (1 on selected state)
    └─ Transition: opacity 150ms

States:
├─ Default
│   ├─ Border: #e4ecf5
│   ├─ Shadow: None
│   └─ Background: White
│
├─ Hover
│   ├─ Border: #005cbb (--wm-primary)
│   ├─ Shadow: 0 8px 24px rgba(0, 92, 187, 0.12)
│   ├─ Transform: translateY(-2px)
│   └─ Checkmark opacity: 0.3
│
├─ Selected
│   ├─ Border: #005cbb (--wm-primary)
│   ├─ Background: #f0f5ff (--wm-primary-subtle)
│   ├─ Shadow: 0 8px 24px rgba(0, 92, 187, 0.12)
│   └─ Checkmark opacity: 1
│
└─ Focus
    ├─ Outline: 2px solid primary
    └─ Outline-offset: 2px

Service Color Variants:
├─ Cardiology: BG #fee2e2, Icon #dc2626
├─ General Medicine: BG #e8f0fb, Icon #005cbb
├─ Radiology: BG #e0f2fe, Icon #0284c7
└─ Dermatology: BG #fef3c7, Icon #d97706
```

---

# 4. PATIENT DASHBOARD COMPONENTS

## Component: Health Metric Card

```
Dimensions: Auto, square aspect (120×120px recommended)
Border: None
Background: Transparent
Padding: 0

Layout: Flex column, center-aligned, gap 2px

Elements:
├─ Icon
│   ├─ Size: 32px
│   ├─ Color: Metric-specific (HR: red, BP: orange, etc.)
│   ├─ Margin-bottom: 4px
│   └─ Icons: favorite (HR), favorite (BP), scale (Weight), thermometer (Temp)
│
├─ Value
│   ├─ Font: Inter, 24px, 800w
│   ├─ Color: #07101f (--wm-text-strong)
│   ├─ Line-height: 1
│   ├─ Letter-spacing: -0.02em
│   └─ Example: "72"
│
├─ Unit
│   ├─ Font: Inter, 11px, 400w
│   ├─ Color: #536580 (--wm-muted)
│   └─ Example: "bpm"
│
├─ Label
│   ├─ Font: Inter, 13px, 500w
│   ├─ Color: #536580 (--wm-muted)
│   ├─ Margin-top: 2px
│   └─ Example: "Heart Rate"
│
├─ Trend Indicator
│   ├─ Icon: ↑ (trending_up) or ↓ (trending_down)
│   ├─ Size: 16px
│   ├─ Color (states):
│   │   ├─ Up/Normal: #15803d (--wm-success)
│   │   └─ Down/Warning: #dc2626 (--wm-danger)
│   └─ Margin-top: 4px
│
└─ Reference Range (optional)
    ├─ Font: Inter, 10px, 400w
    ├─ Color: #8fa3bc (--wm-muted-light)
    ├─ Example: "(60-100)"
    └─ Margin-top: 2px

States:
├─ Normal (all values in range)
│   ├─ Icon color: Primary/Teal
│   ├─ Trend: Green
│   └─ Background: None
│
├─ Warning (out of range)
│   ├─ Background: #fef3c7 (--wm-warning-light)
│   ├─ Border: 1px #fde68a (--wm-warning-border)
│   ├─ Border-radius: 12px
│   ├─ Padding: 12px
│   ├─ Icon color: #d97706 (--wm-warning)
│   └─ Trend: Red (↓)
│
└─ Danger (critical)
    ├─ Background: #fee2e2 (--wm-danger-light)
    ├─ Border: 1px #fecaca
    ├─ Icon color: #dc2626 (--wm-danger)
    └─ Trend: Red (↓)

Metric Variants:
├─ Heart Rate: Icon #dc2626, range (60-100 bpm)
├─ Blood Pressure: Icon #d97706, range (120/80 mmHg)
├─ Weight: Icon #0284c7, range (68-72 kg)
└─ Temperature: Icon #15803d, range (36.5-37.5°C)
```

---

# 5. TREATMENT LIST COMPONENTS

## Component: Treatment Card

```
Dimensions: Responsive (3 cols desktop, 2 cols tablet, 1 col mobile) × auto height
Min-width: 320px
Max-width: 380px on desktop

Container:
├─ Display: Flex, flex-direction column
├─ Background: #ffffff (--wm-surface)
├─ Border: 1px solid #e4ecf5 (--wm-border-light)
├─ Border-radius: 18px
├─ Overflow: hidden
├─ Box-shadow: 0 2px 8px rgba(15, 31, 53, 0.06)
├─ Transition: box-shadow 180ms, transform 180ms
└─ Padding: 0

Structure (3 sections):

1. Header Section
├─ Padding: 20px 24px
├─ Border-bottom: 1px solid #e4ecf5 (--wm-border-light)
├─ Display: flex, align-items center, gap 12px
├─ Flex: 0 0 auto
│
├─ Icon Container
│   ├─ Size: 40×40px
│   ├─ Border-radius: 10px
│   ├─ Background: #e0f2fe (--wm-teal-light)
│   ├─ Display: flex, align-items center, justify-content center
│   ├─ Icon: medication (20px), color #0284c7 (--wm-teal)
│   └─ Flex-shrink: 0
│
├─ Content (flex: 1)
│   ├─ Name
│   │   ├─ Font: Inter, 16px, 600w
│   │   ├─ Color: #07101f (--wm-text-strong)
│   │   └─ Margin-bottom: 2px
│   │
│   └─ Type
│       ├─ Font: Inter, 11px, 400w
│       ├─ Color: #536580 (--wm-muted)
│       └─ Margin-top: 2px
│
└─ Status Badge (flex-shrink: 0)
    └─ see Badge component specs

2. Body Section
├─ Padding: 20px 24px
├─ Flex: 1
├─ Display: grid, gap 10px, grid-template-columns 1fr
│
├─ Info Row 1: Patient
│   ├─ Left: Label "Patient" (13px, muted, left-aligned)
│   ├─ Right: Value (13px, 500w, text-strong, right-aligned)
│   └─ Display: flex, justify-content space-between
│
├─ Info Row 2: Posologie
│   └─ Same structure as Row 1
│
├─ Info Row 3: Frequency
│   └─ Same structure as Row 1
│
├─ Info Row 4: Start Date
│   └─ Same structure as Row 1
│
└─ Info Row 5: End Date (conditional, only if endDate exists)
    └─ Same structure as Row 1

3. Footer Section
├─ Padding: 14px 24px
├─ Border-top: 1px solid #e4ecf5
├─ Display: flex, gap 8px
├─ Flex: 0 0 auto
│
├─ Button: "Voir" (Stroked)
│   ├─ Flex: 1
│   ├─ Font-size: 11px (override button default)
│   ├─ Icon: visibility (16px)
│   ├─ Border: 1px solid #d1dbe8
│   ├─ Height: 36px
│   └─ Content: Icon + text
│
└─ Button: "Modifier" (Primary)
    ├─ Flex: 1
    ├─ Font-size: 11px
    ├─ Icon: edit (16px)
    ├─ Background: #005cbb, white text
    ├─ Height: 36px
    └─ Content: Icon + text

States:
├─ Default: Shadow-card
├─ Hover: Shadow-md, transform translateY(-1px)
└─ Focus: Outline around card container

Treatment Status Badge Variants:
├─ Active: Background #dcfce7, text #15803d
├─ Paused: Background #fef3c7, text #b45309
├─ Completed: Background #e8f0fb, text #003d7a
└─ Cancelled: Background #fee2e2, text #dc2626
```

---

# 6. FORM ELEMENTS (SHARED)

## Component: Select Dropdown

```
Dimensions: Full width (or constrained) × 44px
Border: 1.5px solid #d1dbe8 (--wm-border)
Border-radius: 10px
Background: #ffffff (--wm-surface)
Padding: 10px 14px
Font: Inter, 13px, 400w
Color: #0f1f35 (--wm-text)
Cursor: Pointer

Label (above, not inside):
├─ Font: Inter, 11px, 600w, uppercase, 0.05em
├─ Color: #536580 (--wm-muted)
└─ Margin-bottom: 8px

States:
├─ Default: Border #d1dbe8, no shadow
├─ Focus: Border #005cbb, shadow 0 0 0 3px rgba(0,92,187,0.12)
├─ Hover: Cursor pointer, no style change
└─ Disabled: Background #f8fafc, opacity 0.5

Options:
├─ Background: #ffffff
├─ Hover: #f0f5ff
├─ Selected: Background primary-light, text primary-strong
├─ Font: Inter, 13px, 400w
├─ Padding: 8px 12px
└─ Min-height: 36px
```

## Component: Text Area

```
Dimensions: Full width × min-height 120px
Border: 1.5px solid #d1dbe8
Border-radius: 10px
Background: #ffffff
Padding: 12px 14px
Font: Inter, 13px, 400w, line-height 1.5
Color: #0f1f35
Resize: vertical
Family: Monospace if code input, sans-serif if text

States:
├─ Default: Border #d1dbe8
├─ Focus: Border #005cbb, shadow 0 0 0 3px rgba(0,92,187,0.12)
├─ Error: Border #dc2626, shadow red
└─ Disabled: Background soft gray, opacity 0.5

Placeholder:
├─ Color: #a8b8cc
└─ Font: Same as input
```

---

# Summary Table

| Component | Purpose | Figma Type | Variants | States |
|-----------|---------|-----------|----------|--------|
| Button | CTA element | Master | Primary/Stroked/Text + Size + Icon | Default/Hover/Active/Disabled |
| Input | Form field (text) | Master | Type (text/email/password) | Default/Focus/Error/Disabled |
| Badge | Status label | Master | Role/Status | Color variants |
| Card | Container | Master | Header/Footer options | Default/Hover |
| KPI Card | Metric display | Master | Color variants | Up/Down/Flat |
| Avatar | User icon | Master | Size/Color | Photo/Initials |
| Tier Card | Tier selector | Master | Patient/Doctor/Admin | Default/Hover/Selected |
| Service Card | Service selector | Master | Color per service | Default/Hover/Selected |
| Doctor Card | Doctor selector | Master | Photo+info | Default/Hover/Selected |
| Treatment Card | Treatment item | Master | Status variants | Default/Hover |
| Health Metric | Health value | Master | Metric types | Normal/Warning/Danger |
| Stepper | Progress indicator | Master | 4 steps | Future/Current/Done |
| Select | Dropdown | Master | Text/Icon | Default/Focus/Disabled |
| Textarea | Multi-line input | Master | Default/Code | Default/Focus/Error |

---

All components follow these principles:
- ✅ Use CSS custom properties for colors
- ✅ Consistent spacing scale (4px base)
- ✅ Smooth transitions (180ms default)
- ✅ Accessible focus states
- ✅ Mobile-responsive
- ✅ Semantic color usage
- ✅ Clear visual hierarchy

