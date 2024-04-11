import Route from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import Env from '#start/env'
import TransactionsController from '#controllers/transactionsController'

const route = 'transactions'

Route.group(() => {
  Route.get(`${route}`, [TransactionsController, 'index'])
  Route.get(`${route}/:id`, [TransactionsController, 'edit'])
  Route.get(`${route}/customer/:customerId`, [TransactionsController, 'customer'])
  Route.post(`${route}`, [TransactionsController, 'store'])
  Route.post(`${route}/:id`, [TransactionsController, 'update'])
})
  .prefix(Env.get('APPLICATION_ROUTE'))
  .use(middleware.auth())
  .use(middleware.role(['ADMIN', 'OWNER', 'STAFF']))
