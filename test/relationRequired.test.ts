import { getTestContext, resetTestDatabase } from "./utils"

const context = getTestContext()

beforeEach(resetTestDatabase)

describe("Relation Required", () => {
  it("Required", async () => {
    const { data, errors } = await context.graphql.raw({
      query: `mutation {
            createTestRiderRelationshipRequired(data: { name: "Doe" }) {
              id name horse { id }
          }
        }`,
    })

    expect(
      (data as { createTestRiderRelationshipRequired: any })
        ?.createTestRiderRelationshipRequired,
    ).toBe(null)
    expect(errors && errors[0].message).toMatch("horse field is required")
  })
})
