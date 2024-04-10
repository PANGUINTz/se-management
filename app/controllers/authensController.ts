import RelationUser from '#models/relation_user'
import User from '#models/user'
import { signInValidator, signUpValidator } from '#validators/auth'
import { HttpContext } from '@adonisjs/core/http'
import string from '@adonisjs/core/helpers/string'
import hash from '@adonisjs/core/services/hash'
import mail from '@adonisjs/mail/services/main'

export default class AuthensController {
  async authTokenGenerate(id: number) {
    try {
      const user = await User.findOrFail(id)
      // const verifyUser = await User.verifyCredentials(user?.email, Env.get('APPLICATION_PASSWORD'))

      const token = await User.accessTokens.create(user)

      const response = {
        type: 'bearer',
        accessToken: token.value!.release(),
      }

      return response
    } catch (error) {
      return error?.code
    }
  }

  async signUp({ response, request }: HttpContext) {
    try {
      const payload = await signUpValidator.validate(request.all())

      const emailExist = await User.findBy('email', payload.email)
      if (!emailExist) {
        const user = await User.create(payload)
        await RelationUser.create({
          userId: user.id,
          slug: string.random(20),
        })
        await mail.send((message) => {
          message.to(user.email).from('ponphat').subject('Verify your email').html(`
          <div>
          <center><b>Verify your email</b></center>
          <center><p>Thank for helping us keep your account secure! Click the button below to finish verifying your email address</p><center/>
          <div style="padding:10px;width:100%;border-radius:20px;backgroud-color:white">
          <a href="http://localhost:3333/api/auth/verify/${user.id}" style="text-decoration:none">CONFIRM EMAIL</a>
          </div>
          </div>
          `)
        })
        return response.send({ message: 'Success. email sent', success: true, code: 200 })
      }
      return response.send({ message: 'Error, email already exists.', success: false, code: 400 })
    } catch (error) {
      console.log(error)

      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }

  async signIn({ response, request }: HttpContext) {
    try {
      const payload = await signInValidator.validate(request.all())

      const user = await User.findBy('email', payload.email)
      if (!user) {
        return response.send({ message: 'Error, not found user.', success: false, code: 404 })
      }

      if (!user.isActive) {
        return response.send({ message: 'please verify your email', success: false, code: 400 })
      }

      const hashedPassword = await hash.verify(user.password, payload.password)
      if (!hashedPassword) {
        return response.send({
          message: 'Error, password is not correct',
          success: false,
          code: 400,
        })
      }

      const token = await this.authTokenGenerate(user.id)
      response.send({ message: 'Success', success: true, data: token })
    } catch (error) {
      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }

  async changeStatus({ response, request }: HttpContext) {
    try {
      const { id } = request.params()
      await User.query().where('id', id).update('is_active', true)
      return response.send('<center> Email Confirmed </center>')
    } catch (error) {
      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }
}
