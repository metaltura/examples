// The composition LivreList: its properties are the props.
// Generated from the model: change the model, not this file.
import { Livre } from '../common/entities'
import { formatCell } from './values'
import { Table, useLang } from '@kogitec/core/client'

export type LivreListProps = {
  documents?: Livre[]
  selected?: Livre
  onChange?: (value?: Livre) => unknown
}

export const LivreList = ({ documents, selected, onChange }: LivreListProps) => {
  const language = useLang()
  return (
    <Table
      columns={[
        { name: 'titre', title: 'bibliotheque:LivreList.table.columns.titre.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).titre, language) },
        { name: 'auteurLabel', title: 'bibliotheque:LivreList.table.columns.auteurLabel.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).auteurLabel, language) }
      ]}
      rows={documents ?? []}
      getRowKey={(row, index) => String((row as unknown as Record<string, unknown>)._id ?? index)}
      selectedKey={String((selected as unknown as Record<string, unknown> | undefined)?._id ?? '')}
      onSelect={async (value) => {
        if ((await onChange?.(value)) === false) return
      }} />
  )
}
