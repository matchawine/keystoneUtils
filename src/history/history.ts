/* eslint-disable */
// @ts-nocheck
import { graphql, list, ListConfig } from "@keystone-6/core"
import {
  json,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from "@keystone-6/core/fields"
import { BaseListTypeInfo, KeystoneContext } from "@keystone-6/core/types"
import { allowAll } from "@keystone-6/core/access"
import { ListAccessControl } from "@keystone-6/core/dist/declarations/src/types/config/access-control"

/*
TODO:
- Bug "go to item" for boost campaign
- Code cleanup
- Add session user
- Add session user access to history (remove allowAll)
- Check what happens if user is deleted
- Check what happens when no user
- Interface cleanup
- Move to utils project
- Try "restore before" and "restore after"
- Ignore password
 */

const operations = [
  { value: "create", label: "👶 Create" },
  { value: "update", label: "💇 Update" },
  { value: "delete", label: "🧓 Delete" },
]

const pluralNameQuery = `
query ($key: String!) {
  keystone {
    adminMeta {
      list(key: $key) {
        key
        plural
      }
    }
  }
}
`

const getNameDate = date => date.toISOString().slice(0, 16).replace("T", " ")

export const getHistoryEntity = <ListTypeInfo extends BaseListTypeInfo>(
  listConfig: Omit<ListConfig<ListTypeInfo, any>, "fields">,
) =>
  list({
    ...listConfig,
    fields: {
      name: virtual({
        field: graphql.field({
          type: graphql.String,
          resolve: ({ entity, date, operation }) =>
            `[${operation} in ${entity}] ${getNameDate(date)}`,
        }),
        ui: {
          listView: { fieldMode: "hidden" },
        },
      }),
      date: timestamp(),
      user: relationship({ ref: "User" }),
      entity: text(),
      entityId: text(),
      operation: select({ options: operations }),
      before: json({ label: "Before [originalItem]" }),
      after: json({ label: "After [item]" }),
      inputData: json({ label: "Modified [inputData]" }),
      resolvedData: json({ label: "Resolved [resolvedData]" }),
      item: virtual({
        field: graphql.field({
          type: graphql.object<{
            words: number
            sentences: number
            paragraphs: number
          }>()({
            name: "ItemData",
            fields: {
              type: graphql.field({ type: graphql.String }),
              plural: graphql.field({ type: graphql.String }),
              entityId: graphql.field({ type: graphql.String }),
            },
          }),
          resolve: async (item, args, context) => {
            const { entityId, entity } = item
            // console.log(context.)
            const keystoneMetaResponse = await context.graphql.run({
              query: pluralNameQuery,
              variables: { key: entity },
            })
            const listMeta = keystoneMetaResponse.keystone.adminMeta.list
            const plural = listMeta?.plural
            const itemz =
              listMeta &&
              (await context.query[entity].findOne({
                where: { id: entityId },
              }))

            const type =
              item.operation === "delete"
                ? "itemDeletedNow"
                : listMeta
                ? itemz
                  ? "itemExists"
                  : "itemDeletedLater"
                : "entityDeleted"

            return { type, plural, entityId }
          },
        }),
        ui: {
          query: "{ type plural entityId }",
          // TODO: kludge, try using clean package exports instead, like:
          // https://github.com/keystonejs/keystone/blob/main/packages/cloudinary/views/package.json
          views: process.env.IS_LIBRARY_DEV
            ? "./src/history/item"
            : "matcha-keystone-utils/dist/history/item",
        },
      }),
    },
    ui: {
      listView: {
        initialColumns: ["user", "item", "operation", "date"],
        initialSort: { field: "date", direction: "DESC" },
      },
      hideCreate: true,
      hideDelete: true,
    },
    hooks: {
      validateInput: ({ operation, addValidationError }) => {
        if (operation === "update")
          addValidationError("You cannot rewrite History, you fascist!")
      },
    },
  })

type AfterOperationInput<TypeInfo> = {
  listKey: string
  operation: string
  inputData: any
  originalItem: any
  item: any
  resolvedData: any
  context: KeystoneContext<TypeInfo>
}

export const afterOperationSaveHistory = async ({
  listKey,
  operation,
  originalItem,
  item,
  inputData,
  resolvedData,
  context,
}: AfterOperationInput) => {
  // console.log("operation", operation)
  // console.log("listKey", listKey)
  // console.log("inputData", inputData)
  // console.log("resolvedData", resolvedData)
  // console.log("item", item)
  // console.log("originalItem", originalItem)
  // console.log("context.session", context.session)

  const entityId = item?.id || originalItem?.id || ""
  const userId = context.session?.data?.id

  const history = {
    date: new Date(),
    user: userId ? { connect: { id: userId } } : null,
    entity: listKey,
    entityId,
    operation,
    before: originalItem,
    after: item,
    inputData,
    resolvedData,
  }
  await context.sudo().db.History.createOne({ data: history })
}
