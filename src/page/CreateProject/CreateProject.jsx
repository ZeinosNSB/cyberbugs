import { Button, Form, Input, Select } from 'antd'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import EditorForm from '../../components/editor/EditorForm'
import { FormItem } from '../../components/form/FormItem'
import { useCreateProjectMutation } from '../../redux/api/project.service'
import { useGetProjectsCategoryQuery } from '../../redux/api/projectCategory.service'

function CreateProject() {
  const { data: projectCategory } = useGetProjectsCategoryQuery()
  const [createProject] = useCreateProjectMutation()
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      projectName: '',
      description: '',
      categoryId: ''
    }
  })

  useEffect(() => {
    projectCategory?.content && setValue('categoryId', projectCategory.content[0].id)
  }, [projectCategory, setValue])

  const onSubmit = value => {
    createProject(value)
    reset({
      projectName: '',
      description: '',
      categoryId: projectCategory.content[0].id
    })
  }

  return (
    <>
      <h1 className='text-2xl py-5'>Create Project</h1>
      <Form name='create-pj-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
        <FormItem control={control} name='projectName' label='Name'>
          <Input />
        </FormItem>
        <EditorForm control={control} name='description' label='Description' />
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
        <Button htmlType='submit' type='primary'>
          Create project
        </Button>
      </Form>
    </>
  )
}

export default CreateProject
