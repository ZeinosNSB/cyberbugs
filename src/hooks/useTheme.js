import { Grid, theme } from 'antd'

export const useTheme = () => {
  const screens = Grid.useBreakpoint()
  const { token } = theme.useToken()

  return { token, screens }
}
