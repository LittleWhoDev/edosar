import { Document, Schema, model } from 'mongoose'
import { DosarInterface, Statut } from '../interfaces/dosar'
import { SablonDocument } from './sablon'
import { UserDocument } from './user'

export interface DosarDocument extends DosarInterface, Document {
  sablon: SablonDocument
  from: UserDocument
  to: UserDocument
}
export const DosarSchema = new Schema(
  {
    name: String,
    sablon: {
      type: Schema.Types.ObjectId,
      ref: 'Sablon',
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: Statut,
      default: Statut.IN_ASTEPTARE,
    },
  },
  { timestamps: true, strict: false }
)
export const DosarODM = model<DosarDocument>('Dosar', DosarSchema)
