// The composition LivreScreen: its properties are the props.
// Generated from the model: change the model, not this file.
import { Auteur, Livre } from '../common/entities'
import { LivreList } from './LivreList'
import { asText, deleteDocument, holds, saveDocument, useDocServices, useDocsByLabel } from './values'
import { Button, Column, FormLayout, Grid, Row, Section, Text, Toolbar } from '@kogitec/core/client'
import { DocFieldControl, SchemaForm, useDocSubscriptionResult } from '@kogitec/schema/client'
import { useEffect, useMemo, useState } from 'react'

export type LivreScreenProps = {
  selected?: Livre
  onChange?: (value?: Livre) => unknown
}

type LivreScreenScope = {
  selected?: Livre
  livres?: Livre[]
  auteurs?: Auteur[]
  livre?: Livre
}

// The publications the screen subscribes to, which the server serves.
const livrePublication = { name: 'LivrePublication', schema: Livre, lenient: true }

// The expressions of the model, as it writes them.
const livresValue = ((scope, docs) => docs) satisfies (scope: LivreScreenScope, docs: Livre[]) => unknown
const auteursValue = ((scope, docs) => docs) satisfies (scope: LivreScreenScope, docs: Auteur[]) => unknown
const livreValue = ((scope, docs) => docs.find((d) => d._id === scope.selected?._id)) satisfies (scope: LivreScreenScope, docs: Livre[]) => unknown
const livresDocuments = ((scope) => (scope.livres ?? []).map((d) => ({ ...d, auteurLabel: ((d as unknown as { auteurId?: string } | undefined)?.auteurId ? ((linked) => (linked ? linked.nom ?? '' : 'Document supprimé'))((scope.auteurs ?? []).find((x) => x._id === (d as unknown as { auteurId?: string } | undefined)?.auteurId)) : '') }))) satisfies (scope: LivreScreenScope) => unknown
const siCoupeeCondition = ((scope) => (scope.livres ?? []).length >= 100) satisfies (scope: LivreScreenScope) => unknown
const siChoisiCondition = ((scope) => !!scope.livre) satisfies (scope: LivreScreenScope) => unknown
const auteurText = ((scope) => ((scope.livre as unknown as { auteurId?: string } | undefined)?.auteurId ? ((linked) => (linked ? linked.nom ?? '' : 'Document supprimé'))((scope.auteurs ?? []).find((x) => x._id === (scope.livre as unknown as { auteurId?: string } | undefined)?.auteurId)) : '')) satisfies (scope: LivreScreenScope) => unknown
const siSupprimeCondition = ((scope) => !!scope.selected) satisfies (scope: LivreScreenScope) => unknown
const siModifiableCondition = ((scope) => !!scope.livre) satisfies (scope: LivreScreenScope) => unknown

export const LivreScreen = ({ selected, onChange }: LivreScreenProps) => {
  const services = useDocServices()
  useDocSubscriptionResult(livrePublication)
  const livreDocs = useDocsByLabel(Livre)
  const auteurDocs = useDocsByLabel(Auteur)
  const livres = useMemo(() => livresValue({ selected }, livreDocs), [selected, livreDocs])
  const auteurs = useMemo(() => auteursValue({ selected, livres }, auteurDocs), [selected, livres, auteurDocs])
  const livreComputed = useMemo(() => livreValue({ selected, livres, auteurs }, livreDocs), [selected, livres, auteurs, livreDocs])
  const [livre, setLivre] = useState<Livre | undefined>(livreComputed)
  useEffect(() => setLivre(livreComputed), [livreComputed])
  const scope: LivreScreenScope = { selected, livres, auteurs, livre }
  return (
    <Column gap={0}>
      <Row gap={0}>
        <Column gap={0} grow>
          <Section
            title='bibliotheque:LivreScreen.racine.children.ecran.children.gauche.children.liste.title'
            style={{ padding: 0 }}>
            <LivreList
              documents={livresDocuments(scope)}
              selected={livre}
              onChange={async (value) => {
                if ((await onChange?.(value)) === false) return false
              }} />
            {holds(siCoupeeCondition(scope)) ? (
              <>
                <Text text='bibliotheque:LivreScreen.racine.children.ecran.children.gauche.children.liste.children.siCoupee.children.coupee.text' />
              </>
            ) : null}
          </Section>
        </Column>
        <Column gap={0}>
          <Section
            title='bibliotheque:LivreScreen.racine.children.ecran.children.detail.children.fiche.title'
            style={{ padding: 0 }}>
            {holds(siChoisiCondition(scope)) ? (
              <>
                <Grid columns={2}>
                  <Text text='bibliotheque:LivreScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreTitre.text' />
                  <Text text={asText(livre?.titre)} />
                  <Text text='bibliotheque:LivreScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.children.grille.children.titreAuteur.text' />
                  <Text text={asText(auteurText(scope))} />
                </Grid>
              </>
            ) : (
              <>
                {holds(siSupprimeCondition(scope)) ? (
                  <>
                    <Text text='bibliotheque:LivreScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.children.supprime.text' />
                  </>
                ) : (
                  <>
                    <Text text='bibliotheque:LivreScreen.racine.children.ecran.children.detail.children.fiche.children.siChoisi.else.siSupprime.else.aucun.text' />
                  </>
                )}
              </>
            )}
          </Section>
          <Section
            title='bibliotheque:LivreScreen.racine.children.ecran.children.detail.children.formulaire.title'
            style={{ padding: 0 }}>
            <SchemaForm
              key={String(livre?._id ?? 'new')}
              schema={Livre}
              entity={livre}
              controlComponent={DocFieldControl}
              quiet
              emptyTextIsMissing
              onSubmit={async (value) => {
                {
                  const saved = await saveDocument(Livre, value, services)
                  if (saved === false) return
                  if (saved) {
                    setLivre(saved)
                    value = saved
                  }
                }
                if ((await onChange?.(value)) === false) return
              }}>
              <FormLayout columns={1}>
                <DocFieldControl name='titre' />
                <DocFieldControl name='auteurId' />
              </FormLayout>
              <Toolbar>
                <Button
                  text='bibliotheque:LivreScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.enregistrer.text'
                  type='submit' />
                {holds(siModifiableCondition(scope)) ? (
                  <>
                    <Button
                      text='bibliotheque:LivreScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.nouveau.text'
                      onClick={async () => {
                        if ((await onChange?.(undefined)) === false) return
                      }} />
                    <Button
                      text='bibliotheque:LivreScreen.racine.children.ecran.children.detail.children.formulaire.children.saisie.children.boutons.children.siModifiable.children.supprimer.text'
                      onClick={async () => {
                        {
                          const deleted = await deleteDocument(Livre, livre, services)
                          if (deleted === false) return
                          if (deleted) setLivre(undefined)
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
