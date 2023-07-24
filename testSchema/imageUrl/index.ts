import { list } from "@keystone-6/core"
import { allowAll } from "@keystone-6/core/access"
import { Lists } from ".keystone/types"
import { imageUrl } from "../../src/url/imageUrl"

export const ImageUrl: Lists.ImageUrl = list({
  access: allowAll,
  fields: {
    linkToImage: imageUrl({
      ui: { itemView: { fieldPosition: "sidebar" } },
    }),
  },
})
