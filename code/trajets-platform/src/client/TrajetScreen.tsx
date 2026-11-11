// The composition TrajetScreen: its properties are the props.
// Generated from the model: change the model, not this file.
import { Trajet } from '../common/entities'
import { TrajetList } from './TrajetList'
import { asText, deleteDocument, holds, saveDocument, useDocServices, useDocsByLabel } from './values'
import { Button, Column, FormLayout, Grid, Row, Section, Text, Toolbar } from '@kogitec/core/client'
import { DocFieldControl, SchemaForm, useDocSubscriptionResult } from '@kogitec/schema/client'
import { useEffect, useMemo, useState } from 'react'

export type TrajetScreenProps = {
  selected?: Trajet
  onChange?: (value?: Trajet) => unknown
}

type TrajetScreenScope = {
  selected?: Trajet
  trajets?: Trajet[]
  trajet?: Trajet
}

// The publications the screen subscribes to, which the server serves.
const trajetPublication = { name: 'TrajetPublication', schema: Trajet, lenient: true }

// The expressions of the model, as it writes them.
const trajetsValue = ((scope, docs) => docs) satisfies (scope: TrajetScreenScope, docs: Trajet[]) => unknown
const trajetValue = ((scope, docs) => docs.find((d) => d._id === scope.selected?._id)) satisfies (scope: TrajetScreenScope, docs: Trajet[]) => unknown
const siCoupeeCondition = ((scope) => (scope.trajets ?? []).length >= 100) satisfies (scope: TrajetScreenScope) => unknown
const siChoisiCondition = ((scope) => !!scope.trajet) satisfies (scope: TrajetScreenScope) => unknown
const placesText = ((scope) => { const v: unknown = scope.trajet?.places; return v === undefined || v === null ? '' : typeof v === 'number' ? v.toLocaleString() : typeof v === 'boolean' ? (v ? '✓' : '') : v instanceof Date ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(v) : String(v) }) satisfies (scope: TrajetScreenScope) => unknown
const prixText = ((scope) => { const v: unknown = scope.trajet?.prix; return v === undefined || v === null ? '' : typeof v === 'number' ? v.toLocaleString() : typeof v === 'boolean' ? (v ? '✓' : '') : v instanceof Date ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(v) : String(v) }) satisfies (scope: TrajetScreenScope) => unknown
const dateDepartText = ((scope) => { const v: unknown = scope.trajet?.dateDepart; return v === undefined || v === null ? '' : typeof v === 'number' ? v.toLocaleString() : typeof v === 'boolean' ? (v ? '✓' : '') : v instanceof Date ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(v) : String(v) }) satisfies (scope: TrajetScreenScope) => unknown
const heureDepartText = ((scope) => { const v: unknown = scope.trajet?.heureDepart; return v === undefined || v === null ? '' : typeof v === 'number' ? v.toLocaleString() : typeof v === 'boolean' ? (v ? '✓' : '') : v instanceof Date ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(v) : String(v) }) satisfies (scope: TrajetScreenScope) => unknown
const reserveLeText = ((scope) => { const v: unknown = scope.trajet?.reserveLe; return v === undefined || v === null ? '' : typeof v === 'number' ? v.toLocaleString() : typeof v === 'boolean' ? (v ? '✓' : '') : v instanceof Date ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(v) : String(v) }) satisfies (scope: TrajetScreenScope) => unknown
const optionsText = ((scope) => { const v: unknown = scope.trajet?.options; return v === undefined || v === null ? '' : typeof v === 'number' ? v.toLocaleString() : typeof v === 'boolean' ? (v ? '✓' : '') : v instanceof Date ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(v) : String(v) }) satisfies (scope: TrajetScreenScope) => unknown
const siSupprimeCondition = ((scope) => !!scope.selected) satisfies (scope: TrajetScreenScope) => unknown
const siModifiableCondition = ((scope) => !!scope.trajet) satisfies (scope: TrajetScreenScope) => unknown

export const TrajetScreen = ({ selected, onChange }: TrajetScreenProps) => {
  const services = useDocServices()
  useDocSubscriptionResult(trajetPublication)
  const trajetDocs = useDocsByLabel(Trajet)
  const trajets = useMemo(() => trajetsValue({ selected }, trajetDocs), [selected, trajetDocs])
  const trajetComputed = useMemo(() => trajetValue({ selected, trajets }, trajetDocs), [selected, trajets, trajetDocs])
  const [trajet, setTrajet] = useState<Trajet | undefined>(trajetComputed)
  useEffect(() => setTrajet(trajetComputed), [trajetComputed])
  const scope: TrajetScreenScope = { selected, trajets, trajet }
  return (
    <Column gap={0}>
      <Row gap={0}>
        <Column gap={0} grow>
          <Section
            title='trajets:TrajetScreen.racine.children.ecran.children.gauche.children.liste.title'
            style={{ padding: 0 }}>
            <TrajetList
              documents={trajets}
              selected={trajet}
              onChange={async (value) => {
                if ((await onChange?.(value)) === false) return false
              }} />
            {holds(siCoupeeCondition(scope)) ? (
              <>
                <Text text='trajets:TrajetScreen.racine.children.ecran.children.gauche.children.liste.children.siCoupee.children.coupee.text' />
              </>
            ) : null}
          </Section>
        </Column>
        <Column gap={0}>
          <Section
            title='trajets:TrajetScreen.racine.children.ecran.children.detail.children.fiche.title'
            style={{ padding: 0 }}>
            {holds(siChoisiCondition(scope)) ? (
              <>
                <Grid columns={2}>
                  <Text text='trajets:TrajetScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreConducteur.text' />
                  <Text text={asText(trajet?.conducteur)} />
                  <Text text='trajets:TrajetScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titrePlaces.text' />
                  <Text text={asText(placesText(scope))} />
                  <Text text='trajets:TrajetScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titrePrix.text' />
                  <Text text={asText(prixText(scope))} />
                  <Text text='trajets:TrajetScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreDateDepart.text' />
                  <Text text={asText(dateDepartText(scope))} />
                  <Text text='trajets:TrajetScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreHeureDepart.text' />
                  <Text text={asText(heureDepartText(scope))} />
                  <Text text='trajets:TrajetScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreReserveLe.text' />
                  <Text text={asText(reserveLeText(scope))} />
                  <Text text='trajets:TrajetScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreNotes.text' />
                  <Text text={asText(trajet?.notes)} />
                  <Text text='trajets:TrajetScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreOptions.text' />
                  <Text text={asText(optionsText(scope))} />
                </Grid>
              </>
            ) : (
              <>
                {holds(siSupprimeCondition(scope)) ? (
                  <>
                    <Text text='trajets:TrajetScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.children.supprime.text' />
                  </>
                ) : (
                  <>
                    <Text text='trajets:TrajetScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.else.aucun.text' />
                  </>
                )}
              </>
            )}
          </Section>
          <Section
            title='trajets:TrajetScreen.racine.children.ecran.children.detail.children.formulaire.title'
            style={{ padding: 0 }}>
            <SchemaForm
              key={String(trajet?._id ?? 'new')}
              schema={Trajet}
              entity={trajet}
              controlComponent={DocFieldControl}
              quiet
              emptyTextIsMissing
              onSubmit={async (value) => {
                {
                  const saved = await saveDocument(Trajet, value, services)
                  if (saved === false) return
                  if (saved) {
                    setTrajet(saved)
                    value = saved
                  }
                }
                if ((await onChange?.(value)) === false) return
              }}>
              <FormLayout columns={1}>
                <DocFieldControl name='conducteur' />
                <DocFieldControl name='places' />
                <DocFieldControl name='prix' />
                <DocFieldControl name='dateDepart' />
                <DocFieldControl name='heureDepart' />
                <DocFieldControl name='reserveLe' />
                <DocFieldControl name='notes' />
                <DocFieldControl name='options' />
              </FormLayout>
              <Toolbar>
                <Button
                  text='trajets:TrajetScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.enregistrer.text'
                  type='submit' />
                {holds(siModifiableCondition(scope)) ? (
                  <>
                    <Button
                      text='trajets:TrajetScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.nouveau.text'
                      onClick={async () => {
                        if ((await onChange?.(undefined)) === false) return
                      }} />
                    <Button
                      text='trajets:TrajetScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.supprimer.text'
                      onClick={async () => {
                        {
                          const deleted = await deleteDocument(Trajet, trajet, services)
                          if (deleted === false) return
                          if (deleted) setTrajet(undefined)
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
