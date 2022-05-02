/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@keystone-ui/core"
import { IntentType, useIntentCss } from "./intents"
import { ReactNode } from "react"

type Props = {
  content: ReactNode
  intent: IntentType | { value: IntentType }
}

const Notice = ({ content, intent }: Props) => {
  const { radii, spacing } = useTheme()
  const intentType = typeof intent === "string" ? intent : intent.value
  const intentCss = useIntentCss(intentType)

  return (
    <div
      css={{
        borderRadius: radii.small,
        display: "flex",
        paddingLeft: spacing.medium,
        paddingRight: spacing.medium,
      }}
      style={{
        background: intentCss.background,
      }}
    >
      <div
        contentEditable={false}
        css={{
          color: intentCss.foreground,
          marginRight: spacing.small,
          marginTop: "1em",
          userSelect: "none",
        }}
      >
        <intentCss.icon />
      </div>
      <div css={{ flex: 1 }}>{content}</div>
    </div>
  )
}

export default Notice
