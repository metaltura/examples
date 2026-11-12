// The composition AuteurList: its properties are the props.
// Generated from the model: change the model, not this file.
import { Auteur } from '../common/entities'
import { formatCell } from './values'
import { Table, useLang } from '@kogitec/core/client'

export type AuteurListProps = {
  documents?: Auteur[]
  selected?: Auteur
  onChange?: (value?: Auteur) => unknown
}

export const AuteurList = ({ documents, selected, onChange }: AuteurListProps) => {
  const language = useLang()
  return (
    <Table
      columns={[
        { name: 'nom', title: 'bibliotheque:AuteurList.table.columns.nom.title', render: (row) => formatCell((row as unknown as Record<string, unknown>).nom, language) }
      ]}
      rows={documents ?? []}
      getRowKey={(row, index) => String((row as unknown as Record<string, unknown>)._id ?? index)}
      selectedKey={String((selected as unknown as Record<string, unknown> | undefined)?._id ?? '')}
      onSelect={async (value) => {
        if ((await onChange?.(value)) === false) return
      }} />
  )
}
