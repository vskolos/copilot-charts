# data-charts

Headless Chart.js image export server.

## Setup

```bash
bun install
```

`skia-canvas` requires a native binary. If install fails, run:

```bash
bun pm trust skia-canvas && bun install
```

## Run

```bash
bun start
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
  "labelThreshold": 0.05,
  "title": "Weekly revenue"
}
```

Response:

```json
{ "filename": "<uuid>.png" }
```

Images are written to `OUTPUT_DIR` (default: `.charts`).

Supported types: `area`, `bar`, `stacked bar`, `line`, `heatmap`, `donut`, `radar`, `treemap`, `bubble`, `polar area`.

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
bun test
```
