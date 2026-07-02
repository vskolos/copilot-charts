# syntax=docker/dockerfile:1

FROM oven/bun:1-debian

WORKDIR /app

COPY package.json bun.lock ./
COPY patches/ ./patches/
RUN bun install --frozen-lockfile --production

COPY index.ts tsconfig.json ./
COPY src ./src

RUN mkdir -p /data/charts \
  && chown -R bun:bun /data/charts /app

USER bun

CMD ["bun", "index.ts"]
