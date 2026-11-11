// The composition DocumentList: its properties are the props.
// Generated from the model: change the model, not this file.
import { Document } from '../common/entities'
import { formatCell } from './values'
import { Table, useLang } from '@kogitec/core/client'

export type DocumentListProps = {
  documents?: Document[]
  selected?: Document
  onChange?: (value?: Document) => unknown
}

export const DocumentList = ({ documents, selected, onChange }: DocumentListProps) => {
  const language = useLang()
  return (
    <Table
      columns={[
        { name: 'numero', title: 'boutique:DocumentList.table.columns.numero.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).numero, language) }
      ]}
      rows={documents ?? []}
      getRowKey={(row, index) => String((row as unknown as Record<string, unknown>)._id ?? index)}
      selectedKey={String((selected as unknown as Record<string, unknown> | undefined)?._id ?? '')}
      onSelect={async (value) => {
        if ((await onChange?.(value)) === false) return
      }} />
  )
}
