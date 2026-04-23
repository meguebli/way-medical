# WAY Medical — Image Generation & Export Guide

## How to Generate Actual UX/UI Images

---

# Method 1: Figma (RECOMMENDED)

## Step-by-Step Setup

### 1. Create Figma File
```
1. Go to figma.com
2. Click "Create new file" → "Design file"
3. Name: "WAY Medical - Design System"
4. Enable "Share prototype" for team access
```

### 2. Import Design Tokens (Using Figma Variables)

**Menu**: Windows → Variables

```
Create Collections:

Collection: Colors
├─ colors/primary
│   ├─ primary-strong: #003d7a
│   ├─ primary-main: #005cbb
│   ├─ primary-light: #e8f0fb
│   ├─ primary-subtle: #f0f5ff
│   └─ [etc...]
├─ colors/semantic
│   ├─ success: #15803d
│   ├─ warning: #d97706
│   ├─ danger: #dc2626
│   ├─ teal: #0284c7
│   └─ violet: #6d28d9
└─ colors/neutral
    ├─ text-strong: #07101f
    ├─ text: #0f1f35
    ├─ muted: #536580
    ├─ border: #d1dbe8
    ├─ bg: #f2f5f9
    └─ surface: #ffffff

Collection: Typography
├─ font-families
│   ├─ sans: "Inter"
│   └─ mono: "JetBrains Mono"
└─ font-sizes
    ├─ xs: 11px
    ├─ sm: 13px
    ├─ base: 15px
    ├─ md: 16px
    ├─ lg: 18px
    ├─ xl: 20px
    ├─ 2xl: 24px
    ├─ 3xl: 30px
    └─ 4xl: 36px
```

### 3. Create Typography Styles

**Menu**: Assets → + → Create style

```
Text Styles to Create:

Display / Bold
├─ Font: Inter
├─ Size: 32px
├─ Weight: 800
├─ Letter-spacing: -0.02em
└─ Apply to component

Heading / Large
├─ Font: Inter
├─ Size: 24px
├─ Weight: 800
└─ Line-height: 1.2

Title / Bold
├─ Font: Inter
├─ Size: 20px
├─ Weight: 700

Body / Regular
├─ Font: Inter
├─ Size: 15px
├─ Weight: 400
├─ Line-height: 1.6

Label / Bold
├─ Font: Inter
├─ Size: 13px
├─ Weight: 600
├─ Text-transform: Uppercase
└─ Letter-spacing: 0.05em

[etc. for all typography specs]
```

### 4. Build Page 1: SETUP & TOKENS

**Create Frame**: 1280×800px

```
Frame: "01_Setup"
├─ Section: Color Palette
│   ├─ Component: Color Swatch (48×48px)
│   │   └─ 20+ instances in grid
│   ├─ Each swatch labeled with hex + variable name
│   └─ Organized by: Primary / Semantic / Neutral
├─ Section: Typography Scale
│   ├─ Text samples: 11px → 36px
│   ├─ All weights: 400, 500, 600, 700, 800
│   └─ Examples of each style
├─ Section: Spacing Scale
│   ├─ Visual reference: 4px to 48px
│   └─ Labeled values
└─ Section: Shadows
    ├─ 4 shadow cards
    ├─ Labeled: shadow-card, shadow-md, shadow-lg, shadow-xl
    └─ CSS values displayed
```

### 5. Build Page 2: SHARED COMPONENTS

**Follow FIGMA_SETUP_GUIDE.md exactly**

For each component (Button, Input, Badge, etc.):
```
1. Create Frame: 400×600px
2. Create component structure:
   ├─ Component element group
   ├─ All variant combinations
   ├─ States: Default, Hover, Focus, Error, Disabled
   └─ Label each variant clearly

3. Right-click → "Create component set"
4. In Properties panel → Add variants:
   ├─ Variant: Style = "Primary" | "Stroked" | "Text"
   ├─ Variant: Size = "Large" | "Small"
   ├─ Variant: State = "Default" | "Hover" | "Disabled"
   └─ [etc.]
```

### 6. Build Pages 3-7: INTERFACE SCREENS

For each interface (Login, Dashboard, etc.):

```
Frame: "02_Login / Desktop / Tier Selection" (1280×800px)
├─ Logo component (48×48px + text)
├─ Heading: "Bienvenue" (32px, 800w)
├─ Subtitle (15px, muted)
├─ Grid container (3 columns)
│   ├─ Tier Card / Patient (component instance)
│   ├─ Tier Card / Doctor (component instance)
│   └─ Tier Card / Admin (component instance)
└─ Footer text

Frame: "02_Login / Desktop / Form" (1280×900px)
├─ Logo
├─ Panel (520px centered)
│   ├─ Back button
│   ├─ Heading + Subtitle
│   ├─ Form group: Email
│   │   ├─ Label component
│   │   ├─ Input component
│   │   └─ Error message (hidden)
│   ├─ Form group: Password
│   │   └─ [same structure]
│   ├─ Credentials info box (color variant: patient)
│   ├─ Error banner (hidden by default)
│   ├─ Button / Primary (size: large)
│   ├─ Form divider
│   └─ Button / Stroked
└─ Footer

[Repeat for all interface screens]
```

### 7. Export as Images

**Desktop App**:
1. Right-click frame → "Copy as → Copy PNG (2x)"
2. Or: Select frame → File → Export → PNG (2x resolution)
3. Choose location, export all frames

**Web**:
1. Click share link → "View only"
2. Right-click frame → Screenshot
3. Or use Figma's built-in "Export" feature

### 8. Export Settings

```
For high quality:
├─ Resolution: 2x (for retina displays)
├─ Format: PNG (transparency) or JPG (flat)
├─ Naming: 01-login-tier-selection@2x.png
└─ Folder: /designs/screens/

For components:
├─ Export as: SVG (scalable, code-friendly)
├─ Naming: button-primary-large.svg
└─ Folder: /designs/components/
```

---

# Method 2: Penpot (Open Source, Free)

## Alternative to Figma

### Setup
```
1. Go to penpot.app (or self-host)
2. Create account
3. New file: "WAY Medical"
4. Import or create design system
```

### Advantages
```
✓ Open source (can self-host)
✓ Free forever
✓ SVG-native
✓ Good for developers
✓ Figma file import available
```

### Export
```
File → Export → PNG / SVG
Batch export via API available
```

---

# Method 3: Sketch + Plugins

## If you prefer Sketch

### Setup
```
1. Create new Sketch document
2. Create symbols for all components
3. Use "Abstract" for version control
```

### Export
```
1. Select artboard
2. Export → PNG (2x) / SVG
3. Use "Zeplin" for specs handoff
```

---

# Method 4: Code-based (For Developers)

## Using Storybook + Visual Regression Testing

### Setup
```bash
npm install storybook @storybook/angular
npx storybook init
```

### Component Story Example
```typescript
// button.stories.ts
import { Button } from './button.component';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = {
  args: {
    variant: 'primary',
    size: 'large',
    label: 'Se connecter',
  },
};

export const PrimaryHover = {
  args: { ...Primary.args },
  parameters: {
    pseudo: { hover: true },
  },
};

export const Stroked = {
  args: {
    variant: 'stroked',
    size: 'large',
    label: 'Retour',
  },
};
```

### Generate Screenshots
```bash
npm run storybook
# Then use: Percy.io, Chromatic, or Pixelmatch
# Automatically generates visual diff images
```

---

# Quick Export Checklist

## What to Export for Stakeholders

### 1. Hero Screenshots
```
For presentations, websites, etc.

□ Login - Tier Selection (1920×1080)
□ Login - Form (1920×1080)
□ Admin Dashboard (1920×1200)
□ Patient Dashboard (1920×1200)
□ Appointment Booking - Step 0 (1920×1080)
□ Appointment Booking - Step 3 (1920×1080)
□ Treatment List (1920×1200)

Format: PNG, 2x resolution, white background
Folder: /exports/hero/
```

### 2. Component Library
```
For developers, design system docs

□ All 22 components × all states
□ Button: 3 variants × 2 sizes × 4 states = 24 variants
□ Input: 4 types × 3 states = 12 variants
□ Badge: 7 variants = 7 items
□ [etc. for all components]

Format: SVG (for code), PNG (for docs)
Folder: /exports/components/
```

### 3. Mobile Mockups
```
For responsive design verification

□ Login (375px)
□ Dashboard (375px)
□ Treatment List (375px)
□ [all screens at mobile width]

Format: PNG, 2x resolution
Folder: /exports/mobile/
```

### 4. Tablet Mockups
```
For tablet/iPad design

□ All screens at 768px width

Format: PNG, 2x resolution
Folder: /exports/tablet/
```

### 5. Design System PDF
```
Complete documentation package

Contents:
├─ Cover page
├─ Color palette (with hex codes)
├─ Typography scale
├─ Spacing & grid system
├─ All components (1 page each)
├─ Complete screens (1 page each)
├─ Responsive guidelines
├─ Accessibility notes
└─ Developer handoff specs

Tools: Figma → PDF export, or create in InDesign
```

---

# Export Automation

## Batch Export Script (for Figma API)

```javascript
// export-designs.js
const fetch = require('node-fetch');
const fs = require('fs');

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_ID = 'your-figma-file-id';
const API_URL = `https://api.figma.com/v1/files/${FILE_ID}`;

async function exportFrames() {
  // Get file data
  const response = await fetch(API_URL, {
    headers: { 'X-FIGMA-TOKEN': FIGMA_TOKEN },
  });
  const data = await response.json();

  // Extract all frames
  const frames = extractFrames(data.document);

  // Export each frame as PNG
  for (const frame of frames) {
    const exportUrl = `${API_URL}/images?ids=${frame.id}&format=png&scale=2`;
    const exportData = await fetch(exportUrl, {
      headers: { 'X-FIGMA-TOKEN': FIGMA_TOKEN },
    }).then(r => r.json());

    // Download image
    const imageUrl = exportData.images[frame.id];
    const filename = `exports/${frame.name}.png`;
    downloadImage(imageUrl, filename);
  }
}

function extractFrames(node, frames = []) {
  if (node.type === 'FRAME') {
    frames.push(node);
  }
  if (node.children) {
    node.children.forEach(child => extractFrames(child, frames));
  }
  return frames;
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => {
      const fileStream = fs.createWriteStream(filename);
      res.body.pipe(fileStream);
      fileStream.on('finish', resolve);
    });
  });
}

exportFrames().catch(console.error);
```

Run:
```bash
export FIGMA_TOKEN=your-token
node export-designs.js
# Exports all frames to /exports/ folder
```

---

# Delivery Format

## For Design Handoff

### Organize exports as:

```
designs/
├─ hero/
│   ├─ 01-login-tier-selection@2x.png
│   ├─ 02-login-form@2x.png
│   ├─ 03-admin-dashboard@2x.png
│   ├─ 04-patient-dashboard@2x.png
│   ├─ 05-appointment-booking-step0@2x.png
│   ├─ 06-appointment-booking-step3@2x.png
│   └─ 07-treatment-list@2x.png
│
├─ components/
│   ├─ button.svg
│   ├─ input.svg
│   ├─ badge.svg
│   ├─ card.svg
│   ├─ kpi-card.svg
│   ├─ avatar.svg
│   └─ [all component SVGs]
│
├─ mobile/
│   ├─ 01-login-mobile@2x.png
│   ├─ 02-dashboard-mobile@2x.png
│   └─ [all mobile screens]
│
├─ tablet/
│   ├─ 01-login-tablet@2x.png
│   └─ [all tablet screens]
│
├─ system/
│   ├─ color-palette.png
│   ├─ typography-scale.png
│   ├─ spacing-grid.png
│   ├─ shadows.png
│   ├─ border-radius.png
│   └─ icons-set.svg
│
└─ spec-sheet.pdf
    (all designs + specs in one document)
```

---

# Recommended Tool Combination

## For Complete Coverage

### Primary Tool: Figma
```
✓ Design all screens & components
✓ Create interactive prototypes
✓ Manage design system
✓ Team collaboration
✓ Export for presentations
```

### Secondary Tool: Storybook (for code)
```
✓ Component development
✓ Visual regression testing
✓ Developer documentation
✓ Live component preview
✓ Accessibility testing
```

### Tertiary Tool: Zeplin (for handoff)
```
✓ Automatic specs generation
✓ Developer annotations
✓ CSS/measurements export
✓ Asset versioning
```

---

# Timeline Estimate

## How long to create all images

```
Design System Setup:       3-4 hours
├─ Colors & typography
├─ Spacing & shadows
└─ Tokens & variables

Component Library:          8-10 hours
├─ 22 components × variants
├─ All states (4-6 each)
└─ Documentation

Interface Screens:          10-12 hours
├─ 7 major interfaces
├─ Desktop + Tablet + Mobile
└─ All interactive states

Export & Delivery:          2-3 hours
├─ Batch export
├─ Organize folders
├─ Create spec sheet
└─ Generate PDFs

TOTAL ESTIMATE:            ~30-35 hours
Parallel work (3 designers): ~10-12 hours
```

---

# Quick Links for Tools

## Free Tools
- **Penpot**: https://penpot.app (open source)
- **Figma Free**: https://figma.com (12 files limit)
- **Inkscape**: https://inkscape.org (SVG editor)

## Paid Tools
- **Figma Pro**: https://figma.com (unlimited files)
- **Sketch**: https://sketch.com
- **Adobe XD**: https://adobe.com/products/xd

## Developer Tools
- **Storybook**: https://storybook.js.org
- **Zeplin**: https://zeplin.io
- **Chromatic**: https://chromatic.com
- **Percy.io**: https://percy.io

---

## Summary

To generate actual images:

1. ✅ **Use Figma** (recommended, most efficient)
2. ✅ **Follow FIGMA_SETUP_GUIDE.md** step-by-step
3. ✅ **Use COMPONENT_SPECIFICATIONS.md** for exact specs
4. ✅ **Export as PNG (2x)** for presentations
5. ✅ **Export as SVG** for components & code
6. ✅ **Create PDF spec sheet** for stakeholders
7. ✅ **Share Figma link** for team collaboration

**All visual references are now defined — you have everything needed to create pixel-perfect designs! 🎨**

