import { testOneToOneList } from "./oneToOne"
import { testOneToManyList } from "./oneToMany"

export const cascadeDeleteLists = {
  ...testOneToOneList,
  ...testOneToManyList,
}
