# syntax=docker/dockerfile:1

FROM node:24-bookworm-slim

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches/ ./patches/
RUN pnpm install --frozen-lockfile --prod

COPY index.ts tsconfig.json ./
COPY src ./src

RUN mkdir -p /data/charts \
  && chown -R node:node /data/charts /app

USER node

CMD ["node", "index.ts"]
