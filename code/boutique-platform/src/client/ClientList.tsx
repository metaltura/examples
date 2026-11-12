// The composition ClientList: its properties are the props.
// Generated from the model: change the model, not this file.
import { Client } from '../common/entities'
import { formatCell } from './values'
import { Table, useLang } from '@kogitec/core/client'

export type ClientListProps = {
  documents?: Client[]
  selected?: Client
  onChange?: (value?: Client) => unknown
}

export const ClientList = ({ documents, selected, onChange }: ClientListProps) => {
  const language = useLang()
  return (
    <Table
      columns={[
        { name: 'nom', title: 'boutique:ClientList.table.columns.nom.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).nom, language) }
      ]}
      rows={documents ?? []}
      getRowKey={(row, index) => String((row as unknown as Record<string, unknown>)._id ?? index)}
      selectedKey={String((selected as unknown as Record<string, unknown> | undefined)?._id ?? '')}
      onSelect={async (value) => {
        if ((await onChange?.(value)) === false) return
      }} />
  )
}
