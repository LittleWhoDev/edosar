import { Document, Schema, model } from 'mongoose'
import { DosarInterface, Statut } from '../interfaces/dosar'
import { SablonDocument } from './sablon'
import { UserDocument, UserODM } from './user'

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
    nrinreg: Number,
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
      default: Statut.IN_LUCRU,
    },
  },
  { timestamps: true, strict: false }
)

DosarSchema.pre('save', async function (next) {
  const dosar = this as DosarDocument
  const primarie = await UserODM.findByIdAndUpdate(dosar.to, {
    $inc: {
      nrinregCrt: 1,
    },
  }).exec()

  dosar.nrinreg = primarie!.nrinregCrt as number
})

export const DosarODM = model<DosarDocument>('Dosar', DosarSchema)
