// The composition CommandeScreen: its properties are the props.
// Generated from the model: change the model, not this file.
import { Client, Commande } from '../common/entities'
import { CommandeList } from './CommandeList'
import { asText, deleteDocument, holds, saveDocument, useDocServices, useDocsByLabel } from './values'
import { Button, Column, FormLayout, Grid, Row, Section, Text, Toolbar } from '@kogitec/core/client'
import { DocFieldControl, SchemaForm, useDocSubscriptionResult } from '@kogitec/schema/client'
import { useEffect, useMemo, useState } from 'react'

export type CommandeScreenProps = {
  selected?: Commande
  onChange?: (value?: Commande) => unknown
}

type CommandeScreenScope = {
  selected?: Commande
  commandes?: Commande[]
  clients?: Client[]
  commande?: Commande
}

// The publications the screen subscribes to, which the server serves.
const commandePublication = { name: 'CommandePublication', schema: Commande, lenient: true }

// The expressions of the model, as it writes them.
const commandesValue = ((scope, docs) => docs) satisfies (scope: CommandeScreenScope, docs: Commande[]) => unknown
const clientsValue = ((scope, docs) => docs) satisfies (scope: CommandeScreenScope, docs: Client[]) => unknown
const commandeValue = ((scope, docs) => docs.find((d) => d._id === scope.selected?._id)) satisfies (scope: CommandeScreenScope, docs: Commande[]) => unknown
const commandesDocuments = ((scope) => (scope.commandes ?? []).map((d) => ({ ...d, clientLabel: ((d as unknown as { clientId?: string } | undefined)?.clientId ? (scope.clients ?? []).find((x) => x._id === (d as unknown as { clientId?: string } | undefined)?.clientId)?.nom ?? 'Document supprimé' : '') }))) satisfies (scope: CommandeScreenScope) => unknown
const siCoupeeCondition = ((scope) => (scope.commandes ?? []).length >= 100) satisfies (scope: CommandeScreenScope) => unknown
const siChoisiCondition = ((scope) => !!scope.commande) satisfies (scope: CommandeScreenScope) => unknown
const totalText = ((scope) => { const v: unknown = scope.commande?.total; return v === undefined || v === null ? '' : typeof v === 'number' ? v.toLocaleString() : typeof v === 'boolean' ? (v ? '✓' : '') : v instanceof Date ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(v) : String(v) }) satisfies (scope: CommandeScreenScope) => unknown
const dateText = ((scope) => { const v: unknown = scope.commande?.date; return v === undefined || v === null ? '' : typeof v === 'number' ? v.toLocaleString() : typeof v === 'boolean' ? (v ? '✓' : '') : v instanceof Date ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(v) : String(v) }) satisfies (scope: CommandeScreenScope) => unknown
const clientText = ((scope) => ((scope.commande as unknown as { clientId?: string } | undefined)?.clientId ? (scope.clients ?? []).find((x) => x._id === (scope.commande as unknown as { clientId?: string } | undefined)?.clientId)?.nom ?? 'Document supprimé' : '')) satisfies (scope: CommandeScreenScope) => unknown
const siSupprimeCondition = ((scope) => !!scope.selected) satisfies (scope: CommandeScreenScope) => unknown
const siModifiableCondition = ((scope) => !!scope.commande) satisfies (scope: CommandeScreenScope) => unknown

export const CommandeScreen = ({ selected, onChange }: CommandeScreenProps) => {
  const services = useDocServices()
  useDocSubscriptionResult(commandePublication)
  const commandeDocs = useDocsByLabel(Commande)
  const clientDocs = useDocsByLabel(Client)
  const commandes = useMemo(() => commandesValue({ selected }, commandeDocs), [selected, commandeDocs])
  const clients = useMemo(() => clientsValue({ selected, commandes }, clientDocs), [selected, commandes, clientDocs])
  const commandeComputed = useMemo(() => commandeValue({ selected, commandes, clients }, commandeDocs), [selected, commandes, clients, commandeDocs])
  const [commande, setCommande] = useState<Commande | undefined>(commandeComputed)
  useEffect(() => setCommande(commandeComputed), [commandeComputed])
  const scope: CommandeScreenScope = { selected, commandes, clients, commande }
  return (
    <Column gap={0}>
      <Row gap={0}>
        <Column gap={0} grow>
          <Section
            title='boutique:CommandeScreen.racine.children.ecran.children.gauche.children.liste.title'
            style={{ padding: 0 }}>
            <CommandeList
              documents={commandesDocuments(scope)}
              selected={commande}
              onChange={async (value) => {
                if ((await onChange?.(value)) === false) return false
              }} />
            {holds(siCoupeeCondition(scope)) ? (
              <>
                <Text text='boutique:CommandeScreen.racine.children.ecran.children.gauche.children.liste.children.siCoupee.children.coupee.text' />
              </>
            ) : null}
          </Section>
        </Column>
        <Column gap={0}>
          <Section
            title='boutique:CommandeScreen.racine.children.ecran.children.detail.children.fiche.title'
            style={{ padding: 0 }}>
            {holds(siChoisiCondition(scope)) ? (
              <>
                <Grid columns={2}>
                  <Text text='boutique:CommandeScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreTotal.text' />
                  <Text text={asText(totalText(scope))} />
                  <Text text='boutique:CommandeScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreDate.text' />
                  <Text text={asText(dateText(scope))} />
                  <Text text='boutique:CommandeScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreNumero.text' />
                  <Text text={asText(commande?.numero)} />
                  <Text text='boutique:CommandeScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreClient.text' />
                  <Text text={asText(clientText(scope))} />
                </Grid>
              </>
            ) : (
              <>
                {holds(siSupprimeCondition(scope)) ? (
                  <>
                    <Text text='boutique:CommandeScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.children.supprime.text' />
                  </>
                ) : (
                  <>
                    <Text text='boutique:CommandeScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.else.aucun.text' />
                  </>
                )}
              </>
            )}
          </Section>
          <Section
            title='boutique:CommandeScreen.racine.children.ecran.children.detail.children.formulaire.title'
            style={{ padding: 0 }}>
            <SchemaForm
              key={String(commande?._id ?? 'new')}
              schema={Commande}
              entity={commande}
              controlComponent={DocFieldControl}
              quiet
              emptyTextIsMissing
              onSubmit={async (value) => {
                {
                  const saved = await saveDocument(Commande, value, services)
                  if (saved === false) return
                  if (saved) {
                    setCommande(saved)
                    value = saved
                  }
                }
                if ((await onChange?.(value)) === false) return
              }}>
              <FormLayout columns={1}>
                <DocFieldControl name='total' />
                <DocFieldControl name='date' />
                <DocFieldControl name='numero' />
                <DocFieldControl name='clientId' />
                <DocFieldControl name='lignesIds' />
              </FormLayout>
              <Toolbar>
                <Button
                  text='boutique:CommandeScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.enregistrer.text'
                  type='submit' />
                {holds(siModifiableCondition(scope)) ? (
                  <>
                    <Button
                      text='boutique:CommandeScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.nouveau.text'
                      onClick={async () => {
                        if ((await onChange?.(undefined)) === false) return
                      }} />
                    <Button
                      text='boutique:CommandeScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.supprimer.text'
                      onClick={async () => {
                        {
                          const deleted = await deleteDocument(Commande, commande, services)
                          if (deleted === false) return
                          if (deleted) setCommande(undefined)
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
