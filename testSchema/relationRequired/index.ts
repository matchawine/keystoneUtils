import { list } from "@keystone-6/core"
import { relationship, text } from "@keystone-6/core/fields"
import { relationRequiredValidateInput } from "../../src"
import { allowAll } from "@keystone-6/core/access"

const TestHorseRelationshipRequired = list({
  access: allowAll,
  fields: {
    name: text(),
  },
})

const TestRiderRelationshipRequired = list({
  access: allowAll,
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
