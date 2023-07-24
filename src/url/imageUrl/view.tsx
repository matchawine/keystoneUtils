import React from "react"
import {
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
  JSONValue,
} from "@keystone-6/core/types"
import { CellContainer } from "@keystone-6/core/admin-ui/components"
import {
  FieldContainer,
  FieldDescription,
  FieldLabel,
  TextInput,
} from "@keystone-ui/fields"

// inspired by: https://github.com/keystonejs/keystone/blob/main/examples/custom-field/1-text-field/views.tsx

export const controller = (
  config: FieldControllerConfig<JSONValue | undefined>,
): FieldController<string | null, string> => ({
  path: config.path,
  label: config.label,
  description: config.description,
  graphqlSelection: config.path,
  defaultValue: null,
  deserialize: (data: Record<any, any>) => {
    const value = data[config.path]
    return typeof value === "string" ? value : null
  },
  serialize: value => ({ [config.path]: value }),
})

export const Cell: CellComponent = ({ item, field }) => {
  const value = item[field.path]

  return (
    value && (
      <CellContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img style={{ maxWidth: 150, maxHeight: 150 }} alt="" src={value} />
        </div>
      </CellContainer>
    )
  )
}

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => {
  const disabled = onChange === undefined
  return (
    <FieldContainer as="fieldset">
      <FieldLabel>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
      </FieldDescription>
      <div>
        <TextInput
          type="text"
          onChange={event => {
            onChange?.(event.target.value)
          }}
          disabled={disabled}
          value={value || ""}
          autoFocus={autoFocus}
        />
      </div>
      {/*
      Kludge:  This will be trigered on each onChange call, no solution for now.
      A ticket need to be sent to Keystone.
      */}
      {value && (
        <div
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={value} alt="Image not found." />
        </div>
      )}
    </FieldContainer>
  )
}
