# ShopCo - E-Commerce Platform

A full-stack e-commerce application built with modern technologies, featuring a Next.js frontend and a NestJS backend with comprehensive product management, authentication, and admin capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

ShopCo is a modern, scalable e-commerce platform designed to provide a seamless shopping experience. The application follows a monorepo architecture with separate client and server applications, offering a robust foundation for building feature-rich online stores.

The platform is built with developer experience in mind, utilizing the latest versions of industry-standard frameworks and libraries to ensure maintainability, scalability, and performance.

## ✨ Features

### Customer Features
- 🛍️ Browse and search products with pagination
- 🔍 View detailed product information with image galleries
- 📱 Fully responsive design for all devices
- 👤 User registration and authentication
- 🔐 Secure password reset functionality
- 📧 Email notifications
- 📰 Newsletter subscription

### Admin Features
- 📊 Comprehensive admin dashboard
- ➕ Complete product management (CRUD operations)
- 🏷️ Category management system
- 📷 Image upload and management with UploadThing
- 👥 User management
- 🎫 Admin invitation system
- 🔒 Role-based access control (RBAC)
- 📦 Product inventory tracking (In Stock/Out of Stock)

### Technical Features
- 🔐 JWT-based authentication with refresh tokens
- 📧 Email service with customizable Handlebars templates
- 📤 File upload and management with UploadThing
- 🚀 Background job processing with BullMQ and Redis
- 💾 PostgreSQL database with TypeORM
- 🔄 Optimistic UI updates with SWR
- ✅ Comprehensive form validation with Zod
- 🎨 Modern, accessible UI with Radix UI components
- 🔥 Hot module replacement with Turbopack
- 🧪 Testing setup with Jest

## 🛠️ Tech Stack

### Frontend (`/client`)

**Core Framework & Runtime**
- **Next.js** 15.5.2 - React framework with App Router and Server Actions
- **React** 19.1.0 - UI library with latest concurrent features
- **TypeScript** 5.x - Type-safe JavaScript
- **Turbopack** - Next-generation bundler for faster builds

**Styling & UI**
- **TailwindCSS** 4.x - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled component primitives
  - Dialog, Separator, Slot, Tooltip components
- **Lucide React** 0.542.0 - Beautiful icon library
- **Class Variance Authority** 0.7.1 - Type-safe component variants
- **Tailwind Merge** 3.3.1 - Efficient class merging

**Data Management**
- **SWR** 2.3.6 - React Hooks for data fetching and caching
- **Axios** 1.12.2 - HTTP client
- **TanStack Table** 8.21.3 - Headless table library

**Authentication & Validation**
- **NextAuth** 5.0.0-beta.29 - Authentication for Next.js
- **Zod** 4.1.11 - TypeScript-first schema validation

**File Uploads**
- **UploadThing** 7.7.4 - File upload handling
- **@uploadthing/react** 7.3.3 - React components for UploadThing

**Development Tools**
- **ESLint** 9.x - Code linting
- **PostCSS** - CSS processing

### Backend (`/server`)

**Core Framework & Runtime**
- **NestJS** 11.x - Progressive Node.js framework
- **TypeScript** 5.7.3 - Type-safe JavaScript
- **Node.js** >= 18.13.0 - JavaScript runtime

**Database & ORM**
- **TypeORM** 0.3.26 - TypeScript ORM
- **PostgreSQL** - Primary relational database
- **pg** 8.16.3 - PostgreSQL client

**Authentication & Security**
- **@nestjs/jwt** 11.0.0 - JWT authentication
- **Bcryptjs** 3.0.2 - Password hashing
- **Reflect Metadata** 0.2.2 - Decorator metadata

**Background Jobs & Queuing**
- **BullMQ** 5.58.9 - Premium message queue
- **@nestjs/bullmq** 11.0.3 - NestJS BullMQ integration
- **Redis** - Queue backend

**Email**
- **@nestjs-modules/mailer** 2.0.2 - Email service
- **Handlebars** 4.7.8 - Template engine for emails

**Validation**
- **@nestjs/class-validator** 0.13.4 - Validation decorators
- **@nestjs/class-transformer** 0.4.0 - Object transformation

**Configuration**
- **@nestjs/config** 4.0.2 - Configuration module
- **@nestjs/mapped-types** 2.1.0 - Type mapping utilities

**Testing**
- **Jest** 29.7.0 - Testing framework
- **Supertest** 7.0.0 - HTTP assertion library
- **ts-jest** 29.2.5 - TypeScript preprocessor for Jest

**Development Tools**
- **ESLint** 9.x - Code linting
- **Prettier** 3.4.2 - Code formatting
- **SWC** 1.10.7 - Fast TypeScript/JavaScript compiler
- **TypeScript ESLint** 8.20.0 - TypeScript linting rules

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.13.0
- **pnpm** (recommended) or npm/yarn
- **PostgreSQL** 12+
- **Redis** (for background jobs)
- **UploadThing Account** (for file uploads)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shopco
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd client
   pnpm install

   # Install backend dependencies
   cd ../server
   pnpm install
   ```

3. **Set up environment variables**
   
   Create `.env` files in both `client` and `server` directories based on the respective README files.

4. **Start the development servers**
   
   **Frontend:**
   ```bash
   cd client
   pnpm dev
   ```
   Runs on http://localhost:3000 (Next.js default)

   **Backend:**
   ```bash
   cd server
   pnpm start:dev
   ```
   Runs on http://localhost:3000/api/v1 (or configured PORT)

## 📁 Project Structure

```
shopco/
├── client/              # Next.js frontend application
│   ├── public/         # Static assets
│   ├── src/            # Source code
│   └── README.md       # Client-specific documentation
│
└── server/             # NestJS backend application
    ├── src/            # Source code
    ├── test/           # Test files
    └── README.md       # Server-specific documentation
```

## 📚 Documentation

Detailed documentation for each part of the application can be found in their respective directories:

- **[Client Documentation](./client/README.md)** - Frontend setup, configuration, components, and API integration
- **[Server Documentation](./server/README.md)** - Backend setup, API endpoints, database schema, and architecture

## 💻 Development

### Frontend Development

```bash
cd client

# Development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Backend Development

```bash
cd server

# Development server with watch mode
pnpm start:dev

# Development with debug mode
pnpm start:debug

# Build for production
pnpm build

# Start production server
pnpm start:prod

# Lint code
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate test coverage
pnpm test:cov
```

## 🏗️ Building for Production

### Frontend
```bash
cd client
pnpm build
pnpm start
```

### Backend
```bash
cd server
pnpm build
pnpm start:prod
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and passes all tests.

## 📄 License

This project is licensed under the UNLICENSED License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- [UploadThing](https://uploadthing.com/) - File uploads made easy
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeORM](https://typeorm.io/) - ORM for TypeScript and JavaScript
- [BullMQ](https://docs.bullmq.io/) - Premium Queue Package

---

**Built with ❤️ using modern web technologies**