import { list } from "@keystone-6/core"
import { text, password } from "@keystone-6/core/fields"
import { Lists } from ".keystone/types"
import { testSchemaLists } from "./testSchema"
import { allowAll } from "@keystone-6/core/access"

export const lists: Lists = {
  ...testSchemaLists,
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ["name"],
      },
    },
  }),
}
