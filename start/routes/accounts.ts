import Route from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import Env from '#start/env'

import AccountsController from '#controllers/accountsController'
const route = 'accounts'

Route.group(() => {
  Route.get(`${route}`, [AccountsController, 'index'])
})
  .prefix(Env.get('APPLICATION_ROUTE'))
  .use(middleware.auth())
  .use(middleware.role(['ADMIN']))
