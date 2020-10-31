import { UserRole, UserRoles } from '../interfaces/user'
import * as Joi from '@hapi/joi'
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation'

export const RegisterBodySchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().optional(),
  password: Joi.string().required(),
  role: Joi.number()
    .integer()
    .valid(...UserRoles)
    .required(),
  primarie: Joi.string().optional(),
})

export interface RegisterRequestDTO extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    username: string
    email?: string
    password: string
    role: UserRole
    primarie?: string
  }
}

export const LoginBodySchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

export interface LoginRequestDTO extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    username: string
    password: string
  }
}
