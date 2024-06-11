import './TaskDetail.css'

import { DeleteOutlined, LinkOutlined, SendOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  Col,
  Input,
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
  useDeleteCommentMutation,
  useGetAllCommentsQuery,
  useInsertCommentMutation,
  useUpdateCommentMutation
} from '../../../redux/api/comment.service'
import {
  useRemoveTaskMutation,
  useUpdateTaskMutation
} from '../../../redux/api/project.service'
import { USER_LOGIN } from '../../../utils/settingSystems'
import EditorCustom from '../../editor/EditorCustom'

const iconTask = {
  1: 'fa fa-bug text-red-400',
  2: 'fa fa-bookmark text-green-500'
}

function TaskDetail({ open, setOpen, taskDetail, members, projectId }) {
  const [data, setData] = useState({
    typeId: null,
    taskId: null,
    taskName: null,
    projectId,
    statusId: null,
    priorityId: null,
    listUserAsign: [],
    originalEstimate: null,
    timeTrackingSpent: null,
    timeTrackingRemaining: null,
    description: '',
    originalDescription: ''
  })
  const [visibleEditorDescription, setVisibleEditorDescription] = useState(false)
  const [visibleInsertComment, setVisibleInsertComment] = useState(false)
  const [visibleEditorCommentId, setVisibleEditorCommentId] = useState(null)
  const [isDataChanged, setIsDataChanged] = useState(false)
  const [addComment, setAddComment] = useState('')
  const [editComment, setEditComment] = useState('')

  const { statusArr } = useSelector(state => state.status)
  const { priorityArr } = useSelector(state => state.priority)
  const { taskTypeArr } = useSelector(state => state.task)

  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const { data: allComments } = useGetAllCommentsQuery(taskDetail?.taskId, {
    skip: !taskDetail
  })
  const [insertComment] = useInsertCommentMutation()
  const [updateComment] = useUpdateCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()

  //set initial data after get taskDetail (call api)
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
        timeTrackingRemaining: taskDetail?.timeTrackingRemaining,
        timeTrackingSpent: taskDetail?.timeTrackingSpent,
        typeId: taskDetail?.taskTypeDetail?.id,
        originalDescription: taskDetail?.description
      })
  }, [taskDetail, projectId])

  //set new data when change value in form
  const handleChange = (value, name) => {
    setData(prev => ({
      ...prev,
      [name]: value
    }))
    setIsDataChanged(true)
  }

  //close modal and update task
  const handleCloseModal = () => {
    setOpen(false)
    setVisibleEditorDescription(false)
    if (isDataChanged) {
      updateTask(data)
      setIsDataChanged(false)
    }
  }

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
      onCancel={handleCloseModal}
      width={1000}
      destroyOnClose
      footer={null}
    >
      <Row>
        {/* Description and Comment */}
        <Col span={16}>
          {/* Description */}
          <h4 className='font-bold mb-2'>Description</h4>
          <div className='mb-2'>
            {visibleEditorDescription && (
              <>
                <EditorCustom
                  data={data.description}
                  handleChange={handleChange}
                  name='description'
                />
                <Space className='my-4'>
                  <Button
                    type='primary'
                    onClick={() => {
                      setVisibleEditorDescription(false)
                      setData({ ...data, originalDescription: data.description })
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    type='dashed'
                    onClick={() => {
                      setVisibleEditorDescription(false)
                      setData({ ...data, description: data.originalDescription })
                    }}
                  >
                    Close
                  </Button>
                </Space>
              </>
            )}
            {!visibleEditorDescription && (
              <div
                className='cursor-pointer'
                onClick={() => setVisibleEditorDescription(true)}
              >
                {data.description === data.originalDescription
                  ? parse(data.originalDescription)
                  : parse(data.description)}
              </div>
            )}
          </div>
          {/* Comment */}
          <h4 className='font-bold mb-2'>Comment</h4>
          {/*Insert Comment*/}
          <div className='flex gap-4 my-4'>
            <Avatar
              style={{ width: '32px', height: '32px', objectFit: 'cover' }}
              src={JSON.parse(localStorage.getItem(USER_LOGIN))?.avatar}
            />
            {visibleInsertComment && (
              <div className='w-full'>
                <EditorCustom
                  data={addComment}
                  handleChange={value => setAddComment(value)}
                  name='contentComment'
                />{' '}
                <Space className='mt-3'>
                  <Button
                    type='primary'
                    onClick={() => {
                      insertComment({
                        contentComment: addComment,
                        taskId: taskDetail.taskId
                      })
                      setVisibleInsertComment(false)
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    type='text'
                    onClick={() => {
                      setVisibleInsertComment(false)
                      setAddComment('')
                    }}
                  >
                    Cancel
                  </Button>
                </Space>
              </div>
            )}
            {!visibleInsertComment && (
              <Input
                rootClassName='w-5/6'
                placeholder='Add a comment...'
                onClick={() => setVisibleInsertComment(true)}
              />
            )}
          </div>
          {/*Edit and Delete Comment*/}
          {allComments?.content.map(comment => (
            <div className='flex gap-4 my-4' key={comment?.id}>
              <Avatar src={comment?.user?.avatar} />
              {visibleEditorCommentId === comment.id && (
                <div className='w-full'>
                  <EditorCustom
                    data={editComment}
                    handleChange={value => setEditComment(value)}
                    name='contentComment'
                  />
                  <Space className='mt-3'>
                    <Button
                      type='primary'
                      onClick={() => {
                        setVisibleEditorCommentId(null)
                        editComment !== comment?.contentComment &&
                          updateComment({
                            id: comment.id,
                            comment: editComment
                          })
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      type='text'
                      onClick={() => {
                        setVisibleEditorCommentId(null)
                      }}
                    >
                      Cancel
                    </Button>
                  </Space>
                </div>
              )}
              {visibleEditorCommentId !== comment.id && (
                <div>
                  <p className='font-bold'>{comment?.user?.name}</p>
                  <div>{parse(comment?.contentComment)}</div>
                  <div className='flex text-xs text-neutral-400 cursor-pointer mt-3'>
                    <p
                      className='pr-3 hover:text-neutral-700'
                      onClick={() => {
                        setVisibleEditorCommentId(comment?.id)
                        setEditComment(comment?.contentComment)
                      }}
                    >
                      Edit
                    </p>
                    <Popconfirm
                      title='Delete the comment'
                      description='Are you sure to delete this comment, bro?'
                      onConfirm={() => {
                        deleteComment(comment?.id)
                      }}
                      okText='Yes'
                      okType='danger'
                      cancelText='No'
                      destroyTooltipOnHide={true}
                    >
                      <p className='hover:text-neutral-700'>Delete</p>
                    </Popconfirm>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Col>

        {/* Status, Assignees, Priority, Original Estimate, Time Tracking */}
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
              value={Number(data.timeTrackingSpent)}
              max={Number(data.timeTrackingSpent) + Number(data.timeTrackingRemaining)}
            />
            <div className='flex justify-between'>
              <span>{data.timeTrackingSpent}h logged</span>
              <span>{data.timeTrackingRemaining}h remaining</span>
            </div>
          </div>

          <Row gutter={12}>
            <Col span={12}>
              <p className='font-bold mb-1'>Time Spent</p>
              <InputNumber
                min={0}
                className='w-full'
                value={data.timeTrackingSpent}
                onChange={value => handleChange(value, 'timeTrackingSpent')}
              />
            </Col>
            <Col span={12}>
              <p className='font-bold mb-1'>Time Remaining</p>
              <InputNumber
                min={0}
                className='w-full'
                value={data.timeTrackingRemaining}
                onChange={value => handleChange(value, 'timeTrackingRemaining')}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  )
}

export default TaskDetail
