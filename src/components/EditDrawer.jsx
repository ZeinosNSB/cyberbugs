import { Form, Input, Select } from 'antd'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useGetProjectsCategoryQuery } from '../store/api/projectCategory.service'
import DrawerTemplate from '../template/DrawerTemplate'
import EditorComponent from './EditorComponent'
import { FormItem } from './FormItem'

function EditDrawer({ projectDetail }) {
  const { control, handleSubmit, setValue } = useForm()
  const { data: projectCategory } = useGetProjectsCategoryQuery()

  const onSubmit = data => {
    console.log(data)
  }
  useEffect(() => {
    if (projectDetail) {
      setValue('projectID', projectDetail?.content?.id)
      setValue('projectName', projectDetail?.content?.projectName)
      setValue('categoryId', projectDetail?.content?.projectCategory?.id)
      setValue('description', projectDetail?.content?.description)
    }
  }, [projectDetail, setValue])

  return (
    <DrawerTemplate onSubmitCallback={handleSubmit(onSubmit)}>
      <Form name='create-pj-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
        <FormItem control={control} name='projectID' label='Project ID'>
          <Input />
        </FormItem>
        <FormItem control={control} name='projectName' label='Name'>
          <Input />
        </FormItem>
        <FormItem
          control={control}
          name='categoryId'
          label='Project Category'
          className='mt-3'
        >
          <Select
            options={projectCategory?.content.map(item => ({
              label: item.projectCategoryName,
              value: item.id
            }))}
          />
        </FormItem>
        <EditorComponent control={control} name='description' label='Description' />
      </Form>
    </DrawerTemplate>
  )
}

export default EditDrawer
