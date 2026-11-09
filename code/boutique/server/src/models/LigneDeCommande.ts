import { randomUUID } from 'node:crypto'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
  {
    id: { type: String, required: true, unique: true, default: () => randomUUID() },
    quantite: { type: Number, required: true },
    commandeId: { type: String, required: true, ref: 'Commande' },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  {
    collection: 'LigneDeCommande',
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

export default mongoose.model('LigneDeCommande', schema)
