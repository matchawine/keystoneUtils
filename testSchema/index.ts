import { testRelationshipRequiredLists } from "./relationRequired"
import { cascadeDeleteLists } from "./cascadeDelete"
import { historyLists } from "./history"

export const testSchemaLists = {
  ...historyLists,
  ...cascadeDeleteLists,
  ...testRelationshipRequiredLists,
}
