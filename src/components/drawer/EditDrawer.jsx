import { Form, Input, Select } from 'antd'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { useUpdateProjectMutation } from '../../store/api/project.service'
import { useGetProjectsCategoryQuery } from '../../store/api/projectCategory.service'
import { closeDrawer } from '../../store/reducer/drawer.slice'
import DrawerTemplate from '../../template/DrawerTemplate'
import EditorComponent from '../editor/EditorComponent'
import { FormItem } from '../form/FormItem'

function EditDrawer({ projectDetail }) {
  const { currentDrawer } = useSelector(state => state.drawer)
  const dispatch = useDispatch()
  const { control, handleSubmit, setValue } = useForm()
  const { data: projectCategory } = useGetProjectsCategoryQuery()
  const [updateProject] = useUpdateProjectMutation()

  const isOpen = currentDrawer === 'editProject'

  const onSubmit = data => {
    updateProject({ id: projectDetail?.id, data: data })
    dispatch(closeDrawer())
  }

  useEffect(() => {
    if (projectDetail) {
      setValue('projectID', projectDetail?.id)
      setValue('projectName', projectDetail?.projectName)
      setValue('categoryId', projectDetail?.categoryId)
      setValue('description', projectDetail?.description)
    }
  }, [projectDetail, setValue])

  return (
    <DrawerTemplate
      open={isOpen}
      title='Edit Project'
      onSubmitCallback={handleSubmit(onSubmit)}
    >
      <Form name='edit-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
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