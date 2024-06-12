import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Divider, Form, Input } from 'antd'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import googleLogo from '../../../assets/img/google.svg'
import { FormItem } from '../../../components/form/FormItem'
import { useSignUpMutation } from '../../../redux/api/users.service'
import { SignUpSchema } from '../../../schema/AccountSchema'

function SignUp() {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(SignUpSchema)
  })

  const [signUp] = useSignUpMutation()

  const onSubmit = values => {
    signUp(values)
    navigate('/signin')
  }

  return (
    <div className='w-4/6 m-auto h-screen flex items-center'>
      <div>
        <img className='w-24 -ml-5' src='./img/logo.png' alt='Logo' />
        <h1 className='font-medium text-4xl text-neutral-700 mb-4 mt-2'>
          Create an account
        </h1>
        <p className='mb-4'>
          Welcome to CyberBugs! Please enter your details below to create an account.
        </p>
        <Button
          className='flex items-center p-6 w-full justify-center border border-amber-500'
          type='text'
        >
          <img src={googleLogo} alt='Google Logo' className='w-8' />
          <span>Sign up with Google</span>
        </Button>
        <Divider plain>Or</Divider>
        <Form name='lol' onFinish={handleSubmit(onSubmit)} layout='vertical'>
          <FormItem
            control={control}
            name='name'
            label={<p className='font-medium'>Name</p>}
          >
            <Input placeholder='What should we call you?' />
          </FormItem>
          <FormItem
            control={control}
            name='email'
            label={<p className='font-medium'>Email</p>}
          >
            <Input placeholder='you@domain.com' />
          </FormItem>
          <FormItem
            control={control}
            name='phoneNumber'
            label={<p className='font-medium'>Phone Number</p>}
          >
            <Input
              type='tel'
              placeholder='0123456789'
              pattern='[0-9]*'
              onInput={event =>
                (event.target.value = event.target.value.replace(/[^0-9]/g, ''))
              }
            />
          </FormItem>
          <FormItem
            control={control}
            name='password'
            label={<p className='font-medium'>Password</p>}
          >
            <div>
              <Input.Password placeholder='........' />
              <p className='text-neutral-400 text-xs mt-2'>
                Must be at least 7 characters
              </p>
            </div>
          </FormItem>
          <Button
            className='w-full p-6 flex items-center justify-center'
            htmlType='submit'
            type='primary'
          >
            <span>Sign Up</span>
          </Button>
        </Form>
        <div className='text-center mt-4'>
          <span className='mr-3'>Already an member?</span>
          <Link to='/signin' className='text-amber-600'>
            Sign in now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
