# WAY Medical — Technical UX/UI & Figma Documentation

## Document Overview

Complete technical specifications for all WAY Medical interfaces with:
- Component breakdown & hierarchy
- Figma structure (frames, components, variants)
- Responsive design specifications
- Interaction & animation details
- Color, typography, spacing tokens
- Accessibility guidelines

---

# 1. LOGIN INTERFACE

## 1.1 Component Hierarchy

```
LoginComponent
├── .login-wrapper (full-height container)
│   ├── .login-header (logo section)
│   │   └── .logo
│   │       ├── .logo-icon (48×48 gradient badge)
│   │       └── .logo-text
│   │           ├── .logo-brand (24px, 800w)
│   │           └── .logo-sub (12px, uppercase)
│   ├── .login-container (max-width 520px)
│   │   └── .login-panel (slide-up animation)
│   │       ├── Step 1: Tier Selection (.tier-grid)
│   │       │   ├── .tier-card (3 variants: patient/doctor/admin)
│   │       │   │   ├── .tier-icon
│   │       │   │   ├── .tier-name
│   │       │   │   ├── .tier-desc
│   │       │   │   └── .tier-arrow (hover reveal)
│   │       │   ├── .tier-card (variant)
│   │       │   └── .tier-card (variant)
│   │       └── Step 2: Login Form
│   │           ├── .back-btn
│   │           ├── h1 + .subtitle
│   │           ├── .login-form
│   │           │   ├── .form-group (email)
│   │           │   │   ├── .form-label
│   │           │   │   ├── .form-input
│   │           │   │   └── .error-msg
│   │           │   ├── .form-group (password)
│   │           │   │   ├── .form-label
│   │           │   │   ├── .form-input
│   │           │   │   ├── .toggle-pwd
│   │           │   │   └── .error-msg
│   │           │   ├── .credentials-info (.info-patient|doctor|admin)
│   │           │   ├── .error-banner (conditional)
│   │           │   ├── .submit-btn
│   │           │   ├── .form-divider
│   │           │   └── .demo-access
│   │           │       └── .demo-btn
│   └── .login-footer
```

## 1.2 Figma Structure

### Frames
```
📱 Login
├── 🖼 Desktop / Tier Selection
│   ├── Logo
│   ├── Heading "Bienvenue"
│   ├── Grid (1280px)
│   │   ├── Card / Patient
│   │   ├── Card / Doctor
│   │   └── Card / Admin
│   └── Footer
├── 🖼 Desktop / Login Form
│   ├── Logo
│   ├── Panel (520px)
│   │   ├── Back Button
│   │   ├── Heading + Subtitle
│   │   ├── Form
│   │   │   ├── Input / Email
│   │   │   ├── Input / Password (with toggle)
│   │   │   ├── Credentials Box (Patient/Doctor/Admin)
│   │   │   ├── Error Banner (conditional)
│   │   │   ├── Button / Primary (Submit)
│   │   │   ├── Divider
│   │   │   └── Button / Secondary (Quick Access)
│   │   └── Footer
│   └── State Variations
│       ├── Valid Form
│       ├── Invalid Form (email error)
│       ├── Invalid Form (password error)
│       ├── Loading State
│       └── Error State
└── 📱 Mobile (375px)
    ├── Tier Selection (1-col grid)
    ├── Login Form (full-width)
    └── All states as above
```

### Components to Create

#### C1: Tier Card Component
- **Variants**: Patient, Doctor, Admin
- **States**: Default, Hover, Active
- **Properties**:
  - Icon (person/medical_services/admin_panel_settings)
  - Icon Background Color (primary/teal/violet light)
  - Icon Color (primary/teal/violet strong)
  - Title text
  - Description text
- **Dimensions**: Min 160px × 200px (auto-fit grid)
- **Interactions**: Hover lift (+2px), border color change

#### C2: Form Input
- **Variants**: Text, Password
- **States**: Default, Focus, Error, Disabled
- **Properties**:
  - Label text (uppercase, 11px)
  - Placeholder text
  - Border color (default: `--wm-border`, focus: `--wm-primary`, error: `--wm-danger`)
  - Value text
- **Dimensions**: Full width, 44px height
- **Focus Ring**: 3px shadow, 180ms transition

#### C3: Button
- **Variants**: Primary, Stroked, Text
- **States**: Default, Hover, Active, Disabled
- **Sizes**: 44px (large), 36px (small)
- **Properties**:
  - Icon (left-aligned)
  - Label text
  - Loading spinner
- **Colors**: 
  - Primary: Blue background, white text
  - Stroked: Blue border, blue text, white background
  - Text: No background, blue text

#### C4: Credentials Info Box
- **Variants**: Patient (blue), Doctor (teal), Admin (violet)
- **Properties**:
  - Title "IDENTIFIANTS DE TEST"
  - Email row (label + code)
  - Password row (label + code)
- **Styling**: Colored background (light variant) + code monospace
- **Dimensions**: Full width, auto height

#### C5: Error Banner
- **State**: Only visible on error
- **Properties**:
  - Icon (error)
  - Message text
  - Close button (optional)
- **Colors**: Red danger background + red text
- **Animation**: Fade in 200ms

### Spacing & Layout

| Element | Spacing | Notes |
|---------|---------|-------|
| Page padding | 20px | All sides, mobile-first |
| Panel padding | 40px | Top/bottom/left/right |
| Form gap | 20px | Between fields |
| Logo margin-bottom | 40px | From logo to tier grid |
| Tier grid gap | 16px | Between cards |
| Header margin-bottom | 24px | From heading to form |
| Footer margin-top | 40px | From form to footer |

### Typography Spec

| Element | Font | Size | Weight | Transform | Letter-Spacing |
|---------|------|------|--------|-----------|-----------------|
| Logo Brand | Inter | 24px | 800 | None | -0.02em |
| Logo Sub | Inter | 12px | 400 | Uppercase | 0.05em |
| Page H1 | Inter | 28px | 800 | None | -0.02em |
| Subtitle | Inter | 13px | 400 | None | None |
| Form Label | Inter | 13px | 600 | Uppercase | 0.05em |
| Input Text | Inter | 13px | 400 | None | None |
| Error Text | Inter | 11px | 500 | None | None |
| Helper Text | Inter | 11px | 400 | None | None |
| Button Text | Inter | 13px | 700 | None | None |

### Color Spec

| Usage | Color Token | Hex Value | Context |
|-------|-------------|-----------|---------|
| Logo Gradient Start | `--wm-primary-strong` | #003d7a | Linear gradient |
| Logo Gradient End | `--wm-primary` | #005cbb | Linear gradient |
| Patient Card BG | `--wm-primary-light` | #e8f0fb | Icon background |
| Patient Card Text | `--wm-primary-strong` | #003d7a | Icon color |
| Doctor Card BG | `--wm-teal-light` | #e0f2fe | Icon background |
| Doctor Card Text | `--wm-teal-dark` | #0369a1 | Icon color |
| Admin Card BG | `--wm-violet-light` | #ede9fe | Icon background |
| Admin Card Text | `--wm-violet` | #6d28d9 | Icon color |
| Input Border | `--wm-border` | #d1dbe8 | Default state |
| Input Focus | `--wm-primary` | #005cbb | Focus state |
| Error Border | `--wm-danger` | #b91c1c | Error state |
| Background | `--wm-primary-subtle` | #f0f5ff | Page gradient |

### Responsive Breakpoints

| Breakpoint | Tier Grid | Panel Width | Panel Padding |
|------------|-----------|-------------|---------------|
| Desktop (1280px+) | 3 columns | 520px | 40px |
| Tablet (768px) | 2-3 auto-fit | 480px | 32px |
| Mobile (375px) | 1 column | Full - 40px | 24px |

### Animations

| Animation | Trigger | Duration | Easing | Details |
|-----------|---------|----------|--------|---------|
| Slide Up | Panel Enter | 300ms | ease-out | From translateY(20px) to 0 |
| Fade In | Panel Enter | 300ms | ease-out | From opacity 0 to 1 |
| Lift | Tier Card Hover | 180ms | ease | translateY(-2px) |
| Border Change | Input Focus | 180ms | ease | Border color transition |
| Shadow Expand | Input Focus | 180ms | ease | Box-shadow transition |
| Icon Reveal | Tier Card Hover | 180ms | ease | Opacity 0 to 1 |

---

# 2. ADMIN DASHBOARD

## 2.1 Component Hierarchy

```
AdminDashboardComponent
└── .wm-page
    ├── .wm-page-header
    │   ├── div (text content)
    │   │   ├── .wm-eyebrow ("OPERATIONS CENTER")
    │   │   ├── h1.wm-page-title
    │   │   └── p (description)
    │   └── button.mat-raised-button (action)
    ├── .wm-grid-4 (KPI Row)
    │   ├── .kpi-card (4 variants: patients/appointments/revenue/staff)
    │   │   ├── .kpi-icon (44×44)
    │   │   ├── .kpi-value
    │   │   ├── .kpi-label
    │   │   ├── .kpi-change (with direction icon)
    │   │   └── .kpi-accent-bar
    │   ├── .kpi-card
    │   ├── .kpi-card
    │   └── .kpi-card
    ├── .admin-main-grid (2 columns)
    │   ├── .wm-card (Appointment Status)
    │   │   ├── .wm-card-header
    │   │   ├── .apt-status-grid (3×2)
    │   │   │   ├── Status item (approved)
    │   │   │   ├── Status item (completed)
    │   │   │   ├── Status item (pending)
    │   │   │   ├── Status item (cancelled)
    │   │   │   ├── Status item (no-show)
    │   │   │   └── Status item (requested)
    │   └── .wm-card (Revenue)
    │       ├── .wm-card-header
    │       ├── .rev-total
    │       ├── .rev-breakdown
    │       │   ├── Service item (Consultations)
    │       │   ├── Service item (Procedures)
    │       │   └── Service item (Lab/Imaging)
    │       └── SVG line chart
    ├── .wm-card (Service Performance)
    │   ├── .wm-card-header
    │   └── .wm-table-wrap
    │       └── .wm-table (6 services)
    ├── .wm-card (Activity Feed)
    │   ├── .wm-card-header
    │   └── Event log (timeline style)
    ├── .wm-card (Staff on Duty)
    │   ├── .wm-card-header
    │   └── Staff list
    ├── .wm-card (System Alerts)
    │   ├── .wm-card-header
    │   └── Alert items (dismissible)
    └── .wm-card (Hourly Chart)
        ├── .wm-card-header
        └── Bar chart (12 bars)
```

## 2.2 Figma Structure

### Frames
```
📊 Admin Dashboard
├── 🖼 Desktop (1920px × 1200px)
│   ├── Header
│   │   ├── "OPERATIONS CENTER" eyebrow
│   │   ├── "WAY Medical — Overview" heading
│   │   └── "Thursday, April 23..." date
│   ├── KPI Strip (4 cards, 1fr grid)
│   │   ├── KPI / Patients (1,248, +23 this week)
│   │   ├── KPI / Appointments (87, 8 pending)
│   │   ├── KPI / Revenue (€48.7k, +12.4% vs last)
│   │   └── KPI / Staff (34, 2 on leave)
│   ├── 2-Column Grid
│   │   ├── Card / Appointment Status
│   │   │   └── 3×2 grid (52 Approved, 28 Completed, etc.)
│   │   └── Card / Revenue
│   │       ├── €48,750 total
│   │       ├── Breakdown (€24.3k Consultations, etc.)
│   │       └── SVG line chart
│   ├── Card / Service Performance (1-col, full-width)
│   │   └── Table (6 rows)
│   ├── Card / Activity Feed
│   │   └── Event log (5-6 items)
│   ├── Card / Staff on Duty
│   │   └── List (5-6 staff)
│   ├── Card / System Alerts
│   │   └── Alert items (3-4)
│   └── Card / Hourly Chart
│       └── 12 horizontal bars
├── 🖼 Tablet (768px × 1200px)
│   ├── All sections stack to 1-col
│   ├── KPI grid 2×2
│   ├── Cards full-width
│   └── Table horizontal scroll
└── 🖼 Mobile (375px × 2000px)
    ├── All 1-col
    ├── KPI 1-col
    └── Condensed tables
```

### Components to Create

#### C6: KPI Card
- **Properties**:
  - Icon (24px, colored)
  - Icon Background (colored light variant)
  - Value (number, large)
  - Label (text, muted)
  - Change indicator (↑/↓, colored)
  - Accent bar (bottom, 3px)
- **States**: Default, Hover (+1px lift)
- **Colors**: Icon BG varies (primary/teal/success/warning)

#### C7: Status Count Card
- **Properties**:
  - Count (large number)
  - Label (status name)
  - Progress bar (colored, bottom)
- **Variants**: Approved (green), Completed (blue), Pending (amber), Cancelled (red), No-show (gray), Requested (blue)
- **Dimensions**: Auto, min 140px

#### C8: Card Container
- **Properties**:
  - Header (with title, optional subtitle, optional action)
  - Body (flexible content)
- **States**: Default
- **Styling**: White surface, border-light, shadow-card

#### C9: Revenue Line Chart (SVG)
- **Type**: Mini line chart
- **Dimensions**: ~300×100px
- **Data Points**: 6 months
- **Colors**: Blue gradient fill
- **Grid**: Light dotted lines

#### C10: Table Row / Service Item
- **Cells**: Service Icon + Name | Specialty Chip | Establishment | Doctor Count | Avg Wait | Apts (with bar) | Status
- **Hover**: Subtle background change
- **Colors**: Icon BG colored, chip colored

### Spacing & Layout

| Section | Grid | Gap | Notes |
|---------|------|-----|-------|
| Page | Single col | — | `--sp-8` padding |
| KPI Row | 4 columns | `--sp-5` (20px) | Responsive 2-col @ 1200px |
| Appointment Grid | 3 columns | 16px | Status counts |
| Revenue Section | 2 columns | 24px | Chart + breakdown |
| Main Grid | 2 columns | 24px | 2-col on desktop, 1-col tablet |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Eyebrow | Inter | 11px | 700 |
| Page Title | Inter | 32px | 800 |
| Card Title | Inter | 16px | 600 |
| KPI Value | Inter | 30px | 800 |
| KPI Label | Inter | 13px | 500 |
| Table Header | Inter | 11px | 600 |
| Table Cell | Inter | 13px | 400 |

### Color Spec

| Element | Color | Purpose |
|---------|-------|---------|
| KPI Patients Icon | `--wm-primary` | Blue accent |
| KPI Appointments | `--wm-teal` | Teal accent |
| KPI Revenue | `--wm-success` | Green accent |
| KPI Staff | `--wm-warning` | Amber accent |
| Approved Count | `--wm-success` | Green bar |
| Completed Count | `--wm-primary` | Blue bar |
| Pending Count | `--wm-warning` | Amber bar |
| Cancelled Count | `--wm-danger` | Red bar |

### Responsive Breakpoints

| Breakpoint | KPI Grid | Main Grid | Card Layout |
|------------|----------|-----------|-------------|
| Desktop (1920px) | 1×4 | 2 cols | Full-width |
| Tablet (768px) | 2×2 | 1 col | Full-width |
| Mobile (375px) | 1×4 scroll | 1 col | Compact |

### Animations

| Element | Trigger | Duration | Effect |
|---------|---------|----------|--------|
| KPI Card | Hover | 180ms | Lift +2px, shadow-md |
| Table Row | Hover | 180ms | Background subtle-blue |
| Alert Dismiss | Click | 200ms | Fade out + slide left |
| Chart Draw | Page Load | 600ms | SVG stroke animation |

---

# 3. APPOINTMENT BOOKING WIZARD

## 3.1 Component Hierarchy

```
AppointmentBookingComponent
└── .wm-page
    ├── .breadcrumb (Appointments > Book Appointment)
    ├── .booking-layout
    │   ├── .booking-stepper
    │   │   ├── .step-track
    │   │   │   ├── .step-item (Step 1)
    │   │   │   │   ├── .step-circle (icon or number)
    │   │   │   │   └── .step-info (label + subtitle)
    │   │   │   ├── .step-connector
    │   │   │   ├── .step-item (Step 2)
    │   │   │   ├── .step-connector
    │   │   │   ├── .step-item (Step 3)
    │   │   │   ├── .step-connector
    │   │   │   └── .step-item (Step 4)
    │   └── .booking-body
    │       ├── Step 0: Service Selection
    │       │   ├── .step-title
    │       │   ├── .step-desc
    │       │   ├── .wm-search-input
    │       │   └── .services-grid
    │       │       ├── .service-card (selected state)
    │       │       ├── .service-card
    │       │       └── .service-card
    │       ├── Step 1: Doctor Selection
    │       │   ├── .step-title
    │       │   ├── .step-desc
    │       │   └── .doctors-grid
    │       │       ├── .doctor-card-sel (selected)
    │       │       ├── .doctor-card-sel
    │       │       └── .doctor-card-sel
    │       ├── Step 2: Date & Time
    │       │   ├── .step-title
    │       │   ├── .step-desc
    │       │   ├── .mini-calendar (7×5 grid)
    │       │   │   └── .mc-day (various states)
    │       │   └── .time-slots-grid
    │       │       └── .time-slot (clickable)
    │       └── Step 3: Confirmation
    │           ├── .step-title
    │           ├── Summary sections
    │           │   ├── Service summary
    │           │   ├── Doctor summary
    │           │   ├── Date/Time summary
    │           │   └── Reason textarea
    │           └── Action buttons
    └── .booking-nav (prev/next buttons)
```

## 3.2 Figma Structure

### Frames
```
🗓 Appointment Booking
├── 🖼 Desktop / Step 0 (Service Selection)
│   ├── Breadcrumb
│   ├── Stepper (4 steps: 1 active, others future)
│   ├── Main content area
│   │   ├── "Select a Medical Service"
│   │   ├── Search input
│   │   └── Services grid (3-4 columns)
│   │       ├── Card / Cardiology (with icon)
│   │       ├── Card / General Medicine
│   │       ├── Card / Radiology
│   │       └── Card / Dermatology
│   └── Bottom nav (Cancel, Next disabled until selected)
├── 🖼 Desktop / Step 1 (Doctor Selection)
│   ├── Stepper (2 active)
│   ├── "Choose Your Doctor"
│   └── Doctors grid (2-3 columns)
│       ├── Card / Dr. Fontaine (with rating stars)
│       ├── Card / Dr. Martin
│       └── Card / Dr. Leblanc
├── 🖼 Desktop / Step 2 (Date & Time)
│   ├── Stepper (3 active)
│   ├── 2-column layout
│   │   ├── Mini calendar
│   │   │   └── 7×5 grid with dates
│   │   └── Time slots
│   │       └── 6-column button grid
│   └── Selected date/time display
├── 🖼 Desktop / Step 3 (Confirmation)
│   ├── Stepper (4 active, all done indicators)
│   ├── Summary cards
│   │   ├── Service card
│   │   ├── Doctor card
│   │   └── Date/Time card
│   ├── Reason textarea
│   └── Action buttons (Cancel, Confirm)
├── 🖼 States / Stepper Variations
│   ├── Step 1 (current)
│   ├── Step 2 (current) with Step 1 done
│   └── Step 3 (current) with Steps 1-2 done
└── 📱 Mobile (375px)
    ├── All steps 1-col
    ├── Services grid 1-col
    └── Condensed layouts
```

### Components to Create

#### C11: Stepper Component
- **Total Steps**: 4
- **Step States**: Done, Current, Future
- **Properties per Step**:
  - Step number (or check icon if done)
  - Label text
  - Description text
- **Connector**: Line between steps, colored if previous step done
- **Dimensions**: Full width, auto height

#### C12: Service Card
- **Properties**:
  - Icon (28px, colored)
  - Icon Background (colored light)
  - Name (text)
  - Specialty (muted text)
  - Doctor count (with icon)
  - Selected state (blue border + checkmark)
- **States**: Default, Hover, Selected
- **Dimensions**: Auto, min 160px

#### C13: Doctor Card (Selection)
- **Properties**:
  - Avatar (lg size)
  - Name (large text)
  - Specialty (muted)
  - Rating stars (5 stars, colored)
  - Review count
  - Next available slot
  - Selected state
- **States**: Default, Hover, Selected
- **Dimensions**: Auto, min 200px

#### C14: Mini Calendar Grid
- **Grid**: 7 columns (Sun-Sat), 5 rows (weeks)
- **Day Cell Properties**:
  - Date number
  - States: Available (clickable), Selected (blue bg), Today (border), Past (disabled/grayed)
- **Dimensions**: Auto-fit, sq aspect ratio

#### C15: Time Slot Button
- **Properties**:
  - Time text (HH:MM format)
  - States: Available, Selected, Disabled
- **Colors**: Gray border default, blue border/bg selected, disabled gray
- **Dimensions**: 80×40px (adjustable grid)

#### C16: Summary Card
- **Variants**: Service, Doctor, DateTime
- **Properties**:
  - Section title
  - Content (text/details)
  - Optional edit button
- **Styling**: White background, subtle border

### Spacing & Layout

| Element | Spacing | Notes |
|---------|---------|-------|
| Page | `--sp-8` padding | 32px |
| Stepper margin | `--sp-8` bottom | 32px from title |
| Step content margin | `--sp-8` top | 32px from stepper |
| Services grid gap | 20px | Column gap, row gap |
| Services grid cols | 4 columns | 3 @ tablet, 1 @ mobile |
| Doctors grid cols | 3 columns | 2 @ tablet, 1 @ mobile |
| Mini calendar gap | 8px | Day cell spacing |
| Time slots gap | 10px | Button spacing |
| Summary section margin | 20px | Between sections |
| Button gap | 12px | Between action buttons |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Step Title | Inter | 24px | 700 |
| Step Desc | Inter | 15px | 400 |
| Step Label | Inter | 13px | 600 |
| Card Title | Inter | 16px | 600 |
| Card Sub | Inter | 13px | 400 |
| Doctor Name | Inter | 18px | 600 |
| Time Text | Inter | 15px | 500 |
| Summary Title | Inter | 14px | 700 |

### Color Spec

| Element | Color | Hex |
|---------|-------|-----|
| Active Step Circle | `--wm-primary` | #005cbb |
| Done Step Circle | `--wm-success` | #15803d |
| Step Connector (done) | `--wm-success` | #15803d |
| Service Icon BG | Various | Colored light |
| Selected Border | `--wm-primary` | #005cbb |
| Today Border | `--wm-warning` | #d97706 |
| Time Selected BG | `--wm-primary` | #005cbb |
| Disabled Time | `--wm-border` | #d1dbe8 |

### Responsive Breakpoints

| Breakpoint | Services Grid | Doctors Grid | Calendar | Buttons |
|------------|---------------|--------------|----------|---------|
| Desktop | 4 cols | 3 cols | Full | Full width |
| Tablet (768px) | 3 cols | 2 cols | Full | Full width |
| Mobile (375px) | 1 col | 1 col | Horizontal scroll | Stacked |

### Animations

| Animation | Trigger | Duration | Details |
|-----------|---------|----------|---------|
| Step transition | Next/Back | 300ms | Fade out current, slide left/right, fade in next |
| Checkmark appear | Step complete | 200ms | Bounce animation |
| Selection highlight | Select service | 150ms | Border color change, shadow appear |
| Calendar day hover | Hover | 120ms | Background color change |

---

# 4. PATIENT DASHBOARD

## 4.1 Component Hierarchy

```
PatientDashboardComponent
└── .wm-page
    ├── .hero-section
    │   ├── .hero-left
    │   │   ├── Greeting ("Good morning, Claire")
    │   │   ├── Date
    │   │   └── "Book Appointment" CTA
    │   └── .hero-right
    │       └── Empty space (design element)
    ├── .next-apt-banner (gradient blue)
    │   ├── .nab-icon-wrap
    │   ├── .nab-content
    │   │   ├── .nab-label ("NEXT APPOINTMENT")
    │   │   ├── .nab-title (appointment details)
    │   │   └── .nab-meta (time, doctor, location)
    │   └── .nab-actions
    │       ├── "See Details" button
    │       └── "Cancel Appointment" link
    ├── .wm-grid-4 (KPI cards)
    │   ├── KPI / Upcoming Appointments
    │   ├── KPI / Active Treatments
    │   ├── KPI / Pending Lab Results
    │   └── KPI / Active Prescriptions
    ├── .wm-grid-2 (2-column main content)
    │   ├── .wm-card (Appointments)
    │   │   ├── Timeline list
    │   │   │   ├── Appointment item (date block + details)
    │   │   │   ├── Appointment item
    │   │   │   └── Appointment item
    │   │   └── "See all" link
    │   ├── .wm-card (Consultations)
    │   │   ├── Timeline
    │   │   │   ├── Timeline dot + item
    │   │   │   ├── Timeline dot + item
    │   │   │   └── Timeline dot + item
    │   │   └── "See all" link
    │   ├── .wm-card (Treatments)
    │   │   ├── Treatment card (progress bar)
    │   │   ├── Treatment card
    │   │   └── "See all" link
    │   └── .wm-card (Health Metrics)
    │       ├── 4-item grid
    │       │   ├── Heart Rate (icon + value + trend)
    │       │   ├── Blood Pressure
    │       │   ├── Weight
    │       │   └── Temperature
    │       └── "View history" link
```

## 4.2 Figma Structure

### Frames
```
💙 Patient Dashboard
├── 🖼 Desktop (1920px)
│   ├── Hero section
│   │   ├── Greeting + date
│   │   └── CTA button
│   ├── Next Appointment banner (full-width blue gradient)
│   ├── KPI strip (1×4)
│   │   ├── KPI / Upcoming Apts (2, teal accent)
│   │   ├── KPI / Active Treatments (1)
│   │   ├── KPI / Pending Labs (2)
│   │   └── KPI / Prescriptions (3)
│   ├── 2-Column main grid
│   │   ├── Left column (Apts + Consultations)
│   │   │   ├── Card / Appointments
│   │   │   │   └── Timeline list (3-4 items)
│   │   │   └── Card / Consultations
│   │   │       └── Timeline (3-4 items)
│   │   └── Right column (Treatments + Health)
│   │       ├── Card / Treatments
│   │       │   └── Treatment cards (2-3)
│   │       └── Card / Health Metrics
│   │           └── 2×2 grid (HR, BP, Weight, Temp)
│   └── Responsive variations
├── 📱 Tablet (768px)
│   ├── Hero 1-col
│   ├── Banner full-width
│   ├── KPI 2×2
│   └── Main content 1-col
└── 📱 Mobile (375px)
    ├── Compact hero
    ├── Banner condensed
    ├── KPI 1-col scroll
    └── Cards 1-col
```

### Components to Create

#### C17: Appointment List Item
- **Properties**:
  - Date block (day + month, vertical layout)
  - Appointment time
  - Doctor/Service name
  - Location
  - Status badge
  - Action buttons (details, reschedule)
- **States**: Default, Hover
- **Colors**: Status badge colored

#### C18: Consultation Timeline Item
- **Properties**:
  - Timeline dot (colored)
  - Timestamp
  - Doctor name
  - Consultation title
  - Tags (colored chips)
  - Notes preview
- **States**: Default, Hover

#### C19: Treatment Card (Progress)
- **Properties**:
  - Medication icon
  - Medicine name
  - Status badge
  - Dosage
  - Frequency
  - Progress bar (% completed)
  - Prescribed by doctor name
- **Dimensions**: Full width, ~120px height

#### C20: Health Metric Card
- **Properties**:
  - Icon (colored)
  - Value (large number + unit)
  - Label
  - Trend indicator (↑/↓)
  - Reference range
  - Sparkline (optional)
- **States**: Normal, Warning (if out of range)
- **Dimensions**: Auto, square aspect

### Spacing & Layout

| Section | Grid | Gap |
|---------|------|-----|
| Page | 1-col | `--sp-8` padding |
| Hero | Flex row | 40px gap |
| Banner | Full-width | Internal 20px |
| KPI | 4 cols | 20px |
| Main | 2 cols | 24px |
| Appointment list | Flex col | 12px |
| Health grid | 2×2 | 12px gap |

### Responsive Breakpoints

| Breakpoint | KPI | Main Grid | Health Grid |
|------------|-----|-----------|------------|
| Desktop | 1×4 | 2 cols | 2×2 |
| Tablet | 2×2 | 1 col | 1-col scroll |
| Mobile | 1-col scroll | 1 col | 2×2 responsive |

---

# 5. TREATMENT LIST

## 5.1 Component Hierarchy

```
TreatmentListComponent
└── .wm-page
    ├── .wm-page-header
    │   ├── h1 (page title)
    │   └── button (add new)
    ├── .wm-card (Filters)
    │   ├── .form-group (patient search)
    │   ├── .form-group (status select)
    │   └── button (reset)
    ├── .wm-grid-4 (Status KPIs)
    │   ├── KPI / Active (green)
    │   ├── KPI / Paused (amber)
    │   ├── KPI / Completed (blue)
    │   └── KPI / Cancelled (red)
    ├── Treatment cards grid
    │   ├── .wm-card (treatment card)
    │   │   ├── Header (icon + name + status badge)
    │   │   ├── Body (info grid)
    │   │   │   ├── Patient
    │   │   │   ├── Dosage
    │   │   │   ├── Frequency
    │   │   │   ├── Start date
    │   │   │   └── End date
    │   │   └── Footer (action buttons)
    │   ├── .wm-card
    │   └── .wm-card
    └── Empty state (if no treatments)
```

## 5.2 Figma Structure

### Frames
```
💊 Treatment List
├── 🖼 Desktop (1920px)
│   ├── Header
│   │   ├── "Suivi thérapeutique"
│   │   └── "Nouveau" button
│   ├── Filter card
│   │   ├── Patient input
│   │   ├── Status select
│   │   └── Reset button (stroked)
│   ├── Status KPI strip (1×4)
│   │   ├── Active (green checkmark)
│   │   ├── Paused (amber pause icon)
│   │   ├── Completed (blue check_all)
│   │   └── Cancelled (red cancel)
│   ├── Treatment cards grid (3-4 cols)
│   │   ├── Card / Treatment 1
│   │   ├── Card / Treatment 2
│   │   └── Card / Treatment 3
│   └── Empty state (if filtered to 0)
├── 📱 Tablet (768px)
│   ├── KPI 2×2
│   ├── Cards 2-col
│   └── Filter 1-col
└── 📱 Mobile (375px)
    ├── KPI 1-col scroll
    ├── Cards 1-col
    └── Filter 1-col
```

### Components to Create

#### C21: Treatment Card
- **Header**:
  - Icon (40×40, teal background)
  - Name (16px, bold)
  - Type (11px, muted)
  - Status badge (right-aligned)
- **Body**:
  - 5-item info grid (Patient, Dosage, Frequency, Start, End)
  - Key-value pairs with left/right alignment
- **Footer**:
  - "Voir" button (stroked)
  - "Modifier" button (primary)
  - Flex: 1 each, full-width
- **Styling**: `display: flex; flex-direction: column`

#### C22: Filter Form Group
- **Label**: Uppercase, 11px, muted
- **Input/Select**: 44px height, border `--wm-border`, focus blue
- **Select**: Dropdown with options
- **Styling**: Grid layout with gaps

### Spacing & Layout

| Element | Spacing | Notes |
|---------|---------|-------|
| Page padding | 32px | `--sp-8` |
| Filter card padding | 20px | Top/bottom, 24px left/right |
| Filter form gap | 16px | Between fields |
| KPI gap | 20px | `--sp-5` |
| Cards grid gap | 20px | Column & row |
| Card header padding | 20px top/bottom, 24px sides | Border-bottom 1px |
| Card body padding | 20px | All sides |
| Info grid gap | 10px | Between rows |
| Card footer padding | 14px | All sides, border-top 1px |

---

# 6. GLOBAL DESIGN TOKENS

## Token System

### Colors

#### Primary Blues
```css
--wm-primary:        #005cbb  /* Main medical blue */
--wm-primary-strong: #003d7a  /* Darker for text/icons */
--wm-primary-dark:   #002d5c  /* Darkest */
--wm-primary-mid:    #1a6fcc  /* Lighter variant */
--wm-primary-light:  #e8f0fb  /* Light background */
--wm-primary-subtle: #f0f5ff  /* Very light */
```

#### Semantic Colors
```css
--wm-success:        #15803d  /* Green */
--wm-warning:        #d97706  /* Amber */
--wm-danger:         #dc2626  /* Red */
--wm-teal:           #0284c7  /* Medical teal */
--wm-violet:         #6d28d9  /* Admin purple */
```

#### Neutrals
```css
--wm-text:           #0f1f35  /* Default text */
--wm-text-strong:    #07101f  /* Bold text */
--wm-muted:          #536580  /* Secondary text */
--wm-muted-light:    #8fa3bc  /* Lighter secondary */
--wm-border:         #d1dbe8  /* Default border */
--wm-border-light:   #e4ecf5  /* Subtle border */
--wm-bg:             #f2f5f9  /* Page background */
--wm-bg-soft:        #f8fafc  /* Soft background */
--wm-surface:        #ffffff  /* Card/panel background */
```

### Typography

#### Font Families
```css
--wm-font:      'Inter', sans-serif
--wm-font-mono: 'JetBrains Mono', monospace
```

#### Font Sizes
```css
--fs-xs:   0.6875rem  /* 11px */
--fs-sm:   0.8125rem  /* 13px */
--fs-base: 0.9375rem  /* 15px */
--fs-md:   1rem       /* 16px */
--fs-lg:   1.125rem   /* 18px */
--fs-xl:   1.25rem    /* 20px */
--fs-2xl:  1.5rem     /* 24px */
--fs-3xl:  1.875rem   /* 30px */
--fs-4xl:  2.25rem    /* 36px */
```

### Spacing Scale
```css
--sp-1:  0.25rem   /* 4px */
--sp-2:  0.5rem    /* 8px */
--sp-3:  0.75rem   /* 12px */
--sp-4:  1rem      /* 16px */
--sp-5:  1.25rem   /* 20px */
--sp-6:  1.5rem    /* 24px */
--sp-8:  2rem      /* 32px */
--sp-10: 2.5rem    /* 40px */
--sp-12: 3rem      /* 48px */
```

### Border Radius
```css
--r-sm:   6px
--r-md:   10px
--r-lg:   14px
--r-xl:   18px
--r-2xl:  24px
--r-full: 9999px
```

### Shadows
```css
--sh-xs:   0 1px 2px rgba(15, 31, 53, 0.04)
--sh-sm:   0 1px 4px rgba(15, 31, 53, 0.06)
--sh-md:   0 4px 16px rgba(15, 31, 53, 0.08)
--sh-lg:   0 8px 32px rgba(15, 31, 53, 0.10)
--sh-xl:   0 16px 48px rgba(15, 31, 53, 0.12)
--sh-card: 0 2px 8px rgba(15, 31, 53, 0.06)
```

### Transitions
```css
--tr:      180ms cubic-bezier(0.4, 0, 0.2, 1)
--tr-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)
```

---

# 7. ACCESSIBILITY GUIDELINES

## WCAG 2.1 AA Compliance

### Color Contrast
- Text on background: Min 4.5:1 (normal), 3:1 (large)
- All badges, buttons, icons meet minimum ratios
- Danger red (#dc2626) on white: 5.6:1 ✅

### Keyboard Navigation
- Tab order logical: Logo → Tier cards → Form → Buttons
- Focus indicators visible (blue outline, 2px)
- All interactive elements accessible via keyboard

### Icons + Labels
- All icons paired with text labels
- Form inputs have `<label>` elements
- Error messages associated with fields

### Form Accessibility
- Labels above inputs (not placeholders alone)
- Error messages linked to inputs via `aria-describedby`
- Required fields marked with asterisk + aria-required

### Responsive Text
- Font sizes min 14px on mobile
- Line height min 1.5
- Letter spacing not compressed

### Focus States
- 2–3px outline, `--wm-primary` color
- Visible on dark and light backgrounds
- No focus visibility hidden

---

# 8. INTERACTION PATTERNS

## Common Patterns

### Button States
```
Default → Hover (+shadow, -2px lift) → Active (pressed) → Disabled (opacity 0.6)
```

### Input Focus
```
Border #d1dbe8 → Focus: Border #005cbb + 3px shadow blue
```

### Card Hover
```
Default shadow → Hover shadow-md + -2px lift
```

### Loading
```
Button text: "Se connecter" → "Connexion en cours..." + spinner
```

### Error
```
Border #d1dbe8 → Border #dc2626 (error) + red text below
```

### Modal/Panel Entrance
```
Opacity 0, translateY(20px) → 300ms ease-out → Opacity 1, translateY(0)
```

---

# 9. IMPLEMENTATION CHECKLIST

## Before Development

- [ ] All colors defined as CSS custom properties
- [ ] All typography specs defined in utility classes
- [ ] All spacing defined with scale variables
- [ ] Border radius consistent across all components
- [ ] Shadow system standardized
- [ ] Transition/animation timing consistent

## Component Quality

- [ ] Each component in Figma has visual states
- [ ] Responsive behavior documented
- [ ] Accessibility features implemented
- [ ] Focus states visible
- [ ] Error states shown
- [ ] Loading states defined
- [ ] Hover effects implemented

## Testing

- [ ] Keyboard navigation tested
- [ ] Color contrast checked (WebAIM)
- [ ] Screen reader tested (NVDA/JAWS)
- [ ] Mobile responsive verified
- [ ] Touch targets min 44×44px
- [ ] Animations not auto-playing
- [ ] No motion sickness triggers (< 3 flashes/sec)

---

# 10. FIGMA FILE STRUCTURE RECOMMENDATION

```
WAY Medical Design System
│
├── 📄 Colors & Tokens
│   ├── Color palette (all --wm-* tokens)
│   ├── Typography scale
│   ├── Spacing system
│   ├── Shadow definitions
│   └── Border radius scale
│
├── 🔧 Components
│   ├── C1-C5: Login Components
│   ├── C6-C10: Dashboard Components
│   ├── C11-C16: Booking Wizard Components
│   ├── C17-C22: Patient/Treatment Components
│   └── Shared (Buttons, Inputs, Badges, etc.)
│
├── 📱 Login Interface
│   ├── Desktop / Tier Selection
│   ├── Desktop / Login Form (all states)
│   ├── Tablet breakpoint
│   └── Mobile breakpoint
│
├── 📊 Admin Dashboard
│   ├── Desktop (full page)
│   ├── Tablet layout
│   └── Mobile layout
│
├── 🗓 Appointment Booking
│   ├── Step 0, 1, 2, 3
│   ├── All interactions
│   └── Mobile responsive
│
├── 💙 Patient Dashboard
│   ├── Full desktop view
│   ├── Tablet view
│   └── Mobile view
│
├── 💊 Treatment List
│   ├── Desktop (card grid)
│   ├── Filters
│   ├── Empty state
│   └── Mobile
│
└── 📋 Documentation
    ├── Design specs
    ├── Spacing guide
    ├── Typography scale
    └── Interaction patterns
```

---

## Conclusion

This documentation provides complete UX/UI specifications for all major WAY Medical interfaces, including:

✅ Component hierarchies  
✅ Figma frame structures  
✅ Design tokens & systems  
✅ Responsive breakpoints  
✅ Accessibility guidelines  
✅ Interaction patterns  
✅ Animation specifications  

Use this as the source of truth for design implementation and developer handoff.
