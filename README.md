ShopPro Deployment & Usage Documentation
#  ShopPro

Full-stack automotive repair shop management platform.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: NestJS + Prisma + PostgreSQL
- **Database**: PostgreSQL 15 (Dockerized)
- **DevOps**: Docker, Docker Compose
- **Web Server**: NGINX (for static site delivery)

---

## Minimum System Requirements

| Environment      | CPU         | RAM     | Storage | OS                  |
|------------------|-------------|---------|---------|---------------------|
| **Development**  | 4 cores     | 8 GB    | 10 GB   | Ubuntu/macOS/WSL2   |
| **Production**   | 4+ vCPUs    | 8â€“16 GB | 20+ GB  | Ubuntu 22.04 LTS    |

---

## Prerequisites

- Docker v24+
- Docker Compose v2+
- Node.js v18+ (for local dev)
- Git
- Optional: Static IP, domain, SSL certs

---

## Quick Start (Development)

```bash
git clone https://github.com/your-org/shoppro.git
cd shoppro
cp .env.example .env   # Edit credentials and secrets
docker-compose up --build

    Frontend: http://localhost:5173

    Backend API: http://localhost:3000

    PostgreSQL: internal port 5432

##  Environment Variables (.env)

	DATABASE_URL=postgresql://admin:password@db:5432/shoppro
	JWT_SECRET=your_jwt_secret
	SMTP_HOST=smtp.gmail.com
	SMTP_USER=your@email.com
	SMTP_PASS=your_password
	PARTSTECH_API_KEY=your_partstech_key

## Available Scripts
	Frontend (/frontend)
	Command	Description
	npm run dev	Start Vite dev server
	npm run build	Production build
	npm run test	Unit tests via Vitest

## Backend (/backend)
	npm run start:dev	Dev server with hot reload
	npx prisma generate	Generate Prisma client
	npx prisma migrate dev	Create + apply migrations
	npm run test	Unit & integration tests

## Dockerized Deployment
Build and Run (All Services)

	docker-compose up --build

Reset DB Schema

	docker-compose exec backend npx prisma migrate reset

Publish Docker Images
Push to GitHub Container Registry (GHCR)

	docker tag shoppro-backend ghcr.io/proforcetech/shoppro-backend:latest
	docker tag shoppro-frontend ghcr.io/proforcetech/shoppro-frontend:latest

	docker push ghcr.io/spirited8082/shoppro-backend:latest
	docker push ghcr.io/spirited8082/shoppro-frontend:latest

Run Pulled Images

	docker run -d -p 3000:3000 ghcr.io/your-org/shoppro-backend:latest
	docker run -d -p 5173:80 ghcr.io/your-org/shoppro-frontend:latest

## Optional SSL with NGINX

Update /frontend/nginx.conf:

	server {
	    listen 443 ssl;
	    ssl_certificate /etc/nginx/ssl/cert.pem;
	    ssl_certificate_key /etc/nginx/ssl/key.pem;

	    root /usr/share/nginx/html;
	    index index.html;

	    location / {
	        try_files $uri /index.html;
	    }
	}

## Additional Docs & Support

    Prisma Docs

    NestJS Docs

    Vite Docs

    React Docs

## Contributing

    Fork it

    Create your feature branch

    Commit your changes

    Push and open PR

# License

MIT Â© 2025 Advanced Alternative Solutions LLC
