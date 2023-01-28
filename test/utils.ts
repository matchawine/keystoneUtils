import path from "path"
import * as PrismaModule from ".prisma/client"
import { resetDatabase } from "@keystone-6/core/testing"
import { getContext } from "@keystone-6/core/context"
import baseConfig from "../keystone"

export const getDbUrl = () =>
  `file:./test-${process.env.JEST_WORKER_ID || ""}.db`
export const getTestContext = () => {
  const config = { ...baseConfig, db: { ...baseConfig.db, url: getDbUrl() } }
  return getContext(config, PrismaModule)
}
export const resetTestDatabase = async () => {
  const prismaSchemaPath = path.join(__dirname, "../schema.prisma")
  await resetDatabase(getDbUrl(), prismaSchemaPath)
}
