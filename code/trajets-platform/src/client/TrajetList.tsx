// The composition TrajetList: its properties are the props.
// Generated from the model: change the model, not this file.
import { Trajet } from '../common/entities'
import { formatCell } from './values'
import { Table, useLang } from '@kogitec/core/client'

export type TrajetListProps = {
  documents?: Trajet[]
  selected?: Trajet
  onChange?: (value?: Trajet) => unknown
}

export const TrajetList = ({ documents, selected, onChange }: TrajetListProps) => {
  const language = useLang()
  return (
    <Table
      columns={[
        { name: 'conducteur', title: 'trajets:TrajetList.table.columns.conducteur.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).conducteur, language) },
        { name: 'places', title: 'trajets:TrajetList.table.columns.places.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).places, language) },
        { name: 'prix', title: 'trajets:TrajetList.table.columns.prix.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).prix, language) },
        { name: 'dateDepart', title: 'trajets:TrajetList.table.columns.dateDepart.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).dateDepart, language) },
        { name: 'heureDepart', title: 'trajets:TrajetList.table.columns.heureDepart.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).heureDepart, language) },
        { name: 'reserveLe', title: 'trajets:TrajetList.table.columns.reserveLe.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).reserveLe, language) },
        { name: 'notes', title: 'trajets:TrajetList.table.columns.notes.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).notes, language) },
        { name: 'options', title: 'trajets:TrajetList.table.columns.options.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).options, language) }
      ]}
      rows={documents ?? []}
      getRowKey={(row, index) => String((row as unknown as Record<string, unknown>)._id ?? index)}
      selectedKey={String((selected as unknown as Record<string, unknown> | undefined)?._id ?? '')}
      onSelect={async (value) => {
        if ((await onChange?.(value)) === false) return
      }} />
  )
}
