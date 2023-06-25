import { list } from "@keystone-6/core"
import { allowAll } from "@keystone-6/core/access"
import { url } from "../../src/url"
import { Lists } from ".keystone/types"

export const Url: Lists.Url = list({
  access: allowAll,
  fields: {
    linkToBinou: url(),
  },
})
