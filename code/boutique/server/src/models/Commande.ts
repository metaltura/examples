import { randomUUID } from 'node:crypto'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
  {
    id: { type: String, required: true, unique: true, default: () => randomUUID() },
    total: { type: Number },
    date: { type: Date, required: true },
    numero: { type: String, required: true },
    clientId: { type: String, required: true, ref: 'Client' },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  {
    collection: 'Commande',
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: (_doc: unknown, ret: any) => {
        delete ret._id
        return ret
      },
    },
  },
)

export default mongoose.model('Commande', schema)
