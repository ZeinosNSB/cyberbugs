import { useTheme } from '../../../hooks/useTheme'

export const SignInStyles = () => {
  const { token, screens } = useTheme()

  return {
    container: {
      margin: '0 auto',
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: '380px'
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: 'center',
      width: '100%'
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: 'center'
    },
    section: {
      alignItems: 'center',
      backgroundColor: token.colorBgContainer,
      display: 'flex',
      height: screens.sm ? '100vh' : 'auto',
      padding: 0
    },
    formForgot: {
      float: 'right'
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    },
    logo: {
      width: '80px',
      height: '80px',
      display: 'inline-block'
    },
    icon: {
      textAlign: 'center',
      marginTop: token.marginLG
    }
  }
}
