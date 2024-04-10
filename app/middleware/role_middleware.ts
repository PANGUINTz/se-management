import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import db from '@adonisjs/lucid/services/db'

export default class RoleMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn, allowedRoles: string[]) {
    if (auth.user) {
      const relationUser = await db
        .from('relation_users')
        .where('relation_users.user_id', auth.user.id)
        .join('roles', 'relation_users.role_id', '=', 'roles.id')

      const allowed = allowedRoles.includes(relationUser[0].role)

      if (!allowed) {
        return response.status(403).json({ error: 'Access denied. Insufficient role permissions.' })
      }
    }

    await next()
  }
}
