import { ProfileInterface } from './profile'

export interface UserInterface {
  username: string
  password: string
  email?: string
  role: UserRole
  profile: ProfileInterface
  primarie?: UserInterface
  nrinregCrt?: number
}

export enum UserRole {
  DEFAULT,
  CETATEAN,
  PRIMARIE,
  ADMIN,
}
export const UserRoles = [
  UserRole.DEFAULT,
  UserRole.CETATEAN,
  UserRole.PRIMARIE,
  UserRole.ADMIN,
]
