import { ListHooks } from "@keystone-6/core/types"
import { BaseListTypeInfo } from "@keystone-6/core/types"

type BeforeOperationType<ListTypeInfo extends BaseListTypeInfo> = Exclude<
  ListHooks<ListTypeInfo>["beforeOperation"],
  undefined
>

type BeforeOperationParameter<ListTypeInfo extends BaseListTypeInfo> =
  Parameters<BeforeOperationType<ListTypeInfo>>[0] & {
    fieldKey: string
  }

type HookConfig = {
  ref: string
}

type Id = NonNullable<any>
type IdObject = { id: Id }

export const beforeOperationDeleteOne =
  <ListTypeInfo extends BaseListTypeInfo>({ ref }: HookConfig) =>
  async ({
    item,
    context,
    fieldKey,
    operation,
  }: BeforeOperationParameter<ListTypeInfo>) => {
    if (operation === "delete") {
      const idPath = fieldKey + "Id"
      const id = (item as { [idPath: string]: Id })[idPath]
      if (id) await context.query[ref].deleteOne({ where: { id } })
    }
  }

export const beforeOperationDeleteMany =
  <ListTypeInfo extends BaseListTypeInfo>({ ref }: HookConfig) =>
  async ({
    item,
    context,
    fieldKey,
    listKey,
    operation,
  }: BeforeOperationParameter<ListTypeInfo>) => {
    if (operation === "delete") {
      const { id } = item as IdObject
      const parentWithChildren = await context.query[listKey].findOne({
        where: { id },
        query: `${fieldKey} { id }`,
      })

      const children = parentWithChildren[fieldKey] as [IdObject] | undefined
      const ids = (children || []).map(({ id }) => id)
      const where = ids.map(id => ({ id }))
      await context.query[ref].deleteMany({ where })
    }
  }
