import { virtual } from "@keystone-6/core/fields"
import { graphql } from "@keystone-6/core"

export const fieldDocument = () =>
  virtual({
    field: graphql.field({
      type: graphql.String,
      resolve: () => "",
    }),
    ui: {
      views: require.resolve("./FieldDocumentUI"),
    },
  })
