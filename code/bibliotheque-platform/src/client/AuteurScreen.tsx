// The composition AuteurScreen: its properties are the props.
// Generated from the model: change the model, not this file.
import { Auteur } from '../common/entities'
import { AuteurList } from './AuteurList'
import { asText, deleteDocument, holds, saveDocument, useDocServices, useDocsByLabel } from './values'
import { Button, Column, FormLayout, Grid, Row, Section, Text, Toolbar } from '@kogitec/core/client'
import { DocFieldControl, SchemaForm, useDocSubscriptionResult } from '@kogitec/schema/client'
import { useEffect, useMemo, useState } from 'react'

export type AuteurScreenProps = {
  selected?: Auteur
  onChange?: (value?: Auteur) => unknown
}

type AuteurScreenScope = {
  selected?: Auteur
  auteurs?: Auteur[]
  auteur?: Auteur
}

// The publications the screen subscribes to, which the server serves.
const auteurPublication = { name: 'AuteurPublication', schema: Auteur, lenient: true }

// The expressions of the model, as it writes them.
const auteursValue = ((scope, docs) => docs) satisfies (scope: AuteurScreenScope, docs: Auteur[]) => unknown
const auteurValue = ((scope, docs) => docs.find((d) => d._id === scope.selected?._id)) satisfies (scope: AuteurScreenScope, docs: Auteur[]) => unknown
const siCoupeeCondition = ((scope) => (scope.auteurs ?? []).length >= 100) satisfies (scope: AuteurScreenScope) => unknown
const siChoisiCondition = ((scope) => !!scope.auteur) satisfies (scope: AuteurScreenScope) => unknown
const siSupprimeCondition = ((scope) => !!scope.selected) satisfies (scope: AuteurScreenScope) => unknown
const siModifiableCondition = ((scope) => !!scope.auteur) satisfies (scope: AuteurScreenScope) => unknown

export const AuteurScreen = ({ selected, onChange }: AuteurScreenProps) => {
  const services = useDocServices()
  useDocSubscriptionResult(auteurPublication)
  const auteurDocs = useDocsByLabel(Auteur)
  const auteurs = useMemo(() => auteursValue({ selected }, auteurDocs), [selected, auteurDocs])
  const auteurComputed = useMemo(() => auteurValue({ selected, auteurs }, auteurDocs), [selected, auteurs, auteurDocs])
  const [auteur, setAuteur] = useState<Auteur | undefined>(auteurComputed)
  useEffect(() => setAuteur(auteurComputed), [auteurComputed])
  const scope: AuteurScreenScope = { selected, auteurs, auteur }
  return (
    <Column gap={0}>
      <Row gap={0}>
        <Column gap={0} grow>
          <Section
            title='bibliotheque:AuteurScreen.racine.children.ecran.children.gauche.children.liste.title'
            style={{ padding: 0 }}>
            <AuteurList
              documents={auteurs}
              selected={auteur}
              onChange={async (value) => {
                if ((await onChange?.(value)) === false) return false
              }} />
            {holds(siCoupeeCondition(scope)) ? (
              <>
                <Text text='bibliotheque:AuteurScreen.racine.children.ecran.children.gauche.children.liste.children.siCoupee.children.coupee.text' />
              </>
            ) : null}
          </Section>
        </Column>
        <Column gap={0}>
          <Section
            title='bibliotheque:AuteurScreen.racine.children.ecran.children.detail.children.fiche.title'
            style={{ padding: 0 }}>
            {holds(siChoisiCondition(scope)) ? (
              <>
                <Grid columns={2}>
                  <Text text='bibliotheque:AuteurScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreNom.text' />
                  <Text text={asText(auteur?.nom)} />
                </Grid>
              </>
            ) : (
              <>
                {holds(siSupprimeCondition(scope)) ? (
                  <>
                    <Text text='bibliotheque:AuteurScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.children.supprime.text' />
                  </>
                ) : (
                  <>
                    <Text text='bibliotheque:AuteurScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.else.aucun.text' />
                  </>
                )}
              </>
            )}
          </Section>
          <Section
            title='bibliotheque:AuteurScreen.racine.children.ecran.children.detail.children.formulaire.title'
            style={{ padding: 0 }}>
            <SchemaForm
              key={String(auteur?._id ?? 'new')}
              schema={Auteur}
              entity={auteur}
              controlComponent={DocFieldControl}
              quiet
              emptyTextIsMissing
              onSubmit={async (value) => {
                {
                  const saved = await saveDocument(Auteur, value, services)
                  if (saved === false) return
                  if (saved) {
                    setAuteur(saved)
                    value = saved
                  }
                }
                if ((await onChange?.(value)) === false) return
              }}>
              <FormLayout columns={1}>
                <DocFieldControl name='nom' />
              </FormLayout>
              <Toolbar>
                <Button
                  text='bibliotheque:AuteurScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.enregistrer.text'
                  type='submit' />
                {holds(siModifiableCondition(scope)) ? (
                  <>
                    <Button
                      text='bibliotheque:AuteurScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.nouveau.text'
                      onClick={async () => {
                        if ((await onChange?.(undefined)) === false) return
                      }} />
                    <Button
                      text='bibliotheque:AuteurScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.supprimer.text'
                      onClick={async () => {
                        {
                          const deleted = await deleteDocument(Auteur, auteur, services)
                          if (deleted === false) return
                          if (deleted) setAuteur(undefined)
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
