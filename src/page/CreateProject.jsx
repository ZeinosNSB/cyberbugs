import { Button, Form, Input } from 'antd'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'

import EditorComponent from '../components/EditorComponent'
import { FormItem } from '../components/FormItem'

function CreateProject() {
  const { control, handleSubmit } = useForm()
  const editorRef = useRef(null)
  const onSubmit = data => {
    console.log(data)
  }
  return (
    <div>
      <h1 className='text-2xl py-5'>Create Project</h1>
      <Form name='create-pj-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
        <FormItem control={control} name='name' label='Name'>
          <Input />
        </FormItem>
        <FormItem control={control} name='desciption' label='Desciption'>
          <Input />
        </FormItem>
        <Controller
          name='editor'
          control={control}
          defaultValue=''
          render={({ field: { onChange } }) => (
            <EditorComponent
              // onInit={(_evt, editor) => {
              //   editorRef.current = editor
              //   editor.on('Change', () => {
              //     field.onChange(editor.getContent())
              //   })
              // }}
              onEditorChange={value => {
                onChange(value)
              }}
              initialValue='<p>Ronaldo Number One.</p>'
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist',
                  'anchor',
                  'autolink',
                  'help',
                  'image',
                  'link',
                  'lists',
                  'searchreplace',
                  'table',
                  'wordcount'
                ],
                toolbar:
                  'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                license_key: 'gpl'
              }}
            />
          )}
        />
        <Button htmlType='submit' type='primary' className='my-7'>
          Create project
        </Button>
      </Form>
    </div>
  )
}

export default CreateProject
