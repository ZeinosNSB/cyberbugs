import { Form, Input } from 'antd'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { useEditUserMutation } from '../../redux/api/users.service'
import { closeDrawer } from '../../redux/reducer/drawer.slice'
import DrawerTemplate from '../../template/DrawerTemplate'
import { FormItem } from '../form/FormItem'

function EditUser() {
  const { currentDrawer } = useSelector(state => state.drawer)
  const { userDetail } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const { control, handleSubmit, setValue } = useForm()
  const [editUser] = useEditUserMutation()

  const isOpen = currentDrawer === 'editUser'

  useEffect(() => {
    if (userDetail) {
      setValue('id', userDetail.userId)
      setValue('name', userDetail.name)
      setValue('email', userDetail.email)
      setValue('phoneNumber', userDetail.phoneNumber)
    }
  }, [setValue, userDetail])

  const onSubmit = data => {
    editUser({ ...data, id: userDetail?.userId })
    dispatch(closeDrawer())
  }

  return (
    <div>
      <DrawerTemplate
        open={isOpen}
        title='Edit User'
        width={400}
        onSubmitCallback={handleSubmit(onSubmit)}
      >
        <Form name='edit-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
          <FormItem
            control={control}
            name='id'
            label={<p className='font-medium'>UserID</p>}
            disabled
          >
            <Input />
          </FormItem>
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
        </Form>
      </DrawerTemplate>
    </div>
  )
}

export default EditUser
