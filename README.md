# unisouk-referral-system

Referral service for Unisouk, built with NestJS 12, Prisma 7 and PostgreSQL.

## Project structure

```
prisma/
  schema.prisma         # database schema (models go here)
  migrations/           # created by `prisma migrate dev`
prisma.config.ts        # Prisma CLI config (loads .env)
src/
  main.ts               # bootstrap: global ValidationPipe, shutdown hooks
  app.module.ts         # root module
  config/               # environment variable validation
  prisma/               # global PrismaService (injectable DB client)
  health/               # GET /health (database ping)
  generated/            # Prisma client, generated on install - do not edit
test/                   # e2e tests
```

Add each feature (e.g. referrals) as its own module under `src/`: `npx nest g resource referrals`.

## Setup

```bash
cp .env.example .env
docker compose up -d      # PostgreSQL on localhost:5433
npm install               # also runs `prisma generate`
```

## Database

```bash
npx prisma migrate dev --name <change>   # create and apply a migration after editing schema.prisma
npx prisma migrate deploy                # apply migrations in production
npx prisma generate                      # regenerate the client
```

## Run

```bash
npm run start:dev    # watch mode
npm run build && npm run start:prod
```

## Test

```bash
npm run test         # unit tests
npm run test:e2e     # e2e tests (need the database running)
npm run test:cov     # coverage
npm run lint
```

## Observability

In production applications, observability is essential for understanding how your system behaves, detecting issues early, and maintaining reliable performance.

[NestJS Observe](https://observe.nestjs.com) automatically instruments your NestJS application, giving you deep visibility into your system with minimal setup:

- **Distributed tracing:** Follow requests across services and understand how they flow through your system.
- **Waterfall analysis:** Visualize request execution and identify slow operations, bottlenecks, and unexpected delays.
- **Performance analysis:** Analyze application performance in real time and quickly pinpoint areas that need optimization.
- **Metrics:** Track key application and infrastructure metrics to understand system health and performance trends.
- **Logging:** Centralize and correlate logs with traces and other telemetry to make debugging easier.
- **Error tracking:** Detect errors quickly and investigate their root causes with the surrounding context.
- **SLA monitoring:** Track service-level objectives and identify when your application is approaching or exceeding defined thresholds.
- **Alarms and alerts:** Set up alerts for critical errors, performance degradation, SLA violations, and other anomalies so your team can react quickly.

This project is already instrumented. To connect it, run this and approve the code it prints at [observe.nestjs.com/link](https://observe.nestjs.com/link) - signing up for free if you have no account:

```bash
$ npx @nestjs/observe link
```

It writes the app key and secret into `.env` and makes every `nest start` script (`start`, `start:dev`, `start:debug`) load it. In production, set `OBSERVE_APP_KEY` and `OBSERVE_APP_SECRET` in the environment instead.

Or do it by hand: create an application and an API key at [observe.nestjs.com](https://observe.nestjs.com), and set the pair as `OBSERVE_APP_KEY` and `OBSERVE_APP_SECRET` in the environment the app runs in.

The free plan needs no payment details and covers 300,000 events a month. You can also browse the [live demo](https://www.observe-demo.nestjs.com/dashboard) first - the whole dashboard over a busy service's data, with nothing to install.
