## Description

<!-- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. -->
Backend Intern Task

## Prerequisites
Node.js
npm
TypeScript knowledge

## Installation

# 1.Clone the repository

```bash
$ git clone <https://github.com/hanyasherif/Backend_Task_Slash.git>
```

# 2.Navigate to project directory

```bash
$ cd project-directory
```

# 3.Install dependencies

```bash
$ npm install
```

# 4.Set up environment variables

Duplicate .env.example file and rename it to .env.
Fill in necessary environment variables in .env file.

## Database Setup

# Prisma Setup

Ensure Prisma is installed globally:

```bash
$ npm install -g prisma
```

# Initialize Prisma configuration:

```bash
$ prisma init
```

# Modify schema.prisma as needed for your database setup.

# Generate Prisma client:

```bash
$ prisma generate
```

# Apply migrations to your database:

```bash
$ prisma migrate dev
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Swagger Documentation
<!-- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. -->

Navigate to http://localhost:3000/api/docs in your browser to view Swagger documentation.

## Test

```bash
# unit tests
$ npm run test
```

## License

Nest is [MIT licensed](LICENSE).
