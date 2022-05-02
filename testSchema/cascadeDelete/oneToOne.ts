import { list } from "@keystone-6/core"
import { relationship, text } from "@keystone-6/core/fields"
import { beforeOperationDeleteOne } from "../../src/cascadeDelete"

const TestRiderOTO = list({
  fields: {
    name: text(),
  },
})

const TestHorseOTO = list({
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
