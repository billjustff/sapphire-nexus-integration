
# Import the AI API Manager into Software Vala

## What I verified in the source repo

`BOSSsoftwarevala/sapphire-nexus-command` is a Vite + React Router + Tailwind v3 app. Three overlapping manager modules exist, totalling ~11,400 lines:

| Source folder | Contents |
| --- | --- |
| `components/api-ai-manager` | `AAMEnterpriseLayout`, `AAMSidebar`, 10 panels (API keys registry, status monitor, rate limits, AI models/agents, decision logs, audit logs, integration controls, security alerts) + 14 screens (Dashboard, AI API Mgmt, External API Mgmt, Product API Control, Role API Control, Usage Monitor, Billing Engine, Wallet System, Cost Optimizer, Security & Access, Audit Logs, Alerts & Safety, Emergency Controls, Settings) |
| `pages/api-manager` | Dashboard + 10 screens: Overview, API Keys, Integrations, AI Models, Monitoring, Rate Limits, Logs, Audit, Automation Rules, Reports |
| `components/ai-api-management` | Overview, Services table, Usage monitor, Kill switch, AI Models, API Services, Billing/Usage, Settings + 10 governance sections (Model Registry, Prompt Management, Fine-Tuning, Model Evaluation, AI Safety, Data Governance, On-Device AI, Version Lifecycle, Incidents & Alerts, Billing Allocation) |

All three render hardcoded in-component arrays today — no backend. This target project is currently an empty TanStack Start template, so the Software Vala design system and shell get ported too.

## Plan

### 1. Design system + shell
- Port `src/index.css` design tokens (sapphire/graphite/neon-cyan dark-first glass theme, Space Grotesk / Outfit / JetBrains Mono) into `src/styles.css`, converted from Tailwind v3 HSL to this project's Tailwind v4 `@theme` oklch tokens. Fonts load via a `<link>` in the root route.
- Port the shadcn/ui primitives the module uses (card, table, tabs, badge, dialog, sheet, select, switch, slider, progress, scroll-area, tooltip, chart, etc.) and install `motion` for the sidebar/panel animations.
- Build the minimal Software Vala shell: top control bar (global status heatmap, live counters, notifications, freeze, emergency broadcast) + left mega-menu, with only the AI API Manager entry active. No other modules, no author login, no auth at all.

### 2. Backend (Lovable Cloud)
Enable Cloud and create one migration with schema + realistic seed rows (grants and RLS included; public read/write since there is no login):

`ai_providers`, `api_services`, `api_keys`, `ai_models`, `ai_agents`, `api_integrations`, `product_apis`, `role_api_permissions`, `rate_limits`, `usage_events`, `usage_daily_rollup`, `billing_plans`, `invoices`, `wallets`, `wallet_transactions`, `cost_recommendations`, `api_request_logs`, `ai_decision_logs`, `audit_logs`, `security_alerts`, `incidents`, `automation_rules`, `emergency_controls`, `prompts`, `prompt_versions`, `fine_tuning_jobs`, `model_evaluations`, `safety_policies`, `data_governance_rules`, `on_device_models`, `model_versions`, `system_settings`.

Seed with realistic operational data (real provider/model names, plausible pricing, dated usage/log history) — no placeholder or lorem rows.

### 3. Real APIs, not mocks
- Every screen reads through TanStack Query + `createServerFn`; no component holds a hardcoded array.
- All mutations write for real: create/rotate/revoke keys, toggle services and models, edit rate limits, automation rules, permissions, settings, kill switch and emergency controls.
- API keys are stored encrypted-at-rest server-side and never returned in full to the browser (last-4 + fingerprint only).
- Health/latency monitoring runs as a real server-side check against configured endpoints, recording measured results into `usage_events` / `api_request_logs`; charts read those recorded rows.
- The AI test/playground surfaces call Lovable AI through the gateway server-side, and their token/cost usage is recorded to the same tables that feed billing and cost optimizer.

### 4. Screen build-out (merged, deduped)
Routes under `/api-ai-manager/*`, sidebar preserved from `AAMSidebar` and extended so nothing from the other two modules is lost:
- **Command**: Dashboard/Overview, Usage Monitor, Monitoring & Health, Reports
- **APIs**: API Services, API Keys, Integrations, Product API Control, Role API Control, Rate Limits
- **AI**: AI Models & Agents, Model Registry, Prompt Management, Fine-Tuning, Model Evaluation, Version Lifecycle, On-Device AI, AI Safety, Data Governance
- **Money**: Billing Engine, Billing Allocation, Wallet System, Cost Optimizer
- **Trust**: Security & Access, Security Alerts, Incidents & Alerts, Audit Logs, AI Decision Logs, API Logs
- **Ops**: Automation Rules, Emergency Controls & Kill Switch, Settings

Where two source modules cover the same ground (e.g. three separate "API keys" views), the merged screen keeps the union of columns, filters, and actions from all of them so no feature is dropped.

### 5. Finish
- `/` redirects into the shell; per-route `head()` metadata; responsive layout; empty/loading/error states everywhere.
- Verify each screen in the browser against the original repo screens, one section at a time.

## Technical notes
- Conversions required: React Router → TanStack Router file routes, `framer-motion` → `motion`, Tailwind v3 HSL vars → Tailwind v4 oklch `@theme`, `src/pages` → `src/routes`, direct Supabase browser reads → server functions.
- This is a large port (~11k lines of source UI plus a new backend), so I'll build it in the section order above and report progress as each group of screens lands.
