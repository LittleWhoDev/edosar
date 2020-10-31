import { Document, Schema, model } from 'mongoose'
import { NecesarInterface, SablonInterface } from '../interfaces/sablon'
import { UserDocument } from './user'

export interface NecesarDocument extends NecesarInterface, Document {}
export const NecesarSchema = new Schema({
  name: String,
  type: String,
  text: String,
})
export const NecesarODM = model<NecesarDocument>('Necesar', NecesarSchema)

export interface SablonDocument extends SablonInterface, Document {
  author: UserDocument
}
export const SablonSchema = new Schema(
  {
    name: String,
    necesare: [NecesarSchema],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)
export const SablonODM = model<SablonDocument>('Sablon', SablonSchema)
