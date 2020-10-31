import { Router } from 'express'
import { JwtPayload, signPayload } from 'src/auth/jwt'
import {
  LoginBodySchema,
  LoginRequestDTO,
  RegisterBodySchema,
  RegisterRequestDTO,
} from 'src/models/dtos/auth'
import { UserODM } from 'src/models/odms/user'
import { ValidatedRequest } from 'express-joi-validation'
import validator from 'src/models/dtos/validator'
import { UserRole } from 'src/models/interfaces/user'

export const router = Router()

router.post(
  '/register',
  validator.body(RegisterBodySchema),
  async (req: ValidatedRequest<RegisterRequestDTO>, res) => {
    const data = {
      ...req.body,
      profile: {
        headline: 'New user',
        description: 'Empty',
      },
    } as any

    if (data.role === UserRole.CETATEAN) {
      const primarieName = data.primarie as string
      const primarie = await UserODM.findOne({
        username: primarieName,
        role: UserRole.PRIMARIE,
      }).exec()
      data.primarie = primarie?.id
    }

    const user = await UserODM.create(data)
    res.json(user)
  }
)

router.post(
  '/login',
  validator.body(LoginBodySchema),
  async (req: ValidatedRequest<LoginRequestDTO>, res) => {
    const user = await UserODM.findByIdentifier(req.body.username)
    if (!user || !(await user.isValidPassword(req.body.password)))
      throw Error('Invalid creds')

    res.json({
      token: signPayload({
        id: user.id,
        username: user.username,
      } as JwtPayload),
    })
  }
)
