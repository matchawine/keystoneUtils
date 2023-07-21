import { BaseListTypeInfo, FieldTypeFunc } from "@keystone-6/core/types"
import { TextFieldConfig } from "@keystone-6/core/dist/declarations/src/fields/types/text"
import { url } from "../index"

export const imageUrl = <ListTypeInfo extends BaseListTypeInfo>(
  urlFieldConfig?: TextFieldConfig<ListTypeInfo> | undefined,
): FieldTypeFunc<ListTypeInfo> =>
  url({
    ...urlFieldConfig,
    ui: {
      ...urlFieldConfig?.ui,
      views: process.env.IS_LIBRARY_DEV
        ? "./src/url/imageUrl/view"
        : "matcha-keystone-utils/dist/url/imageUrl/view",
    },
  })
