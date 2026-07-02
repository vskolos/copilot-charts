import type { IncomingMessage } from 'node:http'

import { createServer } from 'node:http'

import { chartImageRequestSchema } from '#/schemas/chart-image-request-schema.ts'
import { renderChartImage } from '#/server/render-chart-image.ts'
import { RequestValidationError } from '#/server/request-validation-error.ts'
import { UnprocessableDataError } from '#/server/unprocessable-data-error.ts'

const port = Number(process.env['PORT']) || 3000

async function handleGetChartImage(req: IncomingMessage) {
  try {
    const body: unknown = JSON.parse(await readBody(req))
    const parsed = chartImageRequestSchema.safeParse(body)

    if (!parsed.success) {
      const [issue] = parsed.error.issues

      if (issue?.path[0] === 'data') {
        throw new UnprocessableDataError(issue.message)
      }

      throw new RequestValidationError(issue?.message ?? 'invalid request')
    }

    const result = await renderChartImage(parsed.data)

    return Response.json(result)
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return Response.json({ error: error.message }, { status: 400 })
    }

    if (error instanceof UnprocessableDataError) {
      return Response.json({ error: error.message }, { status: 422 })
    }

    if (error instanceof SyntaxError) {
      return Response.json({ error: 'invalid request' }, { status: 400 })
    }

    console.error(error)

    return Response.json({ error: 'internal server error' }, { status: 500 })
  }
}

function readBody(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = []

    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })

    req.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf8'))
    })

    req.on('error', reject)
  })
}

const server = createServer(async (req, res) => {
  const url = new URL(
    req.url ?? '/',
    `http://${req.headers.host ?? 'localhost'}`,
  )

  if (req.method === 'POST' && url.pathname === '/get-chart-image') {
    const response = await handleGetChartImage(req)
    res.writeHead(response.status, Object.fromEntries(response.headers))
    res.end(Buffer.from(await response.arrayBuffer()))
    return
  }

  res.writeHead(404, { 'content-type': 'application/json' })
  res.end(JSON.stringify({ error: 'not found' }))
})

server.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`)
})
