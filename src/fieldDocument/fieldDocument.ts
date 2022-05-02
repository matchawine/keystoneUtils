import { list } from "@keystone-6/core"
import { text } from "@keystone-6/core/fields"
import { document } from "@keystone-6/fields-document"
import { componentBlocks } from "./componentBlocks"

export const FieldDocument = list({
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    document: document({
      formatting: true,
      dividers: true,
      links: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
      ],
      ui: {
        views: require.resolve("./componentBlocks"),
      },
      componentBlocks,
    }),
  },
})
