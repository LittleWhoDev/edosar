import { SablonInterface } from './sablon'
import { UserInterface } from './user'

export interface DosarInterface {
  name: string
  sablon: SablonInterface
  from: UserInterface
  to: UserInterface
  statut: Statut
  [key: string]: any
}

export enum Statut {
  IN_ASTEPTARE,
  TREBUIE_REVIZUIT,
  SOLUTIONAT,
}
