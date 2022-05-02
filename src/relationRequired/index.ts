type ChildResolvedData = {
  connect?: { id: NonNullable<any> }
  disconnect?: boolean
}

type GetChildArgs = {
  resolvedData: Record<string, unknown>
  item?: Record<string, unknown>
  fieldKey: string
}

type ValidateInputHookArgs = GetChildArgs & {
  addValidationError: (error: string) => void
}

const hasChild = ({ resolvedData, item, fieldKey }: GetChildArgs) => {
  const resolvedChild = resolvedData[fieldKey] as ChildResolvedData
  return !!(
    resolvedChild?.connect?.id ||
    (!resolvedChild?.disconnect && item && item[fieldKey + "Id"])
  )
}

export const relationRequiredValidateInput = ({
  resolvedData,
  item,
  fieldKey,
  addValidationError,
}: ValidateInputHookArgs) => {
  if (!hasChild({ resolvedData, item, fieldKey }))
    addValidationError(`${fieldKey} field is required`)
}
