import { Button, Checkbox, Divider, Form, Input, Space, Typography } from 'antd'
import {
  FacebookFilled,
  GoogleCircleFilled,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons'
import { UserSignInStyles } from '../styles/UserSignInStyles'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FormItem } from '../components/FormItem'
import { useDispatch } from 'react-redux'
import { setUserSignIn, usersSignIn } from '../store/reducer/usersSlice'
import { TOKEN } from '../utils/settingSystems'
import { useNavigate } from 'react-router-dom'

const { Text, Title, Link } = Typography

const schema = yup
  .object({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().required('Password is required'),
    remember: yup.boolean()
  })
  .required()

export default function UserSignIn() {
  const styles = UserSignInStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({
    defaultValues: { remember: true },
    resolver: yupResolver(schema)
  })
  const onSubmit = async values => {
    try {
      const result = await dispatch(usersSignIn(values)).unwrap()
      console.log(result)
      if (result.content.accessToken) {
        localStorage.setItem(TOKEN, result.content.accessToken)
        localStorage.setItem('user_login', JSON.stringify(result.content))
        dispatch(setUserSignIn(result.content))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <img style={styles.logo} src='./img/logo.png' alt='Logo' />

          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>
            Welcome to CyberBugs! Please enter your details below to sign in.
          </Text>
        </div>
        <Form name='login-form' onFinish={handleSubmit(onSubmit)} layout='vertical'>
          <FormItem control={control} name='email'>
            <Input prefix={<UserOutlined />} placeholder='Email' />
          </FormItem>
          <FormItem control={control} name='password'>
            <Input.Password prefix={<LockOutlined />} placeholder='Password' />
          </FormItem>
          <Form.Item>
            <FormItem control={control} name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </FormItem>
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
  )
}
