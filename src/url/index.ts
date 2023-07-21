import { BaseListTypeInfo, FieldTypeFunc } from "@keystone-6/core/types"
import { TextFieldConfig } from "@keystone-6/core/dist/declarations/src/fields/types/text"
import { text } from "@keystone-6/core/fields"

// https://stackoverflow.com/a/3809435
const urlRegex =
  /^$|^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

export const url = <ListTypeInfo extends BaseListTypeInfo>(
  urlFieldConfig?: TextFieldConfig<ListTypeInfo> | undefined,
): FieldTypeFunc<ListTypeInfo> =>
  text({
    ...urlFieldConfig,
    ui: {
      ...urlFieldConfig?.ui,
      displayMode: "input",
      views:
        urlFieldConfig?.ui?.views ||
        (process.env.IS_LIBRARY_DEV
          ? "./src/url/view"
          : "matcha-keystone-utils/dist/url/view"),
    },
    validation: {
      ...urlFieldConfig?.validation,
      match: { regex: urlRegex, ...urlFieldConfig?.validation?.match },
    },
  })
