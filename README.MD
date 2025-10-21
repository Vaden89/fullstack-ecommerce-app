# Shopco

Shopco is a full-stack e-commerce platform built with Next.js (frontend) and NestJS (backend). It provides a modern, scalable foundation for online stores, featuring authentication, product management, and admin capabilities.

## Features

- User authentication (register, login, forgot password)
- Product catalog and management
- Admin dashboard
- Role-based access control
- RESTful API backend
- Modern UI components

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** NestJS, TypeScript
- **Database:** Postgresql
- **Package Manager:** pnpm

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vaden89/fullstack-ecommerce-app.git
   cd fullstack-ecommerce-app
   ```
2. Install dependencies for both client and server:
   ```bash
   cd client && pnpm install
   cd ../server && pnpm install
   ```

### Running the App

- **Frontend:**
  ```bash
  cd client
  pnpm dev
  ```
- **Backend:**
  ```bash
  cd server
  pnpm start:dev
  ```

## Folder Structure

- `client/` - Next.js frontend
- `server/` - NestJS backend

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
