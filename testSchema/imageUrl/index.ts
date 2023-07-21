import { list } from "@keystone-6/core"
import { allowAll } from "@keystone-6/core/access"
import { Lists } from ".keystone/types"
import { imageUrl } from "../../src/url/imageUrl"

export const ImageUrl: Lists.Url = list({
  access: allowAll,
  fields: {
    linkToBinouImage: imageUrl({
      ui: { itemView: { fieldPosition: "sidebar" } },
    }),
  },
})
