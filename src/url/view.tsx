import React from "react"
import { CellComponent } from "@keystone-6/core/types"
import { CellLink } from "@keystone-6/core/admin-ui/components"

export const Cell: CellComponent = ({ item, field }) => {
  const value = item[field.path]

  return (
    value && <CellLink href={value} target="_blank">{`➡️ Go to link`}</CellLink>
  )
}
