import { list } from "@keystone-6/core"
import { text } from "@keystone-6/core/fields"
import { fieldDocument } from "../../src/fieldDocument/field"

export const SchemaWithFieldDocument = list({
  fields: {
    name: text(),
    testFieldDocument: fieldDocument(),
  },
})
