import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, Divider, Form, Input } from 'antd'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import googleLogo from '../../../assets/img/google.svg'
import { FormItem } from '../../../components/form/FormItem'
import { useSignInMutation } from '../../../redux/api/users.service'
import { SignInSchema } from '../../../schema/AccountSchema'
import { TOKEN, USER_LOGIN } from '../../../utils/settingSystems'

function SignIn() {
  const navigate = useNavigate()

  const [signIn] = useSignInMutation()

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(SignInSchema)
  })

  const onSubmit = async values => {
    try {
      const result = await signIn(values).unwrap()
      if (result?.content?.accessToken) {
        localStorage.setItem(TOKEN, result?.content?.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(result?.content))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-4/6 m-auto h-screen flex items-center'>
      <div>
        <img className='w-24 -ml-5' src='./img/logo.png' alt='Logo' />
        <h1 className='font-medium text-4xl text-neutral-700 mb-4 mt-2'>Sign In</h1>
        <p className='mb-4'>
          Welcome to CyberBugs! Please enter your details below to sign in.
        </p>
        <Form name='lol' onFinish={handleSubmit(onSubmit)} layout='vertical'>
          <FormItem control={control} name='email'>
            <Input prefix={<UserOutlined />} placeholder='Email' />
          </FormItem>
          <FormItem control={control} name='password'>
            <Input.Password prefix={<LockOutlined />} placeholder='Password' />
          </FormItem>
          <div className='mb-6 flex justify-between'>
            <Form.Item
              initialValue='true'
              name='remember'
              valuePropName='checked'
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to='/forgot-password' className='text-amber-600'>
              Forgot password
            </Link>
          </div>
          <Button
            className='w-full p-6 flex items-center justify-center'
            htmlType='submit'
            type='primary'
          >
            <span>Sign In</span>
          </Button>
        </Form>
        <Divider plain>Or</Divider>
        <Button
          className='flex items-center p-6 w-full justify-center border border-amber-500'
          type='text'
        >
          <img src={googleLogo} alt='Google Logo' className='w-8' />
          <span>Sign in with Google</span>
        </Button>
        <div className='text-center mt-4'>
          <span className='mr-3'>Don&apos;t have an account?</span>
          <Link to='/signup' className='text-amber-600'>
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
