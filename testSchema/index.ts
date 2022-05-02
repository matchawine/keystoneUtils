import { testRelationshipRequiredLists } from "./relationRequired"
import { cascadeDeleteLists } from "./cascadeDelete"
import { historyLists } from "./history"
import { fieldDocumentLists } from "./fieldDocument"

export const testSchemaLists = {
  ...historyLists,
  ...cascadeDeleteLists,
  ...testRelationshipRequiredLists,
  ...fieldDocumentLists,
}
