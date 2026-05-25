# Ecommerce Project Structure

This workspace is organized as a monorepo with a Next.js frontend, an Express backend, and MongoDB as the database.

Frontend rules:
- Use Next.js + React + TypeScript
- Use Tailwind CSS only for styling

## Root Layout

```text
ecommerce-project/
├── client/
├── server/
├── README.md
├── .gitignore
└── package.json
```
suii

## Client

```text
client/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── context/
│   ├── types/
│   └── styles/
├── next.config.js
├── next-env.d.ts
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

## Server

```text
server/
├── src/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
├── package.json
└── .env
```

The scaffold is ready for product browsing, product details, cart, checkout, auth, and order APIs.
