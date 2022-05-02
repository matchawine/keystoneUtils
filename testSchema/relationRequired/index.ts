import { list } from "@keystone-6/core"
import { relationship, text } from "@keystone-6/core/fields"
import { relationRequiredValidateInput } from "../../src"

const TestHorseRelationshipRequired = list({
  fields: {
    name: text(),
  },
})

const TestRiderRelationshipRequired = list({
  fields: {
    name: text(),
    horse: relationship({
      ref: "TestHorseRelationshipRequired",
      hooks: {
        validateInput: relationRequiredValidateInput,
      },
    }),
  },
})

export const testRelationshipRequiredLists = {
  TestHorseRelationshipRequired,
  TestRiderRelationshipRequired,
}
