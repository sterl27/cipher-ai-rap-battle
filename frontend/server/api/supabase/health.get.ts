import { createSupabaseServerClient } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const headerSecret = getHeader(event, 'x-health-check-secret')

  if (process.env.NODE_ENV === 'production') {
    if (!config.healthCheckSecret) {
      throw createError({
        statusCode: 503,
        statusMessage: 'Health endpoint secret is not configured.',
      })
    }

    if (headerSecret !== config.healthCheckSecret) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized health check request.',
      })
    }
  }

  const client = createSupabaseServerClient()

  const { data, error } = await client.auth.admin.listUsers({
    page: 1,
    perPage: 1,
  })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Supabase health check failed: ${error.message}`,
    })
  }

  return {
    ok: true,
    auth: true,
    postgresClientConfigured: true,
    sampleUserCount: data?.users?.length ?? 0,
  }
})
