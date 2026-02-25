# Task Management Dashboard

A comprehensive task management application with a Go backend and a React frontend.

## Project Structure

- `src/`: Backend source code (Go, Docker, PostgreSQL)
- `web/`: Frontend source code (React, TypeScript, Vite)

---

## Backend Setup (Go)

The backend is built with Go and is containerized using Docker.

### Prerequisites
- Docker and Docker Compose installed.

### Running via Docker
1. Navigate to the backend directory:
   ```bash
   cd src
   ```
2. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
   The backend API will be accessible at `http://localhost:8080`.

### Environment Variables
The backend uses a `.env` file located in the `src/` directory. Ensure it contains the correct `DATABASE_URL` and other necessary configurations.

---

## Frontend Setup (React + TypeScript + Vite)

The frontend is a modern web application built with React and Vite.

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Running Locally
1. Navigate to the frontend directory:
   ```bash
   cd web
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `web/` directory if you need to override API endpoints:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

### Running Tests
The project uses **Vitest** for unit testing.
To run the tests:
```bash
cd web
npm run test
```
To run tests once (without watch mode):
```bash
npm run test -- run
```

### Building for Production
To create an optimized production build:
```bash
cd web
npm run build
```

---

## Future Ideas
- **Backend Hosting**: Deploy the REST API to **AWS** (e.g., AWS ECS, Lambda, or EC2).
- **Frontend Hosting**: Deploy the web application to **Vercel** for seamless React/Vite integration.

---

## License
Refer to the `LICENSE` file for more information.

