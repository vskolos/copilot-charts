---
description: Use Node.js 24 and pnpm for this project.
globs: '*.ts, *.tsx, *.html, *.css, *.js, *.jsx, package.json'
alwaysApply: false
---

Default to using Node.js 24 and pnpm.

- Use `node <file>` to run TypeScript directly (native type stripping)
- Use `node --watch <file>` for development
- Use `pnpm install` instead of npm, yarn, or bun install
- Use `pnpm run <script>` instead of npm run or bun run
- Use `pnpm dlx <package> <command>` instead of npx or bunx
- Use `node --test` for tests (no extra test runner dependency)

## APIs

- Use native `node:http` for the HTTP server
- Use `node:fs/promises` for file I/O
- Use `node:path` and `node:url` for path resolution
- Path aliases (`#/*`) are defined in `package.json` `"imports"`

## Testing

Use `node:test` with `node:assert/strict`.

```ts#index.test.ts
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

describe('example', () => {
  test('hello world', () => {
    assert.strictEqual(1, 1)
  })
})
```

Run tests:

```sh
pnpm test
```

## Type checking

Node strips types at runtime but does not type-check. Run:

```sh
pnpm typecheck
```
