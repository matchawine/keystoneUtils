/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@keystone-ui/core"
import React from "react"
import { FieldProps } from "@keystone-6/core/types"
import { controller } from "@keystone-6/core/fields/types/json/views"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import { componentBlocks } from "./componentBlocks"
import { InferRenderersForComponentBlocks } from "@keystone-6/fields-document/component-blocks"
import { useQuery, gql } from "@keystone-6/core/admin-ui/apollo"
import Notice from "../componentBlocks/Notice"
import { DocumentRendererProps } from "@keystone-6/document-renderer/dist/declarations/src"

type QueryData = {
  fieldDocument: null | {
    document: { document: DocumentRendererProps["document"] }
  }
}

const componentBlockRenderers: InferRenderersForComponentBlocks<
  typeof componentBlocks
> = {
  notice: Notice,
}

export const Field = ({ field: { path } }: FieldProps<typeof controller>) => {
  const QUERY = gql`
    query getFieldDocument($name: String) {
      fieldDocument(where: { name: $name }) {
        id
        name
        document {
          document
        }
      }
    }
  `
  const { data, error } = useQuery(QUERY, {
    variables: { name: path },
  })
  console.log("error", error)
  console.log("data", data)
  const value = (data as QueryData)?.fieldDocument?.document
  if (error) console.error("Error when loading field document:", error)
  if (!value) console.warn(`Field ${path} is not in current field documents`)

  return value ? (
    <DocumentRenderer
      document={value.document}
      componentBlocks={componentBlockRenderers}
    ></DocumentRenderer>
  ) : null
  // return null
}
