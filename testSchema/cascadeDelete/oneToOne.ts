import { list } from "@keystone-6/core"
import { relationship, text } from "@keystone-6/core/fields"
import { beforeOperationDeleteOne } from "../../src/cascadeDelete"
import { allowAll } from "@keystone-6/core/access"
import { Lists } from ".keystone/types"

const TestRiderOTO: Lists.TestRiderOTO = list({
  access: allowAll,
  fields: {
    name: text(),
  },
})

const TestHorseOTO: Lists.TestHorseOTO = list({
  access: allowAll,
  fields: {
    name: text(),
    rider: relationship({
      ref: "TestRiderOTO",
      hooks: {
        beforeOperation: beforeOperationDeleteOne({ ref: "TestRiderOTO" }),
      },
    }),
  },
})

export const testOneToOneList = { TestRiderOTO, TestHorseOTO }
