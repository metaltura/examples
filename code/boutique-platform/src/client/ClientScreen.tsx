// The composition ClientScreen: its properties are the props.
// Generated from the model: change the model, not this file.
import { Client } from '../common/entities'
import { ClientList } from './ClientList'
import { asText, deleteDocument, holds, saveDocument, useDocServices, useDocsByLabel } from './values'
import { Button, Column, FormLayout, Grid, Row, Section, Text, Toolbar } from '@kogitec/core/client'
import { DocFieldControl, SchemaForm, useDocSubscriptionResult } from '@kogitec/schema/client'
import { useEffect, useMemo, useState } from 'react'

export type ClientScreenProps = {
  selected?: Client
  onChange?: (value?: Client) => unknown
}

type ClientScreenScope = {
  selected?: Client
  clients?: Client[]
  client?: Client
}

// The publications the screen subscribes to, which the server serves.
const clientPublication = { name: 'ClientPublication', schema: Client, lenient: true }

// The expressions of the model, as it writes them.
const clientsValue = ((scope, docs) => docs) satisfies (scope: ClientScreenScope, docs: Client[]) => unknown
const clientValue = ((scope, docs) => docs.find((d) => d._id === scope.selected?._id)) satisfies (scope: ClientScreenScope, docs: Client[]) => unknown
const siCoupeeCondition = ((scope) => (scope.clients ?? []).length >= 100) satisfies (scope: ClientScreenScope) => unknown
const siChoisiCondition = ((scope) => !!scope.client) satisfies (scope: ClientScreenScope) => unknown
const siSupprimeCondition = ((scope) => !!scope.selected) satisfies (scope: ClientScreenScope) => unknown
const siModifiableCondition = ((scope) => !!scope.client) satisfies (scope: ClientScreenScope) => unknown

export const ClientScreen = ({ selected, onChange }: ClientScreenProps) => {
  const services = useDocServices()
  useDocSubscriptionResult(clientPublication)
  const clientDocs = useDocsByLabel(Client)
  const clients = useMemo(() => clientsValue({ selected }, clientDocs), [selected, clientDocs])
  const clientComputed = useMemo(() => clientValue({ selected, clients }, clientDocs), [selected, clients, clientDocs])
  const [client, setClient] = useState<Client | undefined>(clientComputed)
  useEffect(() => setClient(clientComputed), [clientComputed])
  const scope: ClientScreenScope = { selected, clients, client }
  return (
    <Column gap={0}>
      <Row gap={0}>
        <Column gap={0} grow>
          <Section
            title='boutique:ClientScreen.racine.children.ecran.children.gauche.children.liste.title'
            style={{ padding: 0 }}>
            <ClientList
              documents={clients}
              selected={client}
              onChange={async (value) => {
                if ((await onChange?.(value)) === false) return false
              }} />
            {holds(siCoupeeCondition(scope)) ? (
              <>
                <Text text='boutique:ClientScreen.racine.children.ecran.children.gauche.children.liste.children.siCoupee.children.coupee.text' />
              </>
            ) : null}
          </Section>
        </Column>
        <Column gap={0}>
          <Section
            title='boutique:ClientScreen.racine.children.ecran.children.detail.children.fiche.title'
            style={{ padding: 0 }}>
            {holds(siChoisiCondition(scope)) ? (
              <>
                <Grid columns={2}>
                  <Text text='boutique:ClientScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreNom.text' />
                  <Text text={asText(client?.nom)} />
                </Grid>
              </>
            ) : (
              <>
                {holds(siSupprimeCondition(scope)) ? (
                  <>
                    <Text text='boutique:ClientScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.children.supprime.text' />
                  </>
                ) : (
                  <>
                    <Text text='boutique:ClientScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.else.aucun.text' />
                  </>
                )}
              </>
            )}
          </Section>
          <Section
            title='boutique:ClientScreen.racine.children.ecran.children.detail.children.formulaire.title'
            style={{ padding: 0 }}>
            <SchemaForm
              key={String(client?._id ?? 'new')}
              schema={Client}
              entity={client}
              controlComponent={DocFieldControl}
              quiet
              emptyTextIsMissing
              onSubmit={async (value) => {
                {
                  const saved = await saveDocument(Client, value, services)
                  if (saved === false) return
                  if (saved) {
                    setClient(saved)
                    value = saved
                  }
                }
                if ((await onChange?.(value)) === false) return
              }}>
              <FormLayout columns={1}>
                <DocFieldControl name='nom' />
                <DocFieldControl name='courriels' />
              </FormLayout>
              <Toolbar>
                <Button
                  text='boutique:ClientScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.enregistrer.text'
                  type='submit' />
                {holds(siModifiableCondition(scope)) ? (
                  <>
                    <Button
                      text='boutique:ClientScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.nouveau.text'
                      onClick={async () => {
                        if ((await onChange?.(undefined)) === false) return
                      }} />
                    <Button
                      text='boutique:ClientScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.supprimer.text'
                      onClick={async () => {
                        {
                          const deleted = await deleteDocument(Client, client, services)
                          if (deleted === false) return
                          if (deleted) setClient(undefined)
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
