// @ts-nocheck
import React from "react"
import { CellComponent, FieldProps } from "@keystone-6/core/types"
import { controller } from "@keystone-6/core/fields/types/json/views"

import { CellLink, CellContainer } from "@keystone-6/core/admin-ui/components"

const messageByType = {
  itemDeletedNow: "❌ Item deleted",
  itemDeletedLater: "❌🕘 Item deleted (after)",
  itemExists: "➡️ Go to item",
  entityDeleted: "❌📒 Entity deleted/renamed",
}

const getUIData = ({ type, plural, entityId }) => {
  const message = messageByType[type]

  const uri =
    type === "itemExists"
      ? `/${plural.toLowerCase()}/${entityId}`
      : type !== "entityDeleted" && `/${plural.toLowerCase()}`

  return { message, uri }
}

export const Cell: CellComponent = ({ item, field }) => {
  const value = item[field.path]
  const { message, uri } = getUIData(value)

  return uri ? (
    <CellLink href={uri}>{message}</CellLink>
  ) : (
    <CellContainer>{message}</CellContainer>
  )
}

export const Field = ({
  // field,
  value,
}: FieldProps<typeof controller>) => {
  const { message, uri } = getUIData(value)
  return uri ? <a href={uri}>{message}</a> : <div>{message}</div>
}
