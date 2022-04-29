import { list } from "@keystone-6/core"
import { relationship, text } from "@keystone-6/core/fields"
import { testUI } from "./utils"
import { beforeOperationDeleteOne } from "../../src/cascadeDelete"

const TestRiderOTO = list({
  fields: {
    name: text(),
  },
  ui: testUI,
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
  ui: testUI,
})

export const testOneToOneList = { TestRiderOTO, TestHorseOTO }
