import { Document, Schema, model } from 'mongoose'
import { ActInterface } from '../interfaces/act'

export interface ActDocument extends ActInterface, Document {}
export const ActSchema = new Schema(
  {
    originalFilename: String,
    filename: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)
export const ActODM = model<ActDocument>('Act', ActSchema)
