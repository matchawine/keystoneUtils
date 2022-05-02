/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@keystone-ui/core"
import { Trash2Icon } from "@keystone-ui/icons/icons/Trash2Icon"
import { Tooltip } from "@keystone-ui/tooltip"
import {
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@keystone-6/fields-document/primitives"
import { component, fields } from "@keystone-6/fields-document/component-blocks"
import Notice from "./index"
import { noticeIconMap } from "./intents"

// Comes from https://github.com/keystonejs/keystone/blob/c9ec91c8d971063169c10e94e93e4626c3d52298/examples-staging/basic/admin/fieldViews/Content.tsx

export const notice = component({
  component: Notice,
  label: "Notice",
  chromeless: true,
  props: {
    intent: fields.select({
      label: "Intent",
      options: [
        { value: "info", label: "Info" },
        { value: "warning", label: "Warning" },
        { value: "error", label: "Error" },
        { value: "success", label: "Success" },
      ] as const,
      defaultValue: "info",
    }),
    content: fields.child({
      kind: "block",
      placeholder: "",
      formatting: "inherit",
      dividers: "inherit",
      links: "inherit",
      relationships: "inherit",
    }),
  },
  toolbar({ props, onRemove }) {
    return (
      <ToolbarGroup>
        {props.intent.options.map(opt => {
          const Icon = noticeIconMap[opt.value]

          return (
            <Tooltip key={opt.value} content={opt.label} weight="subtle">
              {attrs => (
                <ToolbarButton
                  isSelected={props.intent.value === opt.value}
                  onClick={() => {
                    props.intent.onChange(opt.value)
                  }}
                  {...attrs}
                >
                  <Icon size="small" />
                </ToolbarButton>
              )}
            </Tooltip>
          )
        })}

        <ToolbarSeparator />

        <Tooltip content="Remove" weight="subtle">
          {attrs => (
            <ToolbarButton variant="destructive" onClick={onRemove} {...attrs}>
              <Trash2Icon size="small" />
            </ToolbarButton>
          )}
        </Tooltip>
      </ToolbarGroup>
    )
  },
})
