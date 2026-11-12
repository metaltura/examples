// The composition LecteurList: its properties are the props.
// Generated from the model: change the model, not this file.
import { Lecteur } from '../common/entities'
import { formatCell } from './values'
import { Table, useLang } from '@kogitec/core/client'

export type LecteurListProps = {
  documents?: Lecteur[]
  selected?: Lecteur
  onChange?: (value?: Lecteur) => unknown
}

export const LecteurList = ({ documents, selected, onChange }: LecteurListProps) => {
  const language = useLang()
  return (
    <Table
      columns={[
        { name: 'nom', title: 'bibliotheque:LecteurList.table.columns.nom.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).nom, language) },
        { name: 'courriel', title: 'bibliotheque:LecteurList.table.columns.courriel.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).courriel, language) }
      ]}
      rows={documents ?? []}
      getRowKey={(row, index) => String((row as unknown as Record<string, unknown>)._id ?? index)}
      selectedKey={String((selected as unknown as Record<string, unknown> | undefined)?._id ?? '')}
      onSelect={async (value) => {
        if ((await onChange?.(value)) === false) return
      }} />
  )
}
