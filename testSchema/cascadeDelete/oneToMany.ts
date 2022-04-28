import { list } from "@keystone-6/core"
import { relationship, text } from "@keystone-6/core/fields"
import { testUI } from "./utils"
import { beforeOperationDeleteMany } from "../../src/cascadeDelete"

const TestHorseOTM = list({
  fields: {
    name: text(),
  },
  ui: testUI,
})

const TestRiderOTM = list({
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
  ui: testUI,
})

export const testOneToManyList = { TestRiderOTM, TestHorseOTM }
