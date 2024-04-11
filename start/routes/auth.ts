import Route from '@adonisjs/core/services/router'
import Env from '#start/env'

import AuthensController from '#controllers/authensController'
const route = 'auth'

Route.group(() => {
  Route.post(`${route}/signup`, [AuthensController, 'signUp'])
  Route.post(`${route}/signin`, [AuthensController, 'signIn'])
  Route.post(`${route}/mail`, [AuthensController, 'mail'])
}).prefix(Env.get('APPLICATION_ROUTE'))

Route.get(`${route}/verify/:id`, [AuthensController, 'changeStatus'])
