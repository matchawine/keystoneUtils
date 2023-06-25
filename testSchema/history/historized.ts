import { BaseFields, list } from "@keystone-6/core"
import { text } from "@keystone-6/core/fields"
import { afterOperationSaveHistory } from "../../src/history/history"
import { allowAll } from "@keystone-6/core/access"
import { Lists } from ".keystone/types"

export const Historized: Lists.Historized = list({
  access: allowAll,
  fields: {
    name: text(),
  },
  hooks: {
    afterOperation: afterOperationSaveHistory,
  },
})
