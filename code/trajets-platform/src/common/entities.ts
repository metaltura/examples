// The entities of the application: one schema per modelled entity.
// Generated from the model: change the model, not this file.
import {
  dateTime,
  decimal,
  docSchema,
  json,
  localDate,
  long,
  optional,
  string,
  time,
  type Infer
} from '@kogitec/schema/common'

export const Trajet = docSchema({
  name: 'Trajet',
  fields: {
    conducteur: string(),
    places: long(),
    prix: decimal({ scale: 2 }),
    dateDepart: localDate(),
    heureDepart: time(),
    reserveLe: optional(dateTime()),
    notes: optional(string()),
    options: optional(json())
  },
  meta: {
    namespace: 'trajets',
    name: 'Trajet',
    skipTranslation: true,
    access: { read: ['user'], update: ['user'] },
    storage: 'postgres',
    sql: {
      table: 'kitchen_trips',
      columns: {
        conducteur: 'driver_name',
        places: 'seats',
        prix: 'price',
        dateDepart: 'departure_date',
        heureDepart: 'departure_time',
        reserveLe: 'booked_at'
      }
    }
  }
})
export type Trajet = Infer<typeof Trajet>
