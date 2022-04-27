import { list } from "@keystone-6/core"
import { text } from "@keystone-6/core/fields"
import { afterOperationSaveHistory } from "../src/history/history"

export const Historized = list({
  fields: {
    name: text(),
  },
  hooks: {
    afterOperation: afterOperationSaveHistory,
  },
})
