import { list } from "@keystone-6/core"
import { allowAll } from "@keystone-6/core/access"
import { url } from "../../src/url"

export const Url = list({
  access: allowAll,
  fields: {
    linkToBinou: url(),
  },
})
