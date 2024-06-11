import {
  FacebookFilled,
  GoogleCircleFilled,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, Divider, Form, Input, Space, Typography } from 'antd'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { FormItem } from '../../../components/form/FormItem'
import { useSignInMutation } from '../../../redux/api/users.service'
import { setUserSignIn } from '../../../redux/reducer/users.slice'
import { TOKEN, USER_LOGIN } from '../../../utils/settingSystems'
import { SignInStyles } from './SignInStyles'

const { Text, Title } = Typography

const schema = yup
  .object({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().required('Password is required'),
    remember: yup.boolean()
  })
  .required()

export default function SignIn() {
  const styles = SignInStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [signIn] = useSignInMutation()

  const { control, handleSubmit } = useForm({
    defaultValues: { remember: true },
    resolver: yupResolver(schema)
  })

  const onSubmit = async values => {
    try {
      const result = await signIn(values).unwrap()
      if (result?.content?.accessToken) {
        localStorage.setItem(TOKEN, result?.content?.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(result?.content))
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
            <Link to='*' style={styles.formForgot} className='text-amber-600'>
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
              <Link to='/signup' className='text-amber-600'>
                Sign up now
              </Link>
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
