/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import Env from '#start/env'
import router from '@adonisjs/core/services/router'

import './routes/accounts.ts'
import './routes/auth.js'

router
  .get('/', async () => {
    return {
      message: 'Services is working...!',
      status: true,
    }
  })
  .prefix(Env.get('APPLICATION_ROUTE'))
