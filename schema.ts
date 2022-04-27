import { list } from "@keystone-6/core"
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from "@keystone-6/core/fields"
import { document } from "@keystone-6/fields-document"
import { Lists } from ".keystone/types"
import { History } from "./src/history/history"
import { Historized } from "./testSchema/historized"

export const lists: Lists = {
  History,
  Historized,
  User: list({
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
