import Route from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import Env from '#start/env'
import CustomersController from '#controllers/customersController'

const route = 'customers'

Route.group(() => {
  Route.get(`${route}`, [CustomersController, 'index'])
  Route.get(`${route}/:id`, [CustomersController, 'edit'])
  Route.post(`${route}`, [CustomersController, 'store'])
  Route.post(`${route}/:id`, [CustomersController, 'update'])
})
  .prefix(Env.get('APPLICATION_ROUTE'))
  .use(middleware.auth())
  .use(middleware.role(['ADMIN', 'OWNER', 'STAFF']))
