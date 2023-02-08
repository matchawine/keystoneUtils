import { getHistoryEntity } from "../../src"
import { allowAll } from "@keystone-6/core/access"

export const History = getHistoryEntity({ access: allowAll })
