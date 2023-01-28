import { getTestContext, resetTestDatabase } from "./utils"

const context = getTestContext()

beforeEach(resetTestDatabase)

describe("One to One", () => {
  it("Delete", async () => {
    const createRider = { name: "Roger" }

    const createHorse = {
      name: "Jumpy",
      rider: { create: createRider },
    }

    const horse = await context.query.TestHorseOTO.createOne({
      data: createHorse,
      query: "id rider { name }",
    })

    expect(horse).toMatchInlineSnapshot(
      {
        id: expect.any(String),
      },
      `
        {
          "id": Any<String>,
          "rider": {
            "name": "Roger",
          },
        }
      `,
    )

    await context.query.TestHorseOTO.deleteOne({
      where: {
        id: horse.id,
      },
    })

    expect(await context.query.TestRiderOTO.findMany()).toEqual([])
  })
})
