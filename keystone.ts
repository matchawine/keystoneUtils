import { config } from "@keystone-6/core"

// eslint-disable-next-line immutable/no-mutation
process.env.IS_LIBRARY_DEV = "true"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { lists } = require("./schema")

const url = process.env.DATABASE_URL || "file:./keystone.db"
const port = parseInt(process.env.PORT || "") || 3002

export default config({
  db: {
    provider: "sqlite",
    url,
  },
  server: {
    port,
  },
  lists,
})
