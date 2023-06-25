import { list } from "@keystone-6/core"
import { relationship, text } from "@keystone-6/core/fields"
import { beforeOperationDeleteMany } from "../../src/cascadeDelete"
import { allowAll } from "@keystone-6/core/access"
import { Lists } from ".keystone/types"

const TestHorseOTM: Lists.TestHorseOTM = list({
  access: allowAll,
  fields: {
    name: text(),
  },
})

const TestRiderOTM: Lists.TestRiderOTM = list({
  access: allowAll,
  fields: {
    name: text(),
    horses: relationship({
      ref: "TestHorseOTM",
      many: true,
      hooks: {
        beforeOperation: beforeOperationDeleteMany({ ref: "TestHorseOTM" }),
      },
    }),
  },
})

export const testOneToManyList = { TestRiderOTM, TestHorseOTM }
