// The composition LigneDeCommandeScreen: its properties are the props.
// Generated from the model: change the model, not this file.
import { LigneDeCommande } from '../common/entities'
import { LigneDeCommandeList } from './LigneDeCommandeList'
import { asText, deleteDocument, holds, saveDocument, useDocServices, useDocsByLabel } from './values'
import { Button, Column, FormLayout, Grid, Row, Section, Text, Toolbar } from '@kogitec/core/client'
import { DocFieldControl, SchemaForm, useDocSubscriptionResult } from '@kogitec/schema/client'
import { useEffect, useMemo, useState } from 'react'

export type LigneDeCommandeScreenProps = {
  selected?: LigneDeCommande
  onChange?: (value?: LigneDeCommande) => unknown
}

type LigneDeCommandeScreenScope = {
  selected?: LigneDeCommande
  ligneDeCommandes?: LigneDeCommande[]
  ligneDeCommande?: LigneDeCommande
}

// The publications the screen subscribes to, which the server serves.
const ligneDeCommandePublication = { name: 'LigneDeCommandePublication', schema: LigneDeCommande, lenient: true }

// The expressions of the model, as it writes them.
const ligneDeCommandesValue = ((scope, docs) => docs) satisfies (scope: LigneDeCommandeScreenScope, docs: LigneDeCommande[]) => unknown
const ligneDeCommandeValue = ((scope, docs) => docs.find((d) => d._id === scope.selected?._id)) satisfies (scope: LigneDeCommandeScreenScope, docs: LigneDeCommande[]) => unknown
const siCoupeeCondition = ((scope) => (scope.ligneDeCommandes ?? []).length >= 100) satisfies (scope: LigneDeCommandeScreenScope) => unknown
const siChoisiCondition = ((scope) => !!scope.ligneDeCommande) satisfies (scope: LigneDeCommandeScreenScope) => unknown
const quantiteText = ((scope) => { const member = (m: unknown): string => typeof m === 'string' ? m : typeof m === 'number' ? m.toLocaleString() : typeof m === 'boolean' ? String(m) : m instanceof Date ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(m) : ''; const v: unknown = scope.ligneDeCommande?.quantite; return typeof v === 'boolean' ? (v ? '✓' : '') : Array.isArray(v) ? v.map(member).filter((t) => t !== '').join(', ') : member(v) }) satisfies (scope: LigneDeCommandeScreenScope) => unknown
const siSupprimeCondition = ((scope) => !!scope.selected) satisfies (scope: LigneDeCommandeScreenScope) => unknown
const siModifiableCondition = ((scope) => !!scope.ligneDeCommande) satisfies (scope: LigneDeCommandeScreenScope) => unknown

export const LigneDeCommandeScreen = ({ selected, onChange }: LigneDeCommandeScreenProps) => {
  const services = useDocServices()
  useDocSubscriptionResult(ligneDeCommandePublication)
  const ligneDeCommandeDocs = useDocsByLabel(LigneDeCommande)
  const ligneDeCommandes = useMemo(() => ligneDeCommandesValue({ selected }, ligneDeCommandeDocs), [selected, ligneDeCommandeDocs])
  const ligneDeCommandeComputed = useMemo(() => ligneDeCommandeValue({ selected, ligneDeCommandes }, ligneDeCommandeDocs), [selected, ligneDeCommandes, ligneDeCommandeDocs])
  const [ligneDeCommande, setLigneDeCommande] = useState<LigneDeCommande | undefined>(ligneDeCommandeComputed)
  useEffect(() => setLigneDeCommande(ligneDeCommandeComputed), [ligneDeCommandeComputed])
  const scope: LigneDeCommandeScreenScope = { selected, ligneDeCommandes, ligneDeCommande }
  return (
    <Column gap={0}>
      <Row gap={0}>
        <Column gap={0} grow>
          <Section
            title='boutique:LigneDeCommandeScreen.racine.children.ecran.children.gauche.children.liste.title'
            style={{ padding: 0 }}>
            <LigneDeCommandeList
              documents={ligneDeCommandes}
              selected={ligneDeCommande}
              onChange={async (value) => {
                if ((await onChange?.(value)) === false) return false
              }} />
            {holds(siCoupeeCondition(scope)) ? (
              <>
                <Text text='boutique:LigneDeCommandeScreen.racine.children.ecran.children.gauche.children.liste.children.siCoupee.children.coupee.text' />
              </>
            ) : null}
          </Section>
        </Column>
        <Column gap={0}>
          <Section
            title='boutique:LigneDeCommandeScreen.racine.children.ecran.children.detail.children.fiche.title'
            style={{ padding: 0 }}>
            {holds(siChoisiCondition(scope)) ? (
              <>
                <Grid columns={2}>
                  <Text text='boutique:LigneDeCommandeScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreQuantite.text' />
                  <Text text={asText(quantiteText(scope))} />
                </Grid>
              </>
            ) : (
              <>
                {holds(siSupprimeCondition(scope)) ? (
                  <>
                    <Text text='boutique:LigneDeCommandeScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.children.supprime.text' />
                  </>
                ) : (
                  <>
                    <Text text='boutique:LigneDeCommandeScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.else.aucun.text' />
                  </>
                )}
              </>
            )}
          </Section>
          <Section
            title='boutique:LigneDeCommandeScreen.racine.children.ecran.children.detail.children.formulaire.title'
            style={{ padding: 0 }}>
            <SchemaForm
              key={String(ligneDeCommande?._id ?? 'new')}
              schema={LigneDeCommande}
              entity={ligneDeCommande}
              controlComponent={DocFieldControl}
              quiet
              emptyTextIsMissing
              onSubmit={async (value) => {
                {
                  const saved = await saveDocument(LigneDeCommande, value, services)
                  if (saved === false) return
                  if (saved) {
                    setLigneDeCommande(saved)
                    value = saved
                  }
                }
                if ((await onChange?.(value)) === false) return
              }}>
              <FormLayout columns={1}>
                <DocFieldControl name='quantite' />
              </FormLayout>
              <Toolbar>
                <Button
                  text='boutique:LigneDeCommandeScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.enregistrer.text'
                  type='submit' />
                {holds(siModifiableCondition(scope)) ? (
                  <>
                    <Button
                      text='boutique:LigneDeCommandeScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.nouveau.text'
                      onClick={async () => {
                        if ((await onChange?.(undefined)) === false) return
                      }} />
                    <Button
                      text='boutique:LigneDeCommandeScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.supprimer.text'
                      onClick={async () => {
                        {
                          const deleted = await deleteDocument(LigneDeCommande, ligneDeCommande, services)
                          if (deleted === false) return
                          if (deleted) setLigneDeCommande(undefined)
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
