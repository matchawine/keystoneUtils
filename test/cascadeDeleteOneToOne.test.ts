import { setupTestRunner } from "@keystone-6/core/testing"
import config from "./../keystone"

const runner = setupTestRunner({ config })
describe("One to One", () => {
  it(
    "Delete",
    runner(async ({ context }) => {
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
    }),
  )
})
