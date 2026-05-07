# RSW Construction Dashboard

UK Construction Portfolio Management Platform built by RainStreamWeb.

**Live:** https://cdash.rsw.work.gd/

## Structure

```
rsw-construction-dashboard/
├── frontend/          # React 19 + Vite 8 + Tailwind CSS 3
├── backend/           # Laravel 11 API
├── ANALYSIS.md        # Full project analysis
└── README.md
```

## Frontend (React + Vite + Tailwind)

15 pages covering full construction project lifecycle:
- Dashboard, Projects, Programme (Gantt), Budget, Resources
- Health & Safety, Subcontractors, Supply Chain, Risk Register
- RFI Tracker, Daily Logs, Site Photos, Documents, AI Assistant

```bash
cd frontend
npm install
npm run dev     # http://localhost:30002
npm run build   # production build
```

## Backend (Laravel 11)

REST API with endpoints for all dashboard modules.

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan serve  # http://localhost:8000
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/{id}` | Project detail |
| GET | `/api/budget` | Budget summary |
| GET | `/api/resources` | Resource allocation |
| GET | `/api/health-safety` | H&S data |
| GET | `/api/subcontractors` | Subcontractor list |
| GET | `/api/supply-chain` | Supply chain items |
| GET | `/api/risk-register` | Risk entries |
| GET | `/api/rfi` | RFI list |
| GET | `/api/daily-logs` | Daily log entries |
| GET | `/api/site-photos` | Photo gallery |
| GET | `/api/documents` | Document list |
| POST | `/api/ai/chat` | AI assistant |

## Tech Stack

- **Frontend:** React 19, Vite 8, Tailwind CSS 3, Recharts 3, Lucide Icons, React Router 7
- **Backend:** Laravel 11, MySQL
- **Design:** Orange accent (#ff6b35), dark sidebar, card-based layout

## License

Proprietary — RainStreamWeb
