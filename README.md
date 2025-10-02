# Landing Page - Waitlist Application

## Setup

### Prerequisites

- Node.js 20+
- pnpm
- Docker (for local Postgres)

### Environment Variables

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill in your credentials:
   - `NEXT_PUBLIC_PRIVY_APP_ID`: Your Privy App ID
   - `PRIVY_APP_SECRET`: Your Privy App Secret (server-side only)
   - `DATABASE_URL`: Already set for local development

### Local Development

1. Install dependencies:

```bash
pnpm install
```

2. Start local Postgres database:

```bash
pnpm db:start
```

3. Push database schema:

```bash
pnpm db:push
```

4. Start the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Stopping Local Database

```bash
pnpm db:stop
```

### Database Management

- **View database with Prisma Studio**:
  ```bash
  pnpm db:studio
  ```
  Opens at [http://localhost:5555](http://localhost:5555)

- **Generate Prisma Client**:
  ```bash
  pnpm db:generate
  ```

- **Create and apply migrations**:
  ```bash
  pnpm db:migrate
  ```

- **Push schema without migrations** (development only):
  ```bash
  pnpm db:push
  ```

## Features

### Waitlist System

- Users connect their wallet via Privy
- Optional email collection
- Wallet address validation
- Authentication verification via Privy JWT
- Duplicate prevention
- IP and device tracking

### Security

- Server-side authentication with Privy
- Wallet ownership verification
- Valid Ethereum address validation
- Postgres unique constraints to prevent duplicates

## Database Schema

### Waitlist Table (Postgres)

```sql
CREATE TABLE waitlist (
  wallet_address VARCHAR(42) NOT NULL UNIQUE,
  email VARCHAR(255),
  ip VARCHAR(45) NOT NULL,
  user_agent VARCHAR(512) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

**Columns**:
- `wallet_address` - Ethereum wallet address (unique)
- `email` - User email (optional)
- `ip` - User IP address
- `user_agent` - Browser user agent
- `created_at` - Timestamp of registration

## Production Deployment

### Vercel with Neon DB

1. Create a Neon database at [neon.tech](https://neon.tech)

2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_PRIVY_APP_ID`
   - `PRIVY_APP_SECRET`
   - `DATABASE_URL` - Your Neon database connection string

3. Vercel will automatically detect the Neon integration and configure pooling

4. Push schema to production:
   ```bash
   pnpm db:push
   ```

## API Endpoints

### POST /api/waitlist

Submit a wallet address to the waitlist.

**Request Body**:
```json
{
  "walletAddress": "0x...",
  "email": "user@example.com",
  "privyToken": "eyJ..."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully joined the waitlist",
  "data": {
    "walletAddress": "0x...",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Responses**:
- `400`: Invalid request (missing fields or invalid wallet address)
- `401`: Authentication failed
- `403`: Wallet address doesn't match authenticated user
- `409`: Wallet address already registered
- `500`: Server error
