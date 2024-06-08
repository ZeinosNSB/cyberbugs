import './TaskDetailModal.css'

import { DeleteOutlined, LinkOutlined, SendOutlined } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'
import {
  Avatar,
  Button,
  Col,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Slider,
  Space
} from 'antd'
import parse from 'html-react-parser'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  useRemoveTaskMutation,
  useUpdateTaskMutation
} from '../../store/api/project.service'

const iconTask = {
  1: 'fa fa-bug text-red-400',
  2: 'fa fa-bookmark text-green-500'
}

function TaskDetailModal({ open, setOpen, taskDetail, members, projectId }) {
  const [data, setData] = useState({
    typeId: null,
    taskId: null,
    taskName: null,
    projectId,
    statusId: null,
    priorityId: null,
    listUserAsign: [],
    originalEstimate: null,
    timeSpent: null,
    timeRemaining: null,
    description: '',
    originalDescription: ''
  })
  const [visibleEditor, setVisibleEditor] = useState(false)
  const [isDataChanged, setIsDataChanged] = useState(false)

  const { statusArr } = useSelector(state => state.status)
  const { priorityArr } = useSelector(state => state.priority)
  const { taskTypeArr } = useSelector(state => state.task)

  const [updateTask] = useUpdateTaskMutation()
  const [removeTask] = useRemoveTaskMutation()

  useEffect(() => {
    taskDetail &&
      setData({
        description: taskDetail?.description,
        listUserAsign: taskDetail?.assigness.map(item => item.id),
        originalEstimate: taskDetail?.originalEstimate,
        priorityId: taskDetail?.priorityId,
        projectId,
        statusId: taskDetail?.statusId,
        taskId: taskDetail?.taskId,
        taskName: taskDetail?.taskName,
        timeRemaining: taskDetail?.timeTrackingRemaining,
        timeSpent: taskDetail?.timeTrackingSpent,
        typeId: taskDetail?.taskTypeDetail?.id,
        originalDescription: taskDetail?.description
      })
  }, [taskDetail, projectId])

  const handleChange = (value, name) => {
    setData(prev => ({
      ...prev,
      [name]: value
    }))
    setIsDataChanged(true)
  }

  //call api updateTask after data changed
  useEffect(() => {
    if (isDataChanged) {
      updateTask(data)
      setIsDataChanged(false)
    }
  }, [data, updateTask, isDataChanged])

  return (
    <Modal
      title={
        <div className='flex justify-between items-center'>
          <div>
            <Select
              className='mr-2 w-10 text-center'
              value={data.typeId}
              options={taskTypeArr.map(item => ({
                label: <i className={iconTask[item.id]} />,
                value: item.id,
                desc: item.taskType
              }))}
              optionRender={option => (
                <Space>
                  <span role='img'>{option.data.label}</span>
                  {option.data.desc}
                </Space>
              )}
              onChange={value => handleChange(value, 'typeId')}
              suffixIcon={null}
              popupMatchSelectWidth={false}
            />
            {taskDetail?.taskName}
          </div>
          <div className='text-sm flex items-center'>
            <Button type='text' icon={<SendOutlined />}>
              Give feedback
            </Button>
            <Button type='text' icon={<LinkOutlined />}>
              Copy Link
            </Button>
            <Popconfirm
              title='Delete the task'
              description='Are you sure to delete this task, bro?'
              onConfirm={() => {
                removeTask(taskDetail?.taskId)
                setOpen(false)
              }}
              okText='Yes'
              okType='danger'
              cancelText='No'
              destroyTooltipOnHide={true}
            >
              <Button danger className='mr-6' type='text' icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        </div>
      }
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={1000}
      destroyOnClose
      footer={null}
    >
      <Row>
        <Col span={16}>
          <h4 className='font-bold mb-2'>Description</h4>
          <div className='mb-2'>
            {visibleEditor && (
              <>
                <Editor
                  apiKey='xioemkmdlxsadn0uku2zmyb2vvcvprt4x37wotzhaf6purql'
                  value={data.description}
                  onEditorChange={value => handleChange(value, 'description')}
                  init={{
                    height: '300',
                    width: '95%',
                    menubar: false,
                    initialValue: '',
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
                <Space className='my-4'>
                  <Button
                    type='primary'
                    onClick={() => {
                      setVisibleEditor(false)
                      setData({ ...data, originalDescription: data.description })
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    type='dashed'
                    onClick={() => {
                      setVisibleEditor(false)
                      setData({ ...data, description: data.originalDescription })
                    }}
                  >
                    Close
                  </Button>
                </Space>
              </>
            )}
            {!visibleEditor && (
              <div
                className='cursor-pointer'
                onClick={() => setVisibleEditor(!visibleEditor)}
              >
                {data.description === data.originalDescription
                  ? parse(data.originalDescription)
                  : parse(data.description)}
              </div>
            )}
          </div>
          <h4 className='font-bold mb-2'>Comment</h4>
        </Col>
        <Col span={8}>
          <div className='mb-4'>
            <p className='font-bold mb-1'>Status</p>
            <Select
              className='w-full'
              value={data.statusId}
              options={statusArr.map(item => ({
                label: item.statusName,
                value: item.statusId
              }))}
              onChange={value => handleChange(value, 'statusId')}
            />
          </div>

          <div className='mb-4'>
            <p className='font-bold mb-1'>Assignees</p>
            <Select
              className='w-full'
              mode='multiple'
              value={data.listUserAsign}
              onChange={value => handleChange(value, 'listUserAsign')}
              options={members.map(item => ({
                label: item.name,
                value: item.userId,
                avatar: item.avatar
              }))}
              optionRender={option => (
                <Space>
                  <Avatar src={option.data.avatar} />
                  {option.data.label}
                </Space>
              )}
            />
          </div>

          <div className='mb-4'>
            <p className='font-bold mb-1'>Priority</p>
            <Select
              className='w-full'
              value={data.priorityId}
              options={priorityArr.map(item => ({
                label: item.priority,
                value: item.priorityId
              }))}
              onChange={value => handleChange(value, 'priorityId')}
            />
          </div>

          <div className='mb-4'>
            <p className='font-bold mb-1'>Original Estimate</p>
            <InputNumber
              min={0}
              className='w-full'
              value={data.originalEstimate}
              onChange={value => handleChange(value, 'originalEstimate')}
            />
          </div>

          <div className='mb-4'>
            <p className='font-bold'>Time Tracking</p>
            <Slider
              value={Number(data.timeSpent)}
              max={Number(data.timeSpent) + Number(data.timeRemaining)}
            />
            <div className='flex justify-between'>
              <span>{data.timeSpent}h logged</span>
              <span>{data.timeRemaining}h remaining</span>
            </div>
          </div>

          <Row gutter={12}>
            <Col span={12}>
              <p className='font-bold mb-1'>Time Spent</p>
              <InputNumber
                min={0}
                className='w-full'
                value={data.timeSpent}
                onChange={value => handleChange(value, 'timeSpent')}
              />
            </Col>
            <Col span={12}>
              <p className='font-bold mb-1'>Time Remaining</p>
              <InputNumber
                min={0}
                className='w-full'
                value={data.timeRemaining}
                onChange={value => handleChange(value, 'timeRemaining')}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  )
}

export default TaskDetailModal
