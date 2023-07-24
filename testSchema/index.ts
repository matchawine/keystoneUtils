import { testRelationshipRequiredLists } from "./relationRequired"
import { cascadeDeleteLists } from "./cascadeDelete"
import { historyLists } from "./history"
import { Url } from "./url"
import { ImageUrl } from "./imageUrl"

export const testSchemaLists = {
  Url,
  ImageUrl,
  ...historyLists,
  ...cascadeDeleteLists,
  ...testRelationshipRequiredLists,
}
