# data-charts

Headless Chart.js image export server.

## Setup

Requires Node.js 24+ and [pnpm](https://pnpm.io/).

```bash
corepack enable
pnpm install
```

## Run

```bash
pnpm start
```

Server listens on port `3000` (override with `PORT`).

## API

`POST /get-chart-image`

```json
{
  "type": "bar",
  "data": {
    "Week 1": { "Cat A": 100, "Cat B": 200 }
  },
  "width": 400,
  "height": 300,
  "format": "unit",
  "softColors": false,
  "labelThreshold": 0.05,
  "title": "Weekly revenue"
}
```

Response:

```json
{ "filename": "<uuid>.png" }
```

Images are written to `OUTPUT_DIR` (default: `.charts`).

Supported types: `area`, `bar`, `stacked bar`, `line`, `heatmap`, `donut`, `radar`, `treemap`.

## Docker

```bash
docker compose up --build
```

Chart images are written to `./.charts` on the host (mounted at `/data/charts` in the container).

```bash
curl -X POST http://localhost:3000/get-chart-image \
  -H 'Content-Type: application/json' \
  -d @mocks/bar.json
```

## Test

```bash
pnpm test
```

## Typecheck

```bash
pnpm typecheck
```
