import { testRelationshipRequiredLists } from "./relationRequired"
import { cascadeDeleteLists } from "./cascadeDelete"
import { historyLists } from "./history"
import { Url } from "./url"

export const testSchemaLists = {
  Url,
  ...historyLists,
  ...cascadeDeleteLists,
  ...testRelationshipRequiredLists,
}
