import { config } from "@keystone-6/core"

import { lists } from "./schema"

const url = process.env.DATABASE_URL || "file:./keystone.db"
const port = parseInt(process.env.PORT || "") || 3002

console.log("url", url)
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
