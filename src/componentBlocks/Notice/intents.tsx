import { InfoIcon } from "@keystone-ui/icons/icons/InfoIcon"
import { AlertTriangleIcon } from "@keystone-ui/icons/icons/AlertTriangleIcon"
import { AlertOctagonIcon } from "@keystone-ui/icons/icons/AlertOctagonIcon"
import { CheckCircleIcon } from "@keystone-ui/icons/icons/CheckCircleIcon"
import { useTheme } from "@keystone-ui/core"

export type IntentType = "info" | "error" | "warning" | "success"

export const noticeIconMap = {
  info: InfoIcon,
  error: AlertOctagonIcon,
  warning: AlertTriangleIcon,
  success: CheckCircleIcon,
}

export const useIntentCss = (intentType: IntentType) => {
  const { palette } = useTheme()
  const intentCssByType = {
    info: {
      background: palette.blue100,
      foreground: palette.blue700,
      icon: noticeIconMap.info,
    },
    error: {
      background: palette.red100,
      foreground: palette.red700,
      icon: noticeIconMap.error,
    },
    warning: {
      background: palette.yellow100,
      foreground: palette.yellow700,
      icon: noticeIconMap.warning,
    },
    success: {
      background: palette.green100,
      foreground: palette.green700,
      icon: noticeIconMap.success,
    },
  }
  return intentCssByType[intentType]
}
