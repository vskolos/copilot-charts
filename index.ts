import { chartImageRequestSchema } from '@/schemas/chart-image-request-schema.ts'
import { renderChartImage } from '@/server/render-chart-image.ts'
import { RequestValidationError } from '@/server/request-validation-error.ts'
import { UnprocessableDataError } from '@/server/unprocessable-data-error.ts'

const server = Bun.serve({
  port: Number(process.env['PORT']) || 3000,

  routes: {
    '/get-chart-image': {
      POST: async (req) => {
        try {
          const body: unknown = await req.json()
          const parsed = chartImageRequestSchema.safeParse(body)

          if (!parsed.success) {
            const [issue] = parsed.error.issues

            if (issue?.path[0] === 'data') {
              throw new UnprocessableDataError(issue.message)
            }

            throw new RequestValidationError(
              issue?.message ?? 'invalid request',
            )
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

          console.error(error)

          return Response.json(
            { error: 'internal server error' },
            { status: 500 },
          )
        }
      },
    },
  },

  fetch() {
    return Response.json({ error: 'not found' }, { status: 404 })
  },
})

console.info(`Server running at ${server.url}`)
