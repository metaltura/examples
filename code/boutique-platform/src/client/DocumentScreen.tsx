// The composition DocumentScreen: its properties are the props.
// Generated from the model: change the model, not this file.
import { Document } from '../common/entities'
import { DocumentList } from './DocumentList'
import { asText, deleteDocument, holds, saveDocument, useDocServices, useDocsByLabel } from './values'
import { Button, Column, FormLayout, Grid, Row, Section, Text, Toolbar } from '@kogitec/core/client'
import { DocFieldControl, SchemaForm, useDocSubscriptionResult } from '@kogitec/schema/client'
import { useEffect, useMemo, useState } from 'react'

export type DocumentScreenProps = {
  selected?: Document
  onChange?: (value?: Document) => unknown
}

type DocumentScreenScope = {
  selected?: Document
  documents?: Document[]
  document?: Document
}

// The publications the screen subscribes to, which the server serves.
const documentPublication = { name: 'DocumentPublication', schema: Document, lenient: true }

// The expressions of the model, as it writes them.
const documentsValue = ((scope, docs) => docs) satisfies (scope: DocumentScreenScope, docs: Document[]) => unknown
const documentValue = ((scope, docs) => docs.find((d) => d._id === scope.selected?._id)) satisfies (scope: DocumentScreenScope, docs: Document[]) => unknown
const siCoupeeCondition = ((scope) => (scope.documents ?? []).length >= 100) satisfies (scope: DocumentScreenScope) => unknown
const siChoisiCondition = ((scope) => !!scope.document) satisfies (scope: DocumentScreenScope) => unknown
const siSupprimeCondition = ((scope) => !!scope.selected) satisfies (scope: DocumentScreenScope) => unknown
const siModifiableCondition = ((scope) => !!scope.document) satisfies (scope: DocumentScreenScope) => unknown

export const DocumentScreen = ({ selected, onChange }: DocumentScreenProps) => {
  const services = useDocServices()
  useDocSubscriptionResult(documentPublication)
  const documentDocs = useDocsByLabel(Document)
  const documents = useMemo(() => documentsValue({ selected }, documentDocs), [selected, documentDocs])
  const documentComputed = useMemo(() => documentValue({ selected, documents }, documentDocs), [selected, documents, documentDocs])
  const [document, setDocument] = useState<Document | undefined>(documentComputed)
  useEffect(() => setDocument(documentComputed), [documentComputed])
  const scope: DocumentScreenScope = { selected, documents, document }
  return (
    <Column gap={0}>
      <Row gap={0}>
        <Column gap={0} grow>
          <Section
            title='boutique:DocumentScreen.racine.children.ecran.children.gauche.children.liste.title'
            style={{ padding: 0 }}>
            <DocumentList
              documents={documents}
              selected={document}
              onChange={async (value) => {
                if ((await onChange?.(value)) === false) return false
              }} />
            {holds(siCoupeeCondition(scope)) ? (
              <>
                <Text text='boutique:DocumentScreen.racine.children.ecran.children.gauche.children.liste.children.siCoupee.children.coupee.text' />
              </>
            ) : null}
          </Section>
        </Column>
        <Column gap={0}>
          <Section
            title='boutique:DocumentScreen.racine.children.ecran.children.detail.children.fiche.title'
            style={{ padding: 0 }}>
            {holds(siChoisiCondition(scope)) ? (
              <>
                <Grid columns={2}>
                  <Text text='boutique:DocumentScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreNumero.text' />
                  <Text text={asText(document?.numero)} />
                </Grid>
              </>
            ) : (
              <>
                {holds(siSupprimeCondition(scope)) ? (
                  <>
                    <Text text='boutique:DocumentScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.children.supprime.text' />
                  </>
                ) : (
                  <>
                    <Text text='boutique:DocumentScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.else.aucun.text' />
                  </>
                )}
              </>
            )}
          </Section>
          <Section
            title='boutique:DocumentScreen.racine.children.ecran.children.detail.children.formulaire.title'
            style={{ padding: 0 }}>
            <SchemaForm
              key={String(document?._id ?? 'new')}
              schema={Document}
              entity={document}
              controlComponent={DocFieldControl}
              quiet
              emptyTextIsMissing
              onSubmit={async (value) => {
                {
                  const saved = await saveDocument(Document, value, services)
                  if (saved === false) return
                  if (saved) {
                    setDocument(saved)
                    value = saved
                  }
                }
                if ((await onChange?.(value)) === false) return
              }}>
              <FormLayout columns={1}>
                <DocFieldControl name='numero' />
              </FormLayout>
              <Toolbar>
                <Button
                  text='boutique:DocumentScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.enregistrer.text'
                  type='submit' />
                {holds(siModifiableCondition(scope)) ? (
                  <>
                    <Button
                      text='boutique:DocumentScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.nouveau.text'
                      onClick={async () => {
                        if ((await onChange?.(undefined)) === false) return
                      }} />
                    <Button
                      text='boutique:DocumentScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.supprimer.text'
                      onClick={async () => {
                        {
                          const deleted = await deleteDocument(Document, document, services)
                          if (deleted === false) return
                          if (deleted) setDocument(undefined)
                        }
                        if ((await onChange?.(undefined)) === false) return
                      }} />
                  </>
                ) : null}
              </Toolbar>
            </SchemaForm>
          </Section>
        </Column>
      </Row>
    </Column>
  )
}
