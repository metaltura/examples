// The composition LecteurScreen: its properties are the props.
// Generated from the model: change the model, not this file.
import { Lecteur } from '../common/entities'
import { LecteurList } from './LecteurList'
import { asText, deleteDocument, holds, saveDocument, useDocServices, useDocsByLabel } from './values'
import { Button, Column, FormLayout, Grid, Row, Section, Text, Toolbar } from '@kogitec/core/client'
import { DocFieldControl, SchemaForm, useDocSubscriptionResult } from '@kogitec/schema/client'
import { useEffect, useMemo, useState } from 'react'

export type LecteurScreenProps = {
  selected?: Lecteur
  onChange?: (value?: Lecteur) => unknown
}

type LecteurScreenScope = {
  selected?: Lecteur
  lecteurs?: Lecteur[]
  lecteur?: Lecteur
}

// The publications the screen subscribes to, which the server serves.
const lecteurPublication = { name: 'LecteurPublication', schema: Lecteur, lenient: true }

// The expressions of the model, as it writes them.
const lecteursValue = ((scope, docs) => docs) satisfies (scope: LecteurScreenScope, docs: Lecteur[]) => unknown
const lecteurValue = ((scope, docs) => docs.find((d) => d._id === scope.selected?._id)) satisfies (scope: LecteurScreenScope, docs: Lecteur[]) => unknown
const siCoupeeCondition = ((scope) => (scope.lecteurs ?? []).length >= 100) satisfies (scope: LecteurScreenScope) => unknown
const siChoisiCondition = ((scope) => !!scope.lecteur) satisfies (scope: LecteurScreenScope) => unknown
const siSupprimeCondition = ((scope) => !!scope.selected) satisfies (scope: LecteurScreenScope) => unknown
const siModifiableCondition = ((scope) => !!scope.lecteur) satisfies (scope: LecteurScreenScope) => unknown

export const LecteurScreen = ({ selected, onChange }: LecteurScreenProps) => {
  const services = useDocServices()
  useDocSubscriptionResult(lecteurPublication)
  const lecteurDocs = useDocsByLabel(Lecteur)
  const lecteurs = useMemo(() => lecteursValue({ selected }, lecteurDocs), [selected, lecteurDocs])
  const lecteurComputed = useMemo(() => lecteurValue({ selected, lecteurs }, lecteurDocs), [selected, lecteurs, lecteurDocs])
  const [lecteur, setLecteur] = useState<Lecteur | undefined>(lecteurComputed)
  useEffect(() => setLecteur(lecteurComputed), [lecteurComputed])
  const scope: LecteurScreenScope = { selected, lecteurs, lecteur }
  return (
    <Column gap={0}>
      <Row gap={0}>
        <Column gap={0} grow>
          <Section
            title='bibliotheque:LecteurScreen.racine.children.ecran.children.gauche.children.liste.title'
            style={{ padding: 0 }}>
            <LecteurList
              documents={lecteurs}
              selected={lecteur}
              onChange={async (value) => {
                if ((await onChange?.(value)) === false) return false
              }} />
            {holds(siCoupeeCondition(scope)) ? (
              <>
                <Text text='bibliotheque:LecteurScreen.racine.children.ecran.children.gauche.children.liste.children.siCoupee.children.coupee.text' />
              </>
            ) : null}
          </Section>
        </Column>
        <Column gap={0}>
          <Section
            title='bibliotheque:LecteurScreen.racine.children.ecran.children.detail.children.fiche.title'
            style={{ padding: 0 }}>
            {holds(siChoisiCondition(scope)) ? (
              <>
                <Grid columns={2}>
                  <Text text='bibliotheque:LecteurScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreNom.text' />
                  <Text text={asText(lecteur?.nom)} />
                  <Text text='bibliotheque:LecteurScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreCourriel.text' />
                  <Text text={asText(lecteur?.courriel)} />
                </Grid>
              </>
            ) : (
              <>
                {holds(siSupprimeCondition(scope)) ? (
                  <>
                    <Text text='bibliotheque:LecteurScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.children.supprime.text' />
                  </>
                ) : (
                  <>
                    <Text text='bibliotheque:LecteurScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.else.aucun.text' />
                  </>
                )}
              </>
            )}
          </Section>
          <Section
            title='bibliotheque:LecteurScreen.racine.children.ecran.children.detail.children.formulaire.title'
            style={{ padding: 0 }}>
            <SchemaForm
              key={String(lecteur?._id ?? 'new')}
              schema={Lecteur}
              entity={lecteur}
              controlComponent={DocFieldControl}
              quiet
              emptyTextIsMissing
              onSubmit={async (value) => {
                {
                  const saved = await saveDocument(Lecteur, value, services)
                  if (saved === false) return
                  if (saved) {
                    setLecteur(saved)
                    value = saved
                  }
                }
                if ((await onChange?.(value)) === false) return
              }}>
              <FormLayout columns={1}>
                <DocFieldControl name='nom' />
                <DocFieldControl name='courriel' />
              </FormLayout>
              <Toolbar>
                <Button
                  text='bibliotheque:LecteurScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.enregistrer.text'
                  type='submit' />
                {holds(siModifiableCondition(scope)) ? (
                  <>
                    <Button
                      text='bibliotheque:LecteurScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.nouveau.text'
                      onClick={async () => {
                        if ((await onChange?.(undefined)) === false) return
                      }} />
                    <Button
                      text='bibliotheque:LecteurScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.supprimer.text'
                      onClick={async () => {
                        {
                          const deleted = await deleteDocument(Lecteur, lecteur, services)
                          if (deleted === false) return
                          if (deleted) setLecteur(undefined)
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
