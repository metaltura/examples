// The composition EntityScreen: its properties are the props.
// Generated from the model: change the model, not this file.
import { Column, Page, Row } from '@kogitec/core/client'
import type { TranslationText } from '@kogitec/core/common'
import { DocForm, DocList, DocScope } from '@kogitec/schema/client'
import type { FieldShape, Schema } from '@kogitec/schema/common'

export type EntityScreenProps<EntityShape extends FieldShape> = {
  title: TranslationText
  entity: Schema<EntityShape>
}

export const EntityScreen = <EntityShape extends FieldShape>({ title, entity }: EntityScreenProps<EntityShape>) => (
  <Page title={title}>
    <DocScope schema={entity}>
      <Column>
        <Row>
          <DocList />
          <DocForm />
        </Row>
      </Column>
    </DocScope>
  </Page>
)
