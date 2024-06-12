import { Col, Flex, Form, Input, InputNumber, Row, Select, Slider } from 'antd'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { useGetPrioritiesQuery } from '../../redux/api/priority.service'
import {
  useCreateTaskMutation,
  useGetAllProjectsQuery
} from '../../redux/api/project.service'
import { useGetStatusQuery } from '../../redux/api/status.service'
import { useGetTaskTypesQuery } from '../../redux/api/tasktype.service'
import { closeDrawer } from '../../redux/reducer/drawer.slice'
import { setPriorityArr } from '../../redux/reducer/priority.slice'
import { setStatusArr } from '../../redux/reducer/status.slice'
import { setTaskTypeArr } from '../../redux/reducer/task.slice'
import DrawerTemplate from '../../template/DrawerTemplate'
import EditorForm from '../editor/EditorForm'
import { FormItem } from '../form/FormItem'

function CreateTask() {
  const [selectedItems, setSelectedItems] = useState([])
  const [projectID, setProjectID] = useState(null)
  const [projectMembers, setProjectMembers] = useState([])
  const [timeSpent, setTimeSpent] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)

  const { currentDrawer } = useSelector(state => state.drawer)
  const dispatch = useDispatch()

  //When currentDrawer is equal to 'createTask', the drawer will be open, see component/sidebar/SideBar.jsx dispatch
  // currentDrawer equal to 'createTask' when user click on 'Create Task' button
  const isOpen = currentDrawer === 'createTask'

  const { data: projects } = useGetAllProjectsQuery({}, { skip: !isOpen })
  const { data: priority } = useGetPrioritiesQuery()
  const { data: status } = useGetStatusQuery()
  const { data: taskType } = useGetTaskTypesQuery()
  const [createTask] = useCreateTaskMutation()

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0
    }
  })

  // set default value for select
  useEffect(() => {
    setValue('typeId', taskType?.content[0]?.id)
    setValue('priorityId', priority?.content[0]?.priorityId)
    setValue('statusId', status?.content[0]?.statusId)
  }, [taskType, priority, status, setValue])

  // set project members
  useEffect(() => {
    const selectedProject = projects?.content.find(project => project.id === projectID)
    selectedProject && setProjectMembers(selectedProject.members)
  }, [projectID, projects])

  //dispatch status, taskType and priority id to redux
  useEffect(() => {
    status && dispatch(setStatusArr(status?.content))
    priority && dispatch(setPriorityArr(priority?.content))
    taskType && dispatch(setTaskTypeArr(taskType?.content))
  }, [dispatch, status, priority, taskType])

  //Create task and close drawer when user submit form
  const onSubmit = data => {
    createTask(data)
    dispatch(closeDrawer())
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
        <FormItem control={control} name='taskName' label='Task Name'>
          <Input />
        </FormItem>
        <FormItem control={control} name='statusId' label='Status'>
          <Select
            options={status?.content.map(item => ({
              label: item.statusName,
              value: item.statusId
            }))}
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
        <FormItem control={control} name='typeId' label='Task type'>
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
              <InputNumber min={0} className='w-full' />
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
        <EditorForm control={control} name='description' label='Description' />
      </Form>
    </DrawerTemplate>
  )
}

export default CreateTask
