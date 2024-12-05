## NextJS Started App

## Getting Started

First, install dependencies with
```bash
npm install --legacy-peer-deps
# or
pnpm install
```


Next, configuring .env file:
```bash
NEXT_PUBLIC_APP_URL=
DATABASE_URL=
SESSION_SECRET=
RESEND_API_KEY=
RESEND_EMAIL_FROM=
```

migrate schema to db using 'npm run db:generate' and 'npm run db:push' or using pnpm too.

Then, configuring your routes and endpoints on middleware-routes.ts file

and last, run the development server:

```bash
npm run dev
# or
pnpm dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Start make your app!
