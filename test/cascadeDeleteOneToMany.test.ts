import { getTestContext, resetTestDatabase } from "./utils"

const context = getTestContext()

beforeEach(resetTestDatabase)

describe("One to Many", () => {
  it("Delete", async () => {
    const createHorses = [{ name: "Jumpy" }]

    const createRider = {
      name: "Roger",
      horses: { create: createHorses },
    }
    const rider = await context.query.TestRiderOTM.createOne({
      data: createRider,
      query: "id horses { name }",
    })

    expect(rider).toMatchInlineSnapshot(
      {
        id: expect.any(String),
      },
      `
      {
        "horses": [
          {
            "name": "Jumpy",
          },
        ],
        "id": Any<String>,
      }
    `,
    )

    await context.query.TestRiderOTM.deleteOne({
      where: { id: rider.id },
    })

    expect(await context.query.TestHorseOTM.findMany()).toEqual([])
  })
})
