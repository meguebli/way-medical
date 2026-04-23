# WAY Medical — Figma Setup & Component Guide

## Quick Start

**File Setup**:
1. Create new file: "WAY Medical Design System"
2. Enable shared components library
3. Create pages per section (see structure below)
4. Use Figma variables for color tokens

---

## Figma File Organization

### Page 1: 📋 SETUP & TOKENS

#### Section 1.1: Color Library
Create color swatches as components:

```
Component: Color / Primary
├── Main (#005cbb)
├── Strong (#003d7a)
├── Light (#e8f0fb)
├── Subtle (#f0f5ff)
└── Dark (#002d5c)

Component: Color / Success (#15803d)
Component: Color / Warning (#d97706)
Component: Color / Danger (#dc2626)
Component: Color / Teal (#0284c7)
Component: Color / Violet (#6d28d9)
Component: Color / Neutrals (grays scale)
```

#### Section 1.2: Typography Scale
Create text styles:

```
Text Style: Display / Bold (32px, 800w, -0.02em)
Text Style: Headline / Bold (24px, 800w)
Text Style: Title / Bold (20px, 700w)
Text Style: Body / Regular (15px, 400w)
Text Style: Label / Bold (13px, 600w, uppercase)
Text Style: Small / Regular (11px, 400w)
Text Style: Code / Mono (12px, 400w, JetBrains)
```

#### Section 1.3: Spacing Scale
Create distance components (visual reference):

```
Spacing Grid (optional visual):
1 = 4px, 2 = 8px, 3 = 12px, 4 = 16px, 5 = 20px, 
6 = 24px, 8 = 32px, 10 = 40px, 12 = 48px
```

#### Section 1.4: Shadow Definitions
Create shadow styles:

```
Shadow / Card (0 2px 8px rgba(15, 31, 53, 0.06))
Shadow / Medium (0 4px 16px rgba(15, 31, 53, 0.08))
Shadow / Large (0 8px 32px rgba(15, 31, 53, 0.10))
Shadow / XL (0 16px 48px rgba(15, 31, 53, 0.12))
```

---

### Page 2: 🔧 SHARED COMPONENTS

#### 2.1 Button Component

**Master Component**: Button
```
Variants:
├── Variant: Style
│   ├── Primary (Blue bg, white text)
│   ├── Stroked (Blue border, blue text)
│   └── Text (No bg, blue text)
├── Variant: Size
│   ├── Large (44px height)
│   └── Small (36px height)
├── Variant: State
│   ├── Default
│   ├── Hover (shadow-md, -2px lift)
│   ├── Active (pressed effect)
│   └── Disabled (opacity 0.6)
└── Variant: Icon
    ├── With Icon Left
    └── Without Icon
```

**Create in Figma**:
1. Frame: "Button" (160×44px)
   - Background: Primary color variant
   - Text: Label (centered)
   - Optional icon (left-aligned, 18px)
2. Create component: "Button"
3. Right-click → Create component set
4. Add variants:
   - Create duplicate for "Stroked" variant
   - Create duplicate for "Text" variant
   - Create duplicates for size variants
   - Create hover/active/disabled states

#### 2.2 Input Field Component

**Master Component**: Input
```
Variants:
├── Type
│   ├── Text
│   ├── Email
│   ├── Password
│   └── Textarea
├── State
│   ├── Default (border #d1dbe8)
│   ├── Focus (border #005cbb, shadow)
│   ├── Error (border #dc2626, red text)
│   └── Disabled (opacity 0.5)
└── With Label
    ├── Label above (required)
    └── Placeholder inside (not alone)
```

**Create in Figma**:
1. Frame: "Input" (300×60px)
   - Label: "EMAIL" (11px, bold, uppercase)
   - Input field: 44px tall, 1.5px border
   - Placeholder text
   - Optional error message
2. Component: "Input"
3. Variants for each type and state

#### 2.3 Badge Component

**Master Component**: Badge
```
Variants:
├── Status
│   ├── Approved (green bg, green text)
│   ├── Pending (amber bg, amber text)
│   ├── Completed (blue bg, blue text)
│   ├── Cancelled (red bg, red text)
│   ├── Paused (amber bg, amber text)
│   └── Active (green bg, green text)
├── Role
│   ├── Admin (purple)
│   ├── Doctor (blue)
│   ├── Staff (teal)
│   └── Patient (green)
└── Size
    ├── Small (8×16px, fit-content)
    └── Medium (12×20px, fit-content)
```

**Create in Figma**:
1. Frame: "Badge" (auto-width, 24px height)
   - Background: Status color light
   - Text: Status color strong
   - Border: Status color light
   - Padding: 4px horizontal, 2px vertical
   - Border-radius: 6px
2. Component: "Badge"
3. Create variants for each status

#### 2.4 Card Component

**Master Component**: Card
```
Structure:
├── Card Header (optional)
│   ├── Title
│   ├── Subtitle (optional)
│   └── Action (optional)
├── Card Body (flexible)
│   └── Any content
└── Card Footer (optional)
    └── Buttons/actions

Variants:
├── With Header
├── Without Header
├── With Footer
└── Without Footer
```

**Create in Figma**:
1. Frame: "Card" (400×auto)
   - Background: #ffffff
   - Border: 1px #e4ecf5
   - Border-radius: 18px
   - Shadow: card
2. Internal structure:
   - Header section (24px padding, border-bottom)
   - Body section (24px padding)
   - Footer section (14px padding, border-top)
3. Component: "Card"
4. Make header, body, footer as component variants

#### 2.5 Avatar Component

**Master Component**: Avatar
```
Variants:
├── Size
│   ├── Small (32px)
│   ├── Medium (40px)
│   ├── Large (48px)
│   └── XL (64px)
├── Color
│   ├── Primary (blue bg, darker blue text)
│   ├── Teal (teal bg, dark teal text)
│   ├── Success (green bg, green text)
│   ├── Warning (amber bg, amber text)
│   └── Danger (red bg, red text)
└── Content
    ├── Initials (2 chars)
    └── Image (photo)
```

**Create in Figma**:
1. Frame: "Avatar" (48×48px)
   - Circle (48px diameter)
   - Background: Primary light
   - Centered text: "CD" (initials)
   - Text color: Primary strong
   - Border-radius: 50%
2. Component: "Avatar"
3. Create size variants (duplicate, resize)
4. Create color variants

#### 2.6 KPI Card Component

**Master Component**: KPI Card
```
Structure:
├── Icon (44×44px, colored bg)
├── Value (large number)
├── Label (text)
├── Change Indicator (↑/↓ + percent)
└── Accent Bar (bottom, 3px)

Variants:
├── Direction
│   ├── Up (green)
│   ├── Down (red)
│   └── Flat (gray)
└── Color
    ├── Primary (blue)
    ├── Teal (teal)
    ├── Success (green)
    └── Warning (amber)
```

**Create in Figma**:
1. Frame: "KPI Card" (240×160px)
   - Background: #ffffff
   - Border: 1px light
   - Border-radius: 18px
   - Padding: 20px
   - Shadow: card
2. Content layout:
   - Icon: 44×44, rounded, colored bg
   - Value: 30px, 800w, top-aligned
   - Label: 13px, muted, below value
   - Change: 11px, colored (up=green, down=red)
   - Bottom bar: 3px, accent color
3. Component: "KPI Card"

---

### Page 3: 🔐 LOGIN INTERFACE

#### Frame 3.1: Desktop / Tier Selection
- **Size**: 1280×800px
- **Content**:
  - Logo (top-center)
  - "Bienvenue" heading
  - 3-column tier card grid
  - Footer text

#### Frame 3.2: Desktop / Login Form
- **Size**: 1280×900px
- **Content**:
  - Logo
  - Form panel (520px wide, centered)
  - All form fields, buttons, error states

#### Frame 3.3: Login States
- **Back button focused**
- **Email field error**
- **Password field focused**
- **Form loading**
- **Error banner visible**

#### Frame 3.4: Mobile Tier Selection
- **Size**: 375×812px
- **Layout**: Single column, responsive

#### Frame 3.5: Mobile Login Form
- **Size**: 375×1200px
- **Layout**: Full-width form, stacked fields

**Tier Card Component** (used in 3.1):
```
Master: Tier Card
├── Icon (56px, colored bg)
├── Title (16px, bold)
├── Description (12px, muted)
├── Border: 1.5px #e4ecf5
├── Hover state: Blue border, blue shadow
└── Arrow icon (hide/show on hover)
```

**Form Input Variants** (used in 3.2):
```
Master: Form Input
├── Label "EMAIL" / "MOT DE PASSE" (11px, bold, uppercase)
├── Input field (44px height)
├── Focus: Blue border + 3px shadow
├── Error: Red border + error text
├── Password toggle icon (right side)
└── Error message (11px, red, below)
```

---

### Page 4: 📊 ADMIN DASHBOARD

#### Frame 4.1: Desktop Full Page
- **Size**: 1920×2400px (full scroll height)
- **Sections**:
  - Header (eyebrow + title + date)
  - KPI strip (4 cards, 1fr grid)
  - 2-column main grid
    - Appointment status (3×2 grid)
    - Revenue card (with chart)
  - Service performance table
  - Activity feed
  - Staff on duty
  - System alerts
  - Hourly chart

#### Frame 4.2: Status Count Card (Component)
```
Master: Status Count
├── Large number (30px, bold)
├── Status label (13px, muted)
├── Progress bar (bottom, 3px, colored)
└── Variants: Approved (green), Completed (blue), 
    Pending (amber), Cancelled (red), No-show (gray)
```

#### Frame 4.3: Revenue Card Detail
```
Components inside:
├── Revenue value (36px, bold, #07101f)
├── Breakdown items (left: service name, right: €value)
├── SVG line chart (300×100px)
└── Chart colors: Blue gradient
```

---

### Page 5: 🗓 APPOINTMENT BOOKING

#### Frame 5.1: Step 0 - Service Selection
- **Stepper** (4 steps, step 1 active)
- **Search input**
- **Service card grid** (4 columns, 3-4 cards)

#### Frame 5.2: Step 1 - Doctor Selection
- **Stepper** (step 2 active, step 1 done)
- **Doctor card grid** (3 columns)

#### Frame 5.3: Step 2 - Date & Time
- **Stepper** (step 3 active)
- **Mini calendar** (7×5 grid)
- **Time slots** (6-column button grid)

#### Frame 5.4: Step 3 - Confirmation
- **Stepper** (step 4 active, all done)
- **Summary sections** (service, doctor, datetime, reason)
- **Action buttons** (Cancel, Confirm)

#### Frame 5.5: Stepper Component (Master)
```
Master: Stepper (4 steps)
├── Step 1: Circle with "1" (or check if done)
├── Connector line
├── Step 2: Circle with "2"
├── Connector line
├── Step 3: Circle with "3"
├── Connector line
└── Step 4: Circle with "4"

Variants:
├── Current step (1, 2, 3, 4)
└── All states shown
```

#### Frame 5.6: Service Card Component
```
Master: Service Card
├── Icon (56px, colored bg)
├── Name (16px, bold)
├── Specialty (13px, muted)
├── Doctor count (11px)
├── Selected state: Blue border, check icon
└── Hover: Lift +2px, shadow-md
```

---

### Page 6: 💙 PATIENT DASHBOARD

#### Frame 6.1: Desktop Full Page
- **Size**: 1920×2000px
- **Sections**:
  - Hero (greeting + "Book Appointment" CTA)
  - Next appointment banner (blue gradient)
  - KPI strip (4 cards)
  - 2-column grid:
    - Left: Appointments + Consultations
    - Right: Treatments + Health Metrics

#### Frame 6.2: Next Appointment Banner
```
Layout:
├── Left: Icon (calendar, 52×52, white)
├── Center: Content
│   ├── "NEXT APPOINTMENT" (11px, uppercase)
│   ├── Appointment title (18px, bold, white)
│   └── Meta (time, doctor, location, white text)
└── Right: Action buttons
```

#### Frame 6.3: Health Metric Card
```
Master: Health Metric
├── Icon (32px, colored)
├── Value (24px, bold)
├── Unit (11px)
├── Label (13px, muted)
├── Trend indicator (↑/↓, green/red)
└── Reference range (11px, muted)
```

---

### Page 7: 💊 TREATMENT LIST

#### Frame 7.1: Desktop with Cards
- **Size**: 1920×1600px
- **Sections**:
  - Header
  - Filter card (3-col layout)
  - Status KPI strip (4 cards)
  - Treatment cards grid (3-4 columns)

#### Frame 7.2: Treatment Card Component
```
Master: Treatment Card
├── Header section
│   ├── Icon (40×40, teal bg)
│   ├── Name (16px, bold)
│   ├── Type (11px, muted)
│   └── Status badge (right)
├── Body section (info grid)
│   ├── Patient row
│   ├── Dosage row
│   ├── Frequency row
│   ├── Start date row
│   └── End date row (if exists)
└── Footer (2 buttons: Voir, Modifier)
```

---

## Figma Variables Setup

### Color Variables

In Figma Variables panel:
```
Collection: Colors

Group: Primary
  primary        → #005cbb
  primary-strong → #003d7a
  primary-light  → #e8f0fb
  primary-subtle → #f0f5ff

Group: Semantic
  success    → #15803d
  warning    → #d97706
  danger     → #dc2626
  teal       → #0284c7
  violet     → #6d28d9

Group: Neutral
  text        → #0f1f35
  text-strong → #07101f
  muted       → #536580
  border      → #d1dbe8
  surface     → #ffffff
  bg          → #f2f5f9
```

### Typography Variables

```
Collection: Typography

Group: Font Families
  sans-serif  → Inter
  mono        → JetBrains Mono

Group: Font Sizes
  xs   → 11px
  sm   → 13px
  base → 15px
  md   → 16px
  lg   → 18px
  xl   → 20px
  2xl  → 24px
  3xl  → 30px
  4xl  → 36px
```

---

## Component Naming Convention

**Format**: `ComponentName / Variant1 / Variant2 / State`

**Examples**:
```
Button / Primary / Large / Default
Button / Primary / Large / Hover
Button / Stroked / Small / Disabled

Input / Text / Default
Input / Password / Focus
Input / Textarea / Error

Badge / Status / Approved
Badge / Role / Admin

Card / With Header / With Footer
KPI Card / Success / Up

Tier Card / Patient
Doctor Card / Selection

Treatment Card / Main

Stepper / Step 3 Active
Service Card / Selected

Health Metric / Normal
Health Metric / Warning
```

---

## Prototype Interactions (Optional)

### Login Flow
1. **Tier Selection Frame** → Click Patient card → Navigate to Login Form
2. **Login Form** → Click "Back" → Navigate to Tier Selection
3. **Login Form** → Click "Se connecter" → Navigate to Success state
4. **Success state** → Show confirmation (optional)

### Booking Wizard
1. **Step 0** → Click service card → Step 1
2. **Step 1** → Click doctor card → Step 2
3. **Step 2** → Click time slot → Step 3
4. **Step 3** → Click "Confirm" → Success

### Dashboard Interactions
1. **Treatment Card** → Click "Modifier" → Navigate to edit view
2. **KPI Card** → Hover → Show tooltip (optional)
3. **Table Row** → Hover → Highlight row

---

## Design System Library Export

### For Developers
1. Export all components as SVG/PNG
2. Document prop names and variants
3. Create component inventory spreadsheet

### For Handoff
1. Share read-only Figma link
2. Use Figma "Share" with developer access
3. Include inspection mode enabled
4. Document spacing/colors with CSS values

---

## Quality Checklist

- [ ] All components have at least 3 states (default, hover, disabled)
- [ ] All text uses defined typography styles
- [ ] All colors use color variables
- [ ] All spacing uses a consistent scale
- [ ] All shadows use defined shadow styles
- [ ] Components have descriptive names
- [ ] Variants are clearly labeled
- [ ] Documentation comments added to complex components
- [ ] Accessibility considerations noted
- [ ] Responsive variants exist for mobile/tablet
- [ ] Component library is locked (prevent accidental edits)
- [ ] Exported to developer-friendly format (SVG/PNG)

---

## Tips for Maintaining Design System

1. **Use Auto Layout** for flexible spacing
2. **Create component variants** for all states
3. **Use constraints** for responsive design
4. **Document in comments** why specific decisions
5. **Version your library** (v1.0, v2.0, etc.)
6. **Regular audits** to keep consistency
7. **Update all instances** when component changes
8. **Use Figma Dev Mode** for developer handoff
9. **Link to codebase** documentation
10. **Stakeholder approval** before major changes

---

## Resources

- **Figma Design System Guide**: https://help.figma.com/en/articles/8086508-Guide-to-design-systems-in-Figma
- **Component Variants Tutorial**: https://help.figma.com/en/articles/8086509-Component-variants
- **Variables Guide**: https://help.figma.com/en/articles/14506821-Figma-variables
- **Dev Mode Docs**: https://help.figma.com/en/articles/15023356-Dev-Mode

