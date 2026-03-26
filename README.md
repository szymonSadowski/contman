# contman

## Frontend

### Setup

```bash
cd frontend
npm install
```

### Run

```bash
npm run dev
```

Server starts on `http://localhost:5173`.

### Routes

| Path        | Description                 |
| ----------- | --------------------------- |
| `/`         | Landing page with all users |
| `/user/:id` | User data and his features  |

## Backend

### Setup

```bash
cd backend
npm install
```

### Run

```bash
`npm start` / `npm run dev`
```

Server starts on `http://localhost:3000`.

### Endpoints

| Method | Path             | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/users`         | All users     |
| GET    | `/users/:id`     | User by id    |
| GET    | `/companies`     | All companies |
| GET    | `/companies/:id` | Company by id |
