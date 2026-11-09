import { randomUUID } from 'node:crypto'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
  {
    id: { type: String, required: true, unique: true, default: () => randomUUID() },
    nom: { type: String, required: true },
    courriels: { type: [String] },
    state: { type: String, required: true },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  {
    collection: 'Client',
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

export default mongoose.model('Client', schema)
