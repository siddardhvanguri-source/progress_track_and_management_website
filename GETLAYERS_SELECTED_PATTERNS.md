# GetLayers Selected Design Patterns (VEIXON Command Center)

The following 15 design patterns have been curated from GetLayers research and tailored specifically for the VEIXON Command Center.

---

## Pattern Matrix

| Rank | Pattern Name | Origin Category | VEIXON Implementation Target | Core Value & Aesthetic Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **Obsidian Base & Precision Border** | `vesper` Template | Global Layout & App Shell (`#06080E`, `white/10`) | Eliminates muddy grays; provides ultimate contrast for text and status indicators. |
| **02** | **Telemetry Pulse Badge** | `ai-studio` Template | Header Status (`VEIXON // COMMAND CENTER`) | Subtly communicates real-time operational readiness with a pulsing cyan indicator. |
| **03** | **Spotlight Exception Framing** | `carousel-spotlight` | Attention Required Section | Frames high-priority blockers/risks with a soft amber/rose border gradient. |
| **04** | **Info-Dense Almanac Strip** | `cards-almanac` | "Today at VEIXON" Metric Row | Presents 5 key metrics with single-click drill-downs into underlying records. |
| **05** | **Semantic Attendance Ribbon** | `colonnade` Section | Attendance Strip (Present, Duty, Uninformed, Deep Work) | Strict semantic color-coding (Emerald, Sky Blue, Rose, Violet) with zero visual noise. |
| **06** | **Activity Difference Stream** | `stride` Template | "What Changed While You Were Away" | High-clarity delta logs (`68% → 74%`, `Blocker reported`) calculated from real activity. |
| **07** | **Interactive Bento Grid** | `showcase-equator` | Public Landing Showcase & Feature Breakdown | Organizes Command Center capabilities into balanced, interactive structural panels. |
| **08** | **Layered Preview Pane** | `dantora` Template | Hero Section Live UI Mockup & Dashboard Preview | Demonstrates actual working software rather than abstract illustrations. |
| **09** | **Sprint Velocity Kanban Cards** | `stride` Dashboard | Work Board (`/work`) | Compact cards with assignee avatar, priority badge, project tag, and inline progress track. |
| **10** | **Milestone Ascent Tracker** | `roadmap-ascent` | Project Details & Goals Timeline | Visual milestone progress with completed checkmarks and upcoming target dates. |
| **11** | **Slipstream View Switcher** | `slider-slipstream` | Work View Mode Tabs (List, Board, Calendar) | Frictionless view switching with smooth active pill animation. |
| **12** | **Soft Radial Ambient Glow** | `pharos` Gradient | Landing Hero Background | Adds visual depth behind the main headline without decreasing text readability. |
| **13** | **Monospace Metadata Stacking** | `creative-director` | Section Headers & Timestamps (`font-mono`) | Establishes a technical, precise tone for timestamps, codes, and IDs. |
| **14** | **Zero-Flicker Modal Dialogs** | `vesper` Overlay | Task Detail, Leave Request, Blocker Report | Backdrop blur (`backdrop-blur-md bg-black/70`) with centered elevated cards. |
| **15** | **Executive Profile Drawer** | `kimi` Workspace | People Directory (`/people`) Profile Modal | Displays complete employee workload, active tasks, blockers, and recent activity. |

---

## Pattern Implementation Rules

1. **Information Over Decoration**: Every visual pattern must clarify data (e.g. status, severity, progress) rather than serve as pure ornament.
2. **Deterministic Layouts**: No sudden layout shifts or jumping cards during data loading.
3. **High Contrast Typography**: Pure white (`#FFFFFF`) for primary titles, soft muted slate (`#94A3B8`) for secondary text.
4. **Instant Actionability**: Every metric card links directly to its underlying records or opens an action modal.
