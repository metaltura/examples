// The composition CommandeList: its properties are the props.
// Generated from the model: change the model, not this file.
import { Commande } from '../common/entities'
import { formatCell } from './values'
import { Table, useLang } from '@kogitec/core/client'

export type CommandeListProps = {
  documents?: Commande[]
  selected?: Commande
  onChange?: (value?: Commande) => unknown
}

export const CommandeList = ({ documents, selected, onChange }: CommandeListProps) => {
  const language = useLang()
  return (
    <Table
      columns={[
        { name: 'total', title: 'boutique:CommandeList.table.columns.total.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).total, language) },
        { name: 'date', title: 'boutique:CommandeList.table.columns.date.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).date, language) },
        { name: 'numero', title: 'boutique:CommandeList.table.columns.numero.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).numero, language) },
        { name: 'clientLabel', title: 'boutique:CommandeList.table.columns.clientLabel.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).clientLabel, language) }
      ]}
      rows={documents ?? []}
      getRowKey={(row, index) => String((row as unknown as Record<string, unknown>)._id ?? index)}
      selectedKey={String((selected as unknown as Record<string, unknown> | undefined)?._id ?? '')}
      onSelect={async (value) => {
        if ((await onChange?.(value)) === false) return
      }} />
  )
}
