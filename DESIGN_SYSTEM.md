# VEIXON Design System & Visual Token Specification

**Author:** Agent C — UI/UX Design Director  
**Product:** VEIXON Command Center  
**Theme:** VEIXON Dark-First Enterprise Terminal  
**Status:** Canonical Design Standard (v1.0.0)  

---

## 1. Design Philosophy & Aesthetic Identity

The **VEIXON Design System** embodies an **operational, intelligent, and calm aesthetic**. Inspired by industry benchmarks such as Linear, Vercel, Stripe, and modern high-density engineering environments, it shuns decorative frivolity (excessive neon glow, giant 3D spheres, cartoonish rounded corners) in favor of **typographic authority, surgical contrast, and high information clarity**.

### Primary Brand Attributes
- **Deep Slate / Obsidian Grounds:** Minimizes eye fatigue during prolonged operations.
- **Electric Cobalt & Precision Cyan:** Guides user focus directly to primary actions and critical updates without visual noise.
- **Explainable Color-Coded States:** Emerald for nominal/healthy states, Amber for warning/at-risk items, and Crimson for immediate blocking bottlenecks.

---

## 2. Color Tokens & Palette

### Base Surfaces
| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `background` | `#06080E` | Main window and shell backdrop (deep obsidian space) |
| `card` | `#0B0F19` | Elevated panels, command modules, and cards |
| `card-subtle` | `#111624` | Nested sub-elements, table rows, and secondary cards |
| `surface-hover` | `#161D30` | Hover states across interactive cards and rows |
| `border-subtle` | `#1E2638` | Structural dividing borders and grid separators |
| `border-accent` | `#2962FF` | Active input rings, selected tabs, and focus bounds |

### Typography Hierarchy
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `foreground-primary` | `#F8FAFC` | Primary headings, active metrics, critical alerts |
| `foreground-secondary` | `#94A3B8` | Body text, table labels, descriptive subheadings |
| `foreground-muted` | `#64748B` | Timestamps, metadata, inactive tabs, keyboard shortcuts |

### Accents & State Colors
| State / Intent | Primary Hex | Soft Background | Semantic Meaning |
| :--- | :--- | :--- | :--- |
| **Brand Cobalt** | `#2962FF` | `rgba(41, 98, 255, 0.12)` | Primary buttons, active tabs, main links |
| **Cyber Cyan** | `#00E5FF` | `rgba(0, 229, 255, 0.10)` | Live telemetry, code badges, deep work |
| **Nominal (Success)** | `#10B981` | `rgba(16, 185, 129, 0.12)` | On Track, Resolved, Approved, Completed |
| **Attention (Warning)**| `#F59E0B` | `rgba(245, 158, 11, 0.12)` | At Risk, In Review, Scheduled, Pending |
| **Critical (Danger)** | `#EF4444` | `rgba(239, 68, 68, 0.14)` | Blocker Open, Behind Schedule, Uninformed Absence |

---

## 3. Typography & Scale

The system uses **Inter** with tabular figure options (`font-mono`) for precision telemetry and timestamps.

| Scale | Size / Line-Height | Weight | Applied Elements |
| :--- | :--- | :--- | :--- |
| `display-lg` | 32px / 40px | 700 (Bold) | Landing Page Hero, Macro Executive Metrics |
| `heading-1` | 24px / 32px | 600 (Semibold) | Page Headers, Major Section Titles |
| `heading-2` | 18px / 26px | 600 (Semibold) | Card Titles, Modal Headers, Sub-modules |
| `body-md` | 14px / 20px | 400–500 | Default table cells, card descriptions, form fields |
| `body-sm` | 12px / 16px | 500 (Medium) | Badges, status pills, timestamps, helper notes |
| `caption-xs` | 10px / 14px | 600 (Semibold) | Uppercase trackers, keyboard hotkeys (`Ctrl+K`) |

---

## 4. Spacing & Elevation

- **Base Unit:** 4px (0.25rem)
- **Compact Padding (`p-2`, `p-3`):** Internal badge and button padding.
- **Component Spacing (`gap-4`, `p-4`, `p-5`):** Standard card interiors and modular grids.
- **Section Spacing (`space-y-6`, `gap-6`):** Macro dashboard modules and major layout columns.
- **Elevation Shadows:** Soft, low-alpha obsidian shadows (`box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.5)`) to eliminate flat, ambiguous borders.

---

## 5. Standard Component Guidelines

### Buttons
- **Primary:** Cobalt background (`#2962FF`), white text, hover subtle scale/brightness with 150ms ease.
- **Secondary / Ghost:** Transparent background, slate border (`#1E2638`), slate-200 text, hover background (`#161D30`).
- **Destructive:** Crimson subtle background (`rgba(239, 68, 68, 0.15)`), red-400 border and text.

### Badges & Status Pills
All status badges pair a subtle background tint with a crisp colored border and high-contrast text:
- Always pair with an icon or clear text; **never rely solely on color** for status differentiation (enforcing WCAG 2.1 AA accessibility).

### Form Elements & Inputs
- Dark surface (`#0B0F19`), subtle border (`#1E2638`), off-white text.
- Focus state: Electric Cobalt ring with 2px offset (`ring-2 ring-blue-500/50 border-blue-500`).

### Interactive Data Visualizations
- Rendered via **Recharts** wrapped in responsive containers (`ResponsiveContainer width="100%" height={240}`).
- Custom dark tooltips (`#0B0F19`, `#1E2638` border) with smooth hover transitions.

---

## 6. Responsive Breakpoints

| Breakpoint | Width | Layout Adaptations |
| :--- | :--- | :--- |
| **Mobile (`sm`)** | `< 640px` | Single-column stack, collapsible drawer navigation, card views for tables |
| **Tablet (`md`)** | `640px – 1023px` | 2-column grid, compact table layout with horizontal scroll |
| **Desktop (`lg`)** | `1024px – 1279px`| Full dual-pane (8 cols Command Stage + 4 cols Operations Rail) |
| **Ultra-Wide (`xl`)**| `>= 1280px` | Maximum 1400px container with centered optical balance |
