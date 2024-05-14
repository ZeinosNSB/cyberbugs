import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Grid,
  Input,
  Row,
  Space,
  theme,
  Typography
} from 'antd'

import {
  FacebookFilled,
  GoogleCircleFilled,
  LockOutlined,
  MailOutlined
} from '@ant-design/icons'

const { useToken } = theme
const { useBreakpoint } = Grid
const { Text, Title, Link } = Typography

export default function App() {
  const { token } = useToken()
  const screens = useBreakpoint()

  const onFinish = values => {
    console.log('Received values of form: ', values)
  }

  const styles = {
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
      height: '80px'
    },
    icon: {
      textAlign: 'center',
      marginTop: token.marginLG
    }
  }

  return (
    <Row>
      <Col span={12}>
        <section style={styles.section}>
          <div style={styles.container}>
            <div style={styles.header}>
              <img style={styles.logo} src='./img/logo.png' alt='Logo' />

              <Title style={styles.title}>Sign in</Title>
              <Text style={styles.text}>
                Welcome back to AntBlocks UI! Please enter your details below to sign in.
              </Text>
            </div>
            <Form
              name='normal_login'
              initialValues={{
                remember: true
              }}
              onFinish={onFinish}
              layout='vertical'
              requiredMark='optional'
            >
              <Form.Item
                name='email'
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Please input your Email!'
                  }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder='Email' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!'
                  }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type='password'
                  placeholder='Password'
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link href='' style={styles.formForgot}>
                  Forgot password?
                </Link>
              </Form.Item>
              <Form.Item style={{ marginBottom: '0px' }}>
                <Button block='true' type='primary' htmlType='submit'>
                  Log in
                </Button>
                <Divider plain>Or continue with</Divider>
                <div style={styles.footer}>
                  <Text style={styles.text}>Don&apos;t have an account?</Text>
                  <Link href=''>Sign up now</Link>
                </div>
                <div style={styles.icon}>
                  <Space>
                    <Button type='primary' shape='circle' icon={<FacebookFilled />} />
                    <Button type='primary' shape='circle' icon={<GoogleCircleFilled />} />
                  </Space>
                </div>
              </Form.Item>
            </Form>
          </div>
        </section>
      </Col>
      <Col span={12}></Col>
    </Row>
  )
}
