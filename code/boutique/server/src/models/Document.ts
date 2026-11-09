import { randomUUID } from 'node:crypto'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
  {
    id: { type: String, required: true, unique: true, default: () => randomUUID() },
    numero: { type: String, required: true },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  {
    collection: 'Document',
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

export default mongoose.model('Document', schema)
