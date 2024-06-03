import { Col, Flex, Form, Input, InputNumber, Row, Select, Slider } from 'antd'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { useGetPrioritiesQuery } from '../store/api/priority.service'
import { useGetAllProjectsQuery } from '../store/api/project.service'
import { useGetTaskTypesQuery } from '../store/api/tasktype.service'
import DrawerTemplate from '../template/DrawerTemplate'
import EditorComponent from './EditorComponent'
import { FormItem } from './FormItem'

function CreateTaskDrawer() {
  const [selectedItems, setSelectedItems] = useState([])
  const [projectID, setProjectID] = useState(null)
  const [projectMembers, setProjectMembers] = useState([])
  const [timeSpent, setTimeSpent] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const { currentDrawer } = useSelector(state => state.drawer)
  const location = useLocation()
  const { data: projects } = useGetAllProjectsQuery()
  const { data: priority } = useGetPrioritiesQuery()
  // const { data: status } = useGetStatusQuery()
  const { data: taskType } = useGetTaskTypesQuery()
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      projectId: '',
      priorityId: '',
      taskId: '',
      originalEstimate: '',
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      listUserAsign: [],
      description: ''
    }
  })
  console.log(projectMembers)

  const isOpen = location.pathname.startsWith('/cyberbugs')
    ? currentDrawer === 'createTask'
    : false

  useEffect(() => {
    setValue('taskId', taskType?.content[0]?.id)
    setValue('priorityId', priority?.content[0]?.priorityId)
  }, [taskType, priority, setValue])

  useEffect(() => {
    const selectedProject = projects?.content.find(project => project.id === projectID)
    selectedProject && setProjectMembers(selectedProject.members)
  }, [projectID, projects])

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <DrawerTemplate
      placement='left'
      title='Create Task'
      open={isOpen}
      onSubmitCallback={handleSubmit(onSubmit)}
    >
      <Form name='create-task-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
        <FormItem control={control} name='projectId' label='Project Name'>
          <Select
            options={projects?.content.map(item => ({
              label: item.projectName,
              value: item.id
            }))}
            onSelect={value => setProjectID(value)}
          />
        </FormItem>
        <FormItem control={control} name='priorityId' label='Priority'>
          <Select
            options={priority?.content.map(item => ({
              label: item.priority,
              value: item.priorityId
            }))}
          />
        </FormItem>
        <FormItem control={control} name='taskId' label='Task type'>
          <Select
            options={taskType?.content.map(item => ({
              label: item.taskType,
              value: item.id
            }))}
          />
        </FormItem>
        <Form.Item label='Time Tracking'>
          <Slider
            value={Number(timeSpent)}
            max={Number(timeSpent) + Number(timeRemaining)}
          />
          <Flex justify='space-between' className='font-bold'>
            <span>{timeSpent}h logged</span>
            <span>{timeRemaining}h remaining</span>
          </Flex>
        </Form.Item>
        <Row gutter={12}>
          <Col span={6}>
            <FormItem control={control} name='timeTrackingSpent' label='Time spent'>
              <InputNumber
                min={0}
                className='w-full'
                onChange={value => setTimeSpent(value)}
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              control={control}
              name='timeTrackingRemaining'
              label='Time remaining'
            >
              <InputNumber
                min={0}
                className='w-full'
                onChange={value => setTimeRemaining(value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem control={control} name='originalEstimate' label='Original Estimate'>
              <Input />
            </FormItem>
          </Col>
        </Row>
        <FormItem control={control} name='listUserAsign' label='Assignees'>
          <Select
            mode='multiple'
            placeholder='Inserted are removed'
            value={selectedItems}
            onChange={setSelectedItems}
            style={{
              width: '100%'
            }}
            options={projectMembers.map(item => ({
              value: item.userId,
              label: item.name
            }))}
          />
        </FormItem>
        <EditorComponent control={control} name='description' label='Description' />
      </Form>
    </DrawerTemplate>
  )
}

export default CreateTaskDrawer
