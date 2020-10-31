import { UserInterface } from './user'

export interface SablonInterface {
  name: string
  necesare: NecesarInterface[]
  author: UserInterface
}

export interface NecesarInterface {
  name: string
  type: string
  text: string
}
