import { Button, Form, Input, Select } from 'antd'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import EditorComponent from '../components/EditorComponent'
import { FormItem } from '../components/FormItem'
import { createProject, getProjectsPriority } from '../store/reducer/projectSlice'

function CreateProject() {
  const dispatch = useDispatch()
  const projectPriority = useSelector(state => state.project.projectsPriority)

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      projectName: '',
      description: '',
      categoryId: ''
    }
  })

  useEffect(() => {
    dispatch(getProjectsPriority())
  }, [dispatch])

  useEffect(() => {
    projectPriority.length > 0 && setValue('categoryId', projectPriority[0].id)
  }, [projectPriority, setValue])

  const onSubmit = async data => {
    try {
      const result = await dispatch(createProject(data)).unwrap()
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1 className='text-2xl py-5'>Create Project</h1>
      <Form name='create-pj-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
        <FormItem control={control} name='projectName' label='Name'>
          <Input />
        </FormItem>
        <EditorComponent control={control} name='description' label='Description' />
        <FormItem
          control={control}
          name='categoryId'
          label='Project Category'
          className='mt-3'
        >
          <Select
            placeholder={projectPriority[0]?.projectCategoryName}
            options={projectPriority.map(item => ({
              label: item.projectCategoryName,
              value: item.id
            }))}
          />
        </FormItem>
        <Button htmlType='submit' type='primary'>
          Create project
        </Button>
      </Form>
    </div>
  )
}

export default CreateProject
