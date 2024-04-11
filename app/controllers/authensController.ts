import RelationUser from '#models/relation_user'
import User from '#models/user'
import { signInValidator, signUpValidator } from '#validators/auth'
import { HttpContext, Redirect } from '@adonisjs/core/http'
import string from '@adonisjs/core/helpers/string'
import hash from '@adonisjs/core/services/hash'
import mail from '@adonisjs/mail/services/main'

export default class AuthensController {
  async authTokenGenerate(id: number) {
    try {
      const user = await User.findOrFail(id)
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
          message.to(user.email).from('pangza2544@gmail.com').subject('ยืนยันตัวตนอีเมลของคุณ')
            .html(`
          <div>
          <p>สวัสดี</p>
          <p>บัญชีของคุณสมัครเข้าสู่ระบบ คลิกลิ้งค์ข้างล่างเพื่อยืนยันอีเมลนี้</p>
          <button style="padding:10px 15px;background-color:green;border:none;">
          <a href="http://localhost:3333/auth/verify/${user.id}" style="text-decoration:none;color:white">ยืนยันอีเมล</a>
          </button>
          </div>
          `)
        })
        return response.send({ message: 'Success. email sent', status: true, code: 200 })
      }
      return response.send({ message: 'Error, email already exists.', status: false, code: 400 })
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
        return response.send({ message: 'Error, not found user.', status: false, code: 404 })
      }

      if (!user.isActive) {
        return response.send({ message: 'please verify your email', status: false, code: 400 })
      }

      const hashedPassword = await hash.verify(user.password, payload.password)
      if (!hashedPassword) {
        return response.send({
          message: 'Error, password is not correct',
          status: false,
          code: 400,
        })
      }

      const token = await this.authTokenGenerate(user.id)
      response.send({ message: 'Success', status: true, data: token })
    } catch (error) {
      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }

  async mail({ response, request }: HttpContext) {
    try {
      const payload = request.all()
      await mail.send((message) => {
        message.to(payload.email).from('pangza2544@gmail.com').subject('ยืนยันตัวตนอีเมลของคุณ')
          .html(`
        <div>
        <p>สวัสดี</p>
        <p>บัญชีของคุณสมัครเข้าสู่ระบบ คลิกลิ้งค์ข้างล่างเพื่อยืนยันอีเมลนี้</p>
        <button style="padding:5px 15px;background-color:green;border:none;">
        <a href="http://localhost:3333/api/auth/verify/${payload.id}" style="text-decoration:none;color:white">ยืนยันอีเมล</a>
        </button>
        </div>
        `)
      })
      return response.send({ message: 'Success. email sent', status: true, code: 200 })
    } catch (error) {
      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }

  async changeStatus({ response, request }: HttpContext) {
    try {
      const { id } = request.params()
      await User.query().where('id', id).update('is_active', true)
      return response.redirect('https://www.google.com')
    } catch (error) {
      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }
}
