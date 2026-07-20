# Reservatdea

Full-stack reservation system: Spring Boot API + React (Vite) frontend.

## Repository

https://github.com/diegobotia/reservatdea

## Backend

- Spring Boot 4, Java 21, PostgreSQL, springdoc-openapi
- API base: `http://localhost:8080`
- Main routes: `GET/POST /reservas`, `DELETE /reservas/{id}`

```bash
./mvnw spring-boot:run
```

Database defaults (overridable via env): `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`.

## Frontend

- React + Vite + Axios
- Dev server: `http://localhost:3000` (CORS allowed)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
