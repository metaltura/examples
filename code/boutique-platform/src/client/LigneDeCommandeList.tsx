// The composition LigneDeCommandeList: its properties are the props.
// Generated from the model: change the model, not this file.
import { LigneDeCommande } from '../common/entities'
import { formatCell } from './values'
import { Table, useLang } from '@kogitec/core/client'

export type LigneDeCommandeListProps = {
  documents?: LigneDeCommande[]
  selected?: LigneDeCommande
  onChange?: (value?: LigneDeCommande) => unknown
}

export const LigneDeCommandeList = ({ documents, selected, onChange }: LigneDeCommandeListProps) => {
  const language = useLang()
  return (
    <Table
      columns={[
        { name: 'quantite', title: 'boutique:LigneDeCommandeList.table.columns.quantite.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).quantite, language) }
      ]}
      rows={documents ?? []}
      getRowKey={(row, index) => String((row as unknown as Record<string, unknown>)._id ?? index)}
      selectedKey={String((selected as unknown as Record<string, unknown> | undefined)?._id ?? '')}
      onSelect={async (value) => {
        if ((await onChange?.(value)) === false) return
      }} />
  )
}
