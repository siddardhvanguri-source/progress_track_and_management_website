# VEIXON Design System Specification

## 1. Brand Philosophy
VEIXON Command Center is the private internal operating system for VEIXON. The visual design is **calm, intelligent, precise, minimal, and sophisticated**. It embodies engineering discipline: dark surfaces, crisp typography, micro-metric badges, and strict semantic color logic.

---

## 2. Color Tokens

### Base & Surfaces
- **Background Base**: `#06080E` (Obsidian Deep)
- **Surface Layer 1 (Cards & Sidebars)**: `#0B0F19` (Charcoal Slate)
- **Surface Layer 2 (Elevated Modals & Menus)**: `#0E131F` (Elevated Deep)
- **Surface Layer 3 (Input & Hover Highlights)**: `#141A28` / `rgba(255, 255, 255, 0.05)`
- **Border Default**: `rgba(255, 255, 255, 0.10)`
- **Border Subtle**: `rgba(255, 255, 255, 0.06)`
- **Border Focus / Active**: `#2962FF` (Electric Blue)

### Typography Colors
- **Text Primary**: `#FFFFFF` (Pure White)
- **Text Secondary**: `#94A3B8` / `hsl(215 16% 65%)` (Soft Slate)
- **Text Muted**: `#64748B` / `rgba(255, 255, 255, 0.40)` (Muted Graphite)
- **Text Inverse**: `#06080E`

### Brand Accents
- **Electric Blue (Primary Action)**: `#2962FF` / `hover: #1A4FD9`
- **Cyan (Live Pulse / Highlight)**: `#00E5FF`
- **Violet (Deep Work / AI Systems)**: `#7C3AED`

### Semantic Status Colors
- **Healthy / Complete / Present (Green)**: `#10B981` (Emerald) | Background: `rgba(16, 185, 129, 0.10)` | Border: `rgba(16, 185, 129, 0.25)`
- **Attention / In Progress / Pending (Amber)**: `#F59E0B` (Amber) | Background: `rgba(245, 158, 11, 0.10)` | Border: `rgba(245, 158, 11, 0.25)`
- **Problem / Blocked / Uninformed (Red)**: `#F43F5E` (Rose) | Background: `rgba(244, 63, 94, 0.12)` | Border: `rgba(244, 63, 94, 0.30)`
- **Duty Leave / Information (Sky Blue)**: `#38BDF8` (Sky) | Background: `rgba(56, 189, 248, 0.10)` | Border: `rgba(56, 189, 248, 0.25)`
- **Deep Work (Violet)**: `#A855F7` (Purple) | Background: `rgba(168, 85, 247, 0.10)` | Border: `rgba(168, 85, 247, 0.25)`

---

## 3. Typography Hierarchy

- **Font Family**: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Monospace Family**: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
- **Hierarchy Tokens**:
  - `Display / Hero Title`: 36px–56px | Weight 900 | Tracking -0.03em
  - `Page Title (h1)`: 24px–30px | Weight 800 | Tracking -0.02em
  - `Section Header (h2/h3)`: 14px–18px | Weight 700 | Tracking -0.01em
  - `Card Title`: 13px–15px | Weight 600
  - `Body Text`: 12px–14px | Weight 400–500 | Leading 1.5
  - `Micro Label / Metadata`: 10px–11px | Weight 600 | Monospace / Uppercase | Tracking 0.05em

---

## 4. Component Token Standards

### Buttons
- **Primary**: `bg-[#2962FF] hover:bg-[#1A4FD9] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md shadow-[#2962FF]/20`
- **Secondary / Ghost**: `bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 text-xs font-medium px-3 py-2 rounded-xl`
- **Danger**: `bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold px-3 py-2 rounded-xl`

### Badges & Status Indicators
- Status badges use rounded-full or rounded-md pills with 10px text, 1.5px border, and 10% opacity background.

### Cards & Panels
- `rounded-2xl border border-white/10 bg-[#0B0F19] p-4 sm:p-5 shadow-xs`

### Inputs & Selects
- `px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#2962FF]`

---

## 5. Motion Tokens
- **Hover Transitions**: `transition-all duration-150 ease-out`
- **Modal / Popover Transitions**: `animate-in fade-in zoom-in-95 duration-150`
- **Respect Reduced Motion**: All animations fallback to instant state switches when `prefers-reduced-motion: reduce` is enabled.
