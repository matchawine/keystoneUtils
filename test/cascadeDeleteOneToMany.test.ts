import { setupTestRunner } from "@keystone-6/core/testing"
import config from "./../keystone"

const runner = setupTestRunner({ config })

describe("One to Many", () => {
  it(
    "Delete",
    runner(async ({ context }) => {
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
    }),
  )
})
