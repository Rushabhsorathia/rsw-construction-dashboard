# RSW Construction Dashboard — Project Analysis

**Live URL:** https://cdash.rsw.work.gd/  
**Original Source:** /var/www/RSW/rsw-construction-dashboards  
**Port:** 30002  

## Tech Stack
- **Frontend:** React 19 + Vite 8 + Tailwind CSS 3 + Recharts 3
- **Routing:** React Router DOM 7
- **Icons:** Lucide React
- **Markdown:** react-markdown + remark-gfm
- **Backend:** None (mock data only)

## Pages (15 total)
| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Portfolio overview, KPIs, charts, AI insights |
| Projects | `/projects` | Project list with filtering |
| Project Detail | `/projects/:id` | Single project deep-dive |
| Programme (Gantt) | `/gantt` | Gantt-style timeline |
| Budget | `/budget` | Budget breakdown, committed vs spent |
| Resources | `/resources` | Labour utilization by trade |
| Health & Safety | `/health-safety` | H&S compliance, near misses, RIDDOR |
| Subcontractors | `/subcontractors` | Subcontractor management |
| Supply Chain | `/supply-chain` | Material tracking |
| Risk Register | `/risk-register` | Risk matrix and register |
| RFI Tracker | `/rfi-tracker` | Requests for Information |
| Daily Logs | `/daily-logs` | Site daily records |
| Site Photos | `/site-photos` | Photo gallery |
| Documents | `/documents` | Document management |
| AI Assistant | `/ai-assistant` | AI chatbot interface |

## Data Model
- **6 Projects** across London, Manchester, Bristol, Leeds, Newcastle, Birmingham
- **Total Portfolio Value:** £135.1M
- **Budget categories:** Labour, Materials, Plant, Subcontractors, Prelims, Contingency
- **8 Resource trades** with allocation tracking
- **Gantt phases:** Structure, Envelope, First Fix, Second Fix, Handover
- **AI Insights:** Priority-based alerts (SPI dropping, labour shortfall, H&S patterns)
- **CDM Compliance:** 8 items (Building Safety Act Golden Thread)
- **Risk Register:** 5x5 risk matrix
- **RFI Tracker:** Status tracking with responses

## UI Design
- Dark slate sidebar (#1e293b) with orange accent (#ff6b35)
- RSW brand gradient (orange-500 to orange-600)
- White card-based layout with orange borders
- Responsive sidebar (mobile hamburger)
- Recharts bar charts
- Custom scrollbar styling

## Backend API Requirements (to be built)
- `GET /api/projects` — list all projects
- `GET /api/projects/:id` — project detail
- `GET /api/budget` — budget summary
- `GET /api/resources` — resource allocation
- `GET /api/health-safety` — H&S data
- `GET /api/subcontractors` — subcontractor list
- `GET /api/supply-chain` — supply chain items
- `GET /api/risk-register` — risk entries
- `GET /api/rfi` — RFI list
- `GET /api/daily-logs` — daily log entries
- `GET /api/site-photos` — photo gallery
- `GET /api/documents` — document list
- `POST /api/ai/chat` — AI assistant endpoint
