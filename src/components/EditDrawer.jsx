import { Form, Input, Select } from 'antd'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import {
  useGetProjectDetailQuery,
  useUpdateProjectMutation
} from '../store/api/project.service'
import { useGetProjectsCategoryQuery } from '../store/api/projectCategory.service'
import { closeDrawer } from '../store/reducer/drawer.slice'
import DrawerTemplate from '../template/DrawerTemplate'
import EditorComponent from './EditorComponent'
import { FormItem } from './FormItem'

function EditDrawer() {
  const { control, handleSubmit, setValue } = useForm()
  const { data: projectCategory } = useGetProjectsCategoryQuery()
  const [updateProject] = useUpdateProjectMutation()
  const { projectID } = useSelector(state => state.project)
  const { data: projectDetail } = useGetProjectDetailQuery(projectID, {
    skip: !projectID
  })
  const dispatch = useDispatch()

  const onSubmit = data => {
    updateProject({ id: projectID, data: data })
    dispatch(closeDrawer())
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
        <FormItem control={control} name='projectID' label='Project ID' disabled>
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
