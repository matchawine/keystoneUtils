import { setupTestRunner } from "@keystone-6/core/testing"
import config from "./../keystone"

const runner = setupTestRunner({ config })
describe("Relation Required", () => {
  it(
    "Required",
    runner(async ({ context }) => {
      const { data, errors } = await context.graphql.raw({
        query: `mutation {
            createTestRiderRelationshipRequired(data: { name: "Doe" }) {
              id name horse { id }
          }
        }`,
      })

      expect(data?.createTestRiderRelationshipRequired).toBe(null)
      expect(errors && errors[0].message).toMatch("horse field is required")
    }),
  )
})
