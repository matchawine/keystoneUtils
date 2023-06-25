import { getHistoryEntity } from "../../src"
import { allowAll } from "@keystone-6/core/access"
import { Lists } from ".keystone/types"

export const History: Lists.History = getHistoryEntity({ access: allowAll })
