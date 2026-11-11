// What the components share to show the values of the model as the platform does.
// Generated from the model: change the model, not this file.
import { CoreIcon, useDialog, useLang, useToast } from '@kogitec/core/client'
import { WebModelUtil } from '@kogitec/core/common'
import { confirmDocDelete, useDocContext, useDocs } from '@kogitec/schema/client'
import { ErrorUtil, type FieldShape, type Infer, type Schema, SchemaUtil } from '@kogitec/schema/common'
import { type ReactNode, useMemo } from 'react'

type Language = ReturnType<typeof useLang>

const LOCALES: Record<Language, string> = { fr: 'fr-CA', en: 'en-US' }

/** Whether a condition holds: true, or a value that is not a yes/no and is not empty. */
export const holds = (value: unknown): boolean =>
  typeof value === 'boolean' ? value : !WebModelUtil.isEmptyValue(value)

/** A value as a translated text: the same text in both languages, nothing for an absent value. */
export const asText = (value: unknown): { fr: string; en: string } => {
  const text = value === undefined || value === null ? '' : String(value)
  return { fr: text, en: text }
}

/** A member of a list as a text, or nothing for what is not a value. */
const memberText = (value: unknown, language: Language): string | null => {
  if (value === null || value === undefined) return null
  if (typeof value === 'string') return value
  if (typeof value === 'number') return value.toLocaleString(LOCALES[language])
  if (typeof value === 'boolean') return String(value)
  if (value instanceof Date) return new Intl.DateTimeFormat(LOCALES[language], { dateStyle: 'medium' }).format(value)
  return null
}

/**
 * The cell of a value, by what the value is: a text as it is, a number and a
 * date in the language of the screen, a check for true, the members of a list
 * joined by commas; nothing for an absent value or an object.
 */
export const formatCell = (value: unknown, language: Language): ReactNode => {
  if (typeof value === 'boolean') return value ? <CoreIcon icon='mui:CheckCircle' /> : null
  if (Array.isArray(value))
    return (
      value
        .map((member) => memberText(member, language))
        .filter((text): text is string => text !== null)
        .join(', ') || null
    )
  return memberText(value, language)
}

/** The documents the browser keeps of an entity, sorted by label in French order, then by key. */
export const useDocsByLabel = <Shape extends FieldShape>(schema: Schema<Shape>): Infer<Schema<Shape>>[] => {
  const docs = useDocs(schema)
  return useMemo(
    () =>
      [...docs].sort(
        (a, b) =>
          SchemaUtil.labelOf(schema, a).localeCompare(SchemaUtil.labelOf(schema, b), 'fr', { sensitivity: 'base' }) ||
          String((a as { _id?: unknown })._id).localeCompare(String((b as { _id?: unknown })._id))
      ),
    [docs, schema]
  )
}

/** What saving and deleting a document need: the documents, the messages, the confirmation. */
export type DocServices = {
  docs: ReturnType<typeof useDocContext>['data']['actions']
  showToast: ReturnType<typeof useToast>['showToast']
  openDialog: ReturnType<typeof useDialog>['openDialog']
}

export const useDocServices = (): DocServices => {
  const { data } = useDocContext()
  const { showToast } = useToast()
  const { openDialog } = useDialog()
  return { docs: data.actions, showToast, openDialog }
}

/**
 * « Enregistrer » (SaveDocument): created without a key, changed with one,
 * « Enregistré avec succès » either way. The document saved, the one the
 * server gives back; `false` when the server refuses, its reason shown;
 * nothing for no document.
 */
export const saveDocument = async <Shape extends FieldShape>(
  schema: Schema<Shape>,
  doc: Infer<Schema<Shape>> | undefined,
  { docs, showToast }: DocServices
): Promise<Infer<Schema<Shape>> | false | undefined> => {
  if (!doc) return undefined
  let saved: Infer<Schema<Shape>> | undefined
  try {
    saved = (doc as { _id?: unknown })._id ? await docs.update(schema, doc) : await docs.insert(schema, doc)
  } catch (error) {
    showToast(ErrorUtil.saveFailure(error), 'error')
    return false
  }
  showToast('core:forms.savedSuccessfully', 'success')
  return saved ?? doc
}

/**
 * « Supprimer » (DeleteDocument): « Supprimer ce document ? » first, then
 * « Document supprimé ». True once deleted; `false` when cancelled or
 * refused, its reason shown; nothing for no document or one without a key.
 */
export const deleteDocument = async <Shape extends FieldShape>(
  schema: Schema<Shape>,
  doc: Infer<Schema<Shape>> | undefined,
  { docs, showToast, openDialog }: DocServices
): Promise<boolean | undefined> => {
  const id = (doc as { _id?: unknown } | undefined)?._id
  if (!doc || id === undefined || id === null) return undefined
  if (!(await confirmDocDelete(openDialog, SchemaUtil.labelOf(schema, doc)))) return false
  try {
    await docs.delete(schema, String(id))
  } catch (error) {
    showToast(ErrorUtil.saveFailure(error), 'error')
    return false
  }
  showToast('schema:data.deleted', 'success')
  return true
}
