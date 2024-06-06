import './TaskDetailModal.css'

import { DeleteFilled, LinkOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Form, Input, InputNumber, Modal, Row, Slider } from 'antd'
import parse from 'html-react-parser'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormItem } from '../form/FormItem'

function TaskDetailModal({ open, setOpen, taskDetail }) {
  const [timeSpent, setTimeSpent] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0
    }
  })

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <Modal
      title={
        <Flex justify='space-between' align='center'>
          <span>
            {taskDetail?.taskTypeDetail?.id === 1 ? (
              <i className='fa fa-bookmark mr-2 text-green-500' />
            ) : (
              <i className='fa fa-bug mr-2 text-red-400' />
            )}
            {taskDetail?.taskName}
          </span>
          <div className='text-sm flex items-center'>
            <Button type='text' icon={<SendOutlined />}>
              Give feedback
            </Button>
            <Button type='text' icon={<LinkOutlined />}>
              Copy Link
            </Button>
            <Button className='mr-6' type='text' icon={<DeleteFilled />} />
          </div>
        </Flex>
      }
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      destroyOnClose={true}
    >
      <Row>
        <Col span={16}>
          <h4 className='font-bold'>Description</h4>
          <p>{taskDetail?.description && parse(taskDetail?.description)}</p>
        </Col>
        <Col span={8}>
          <Form name='task-detail' layout='vertical' onFinish={handleSubmit(onSubmit)}>
            <FormItem
              control={control}
              name='statusId'
              label={<span className='font-bold'>Status</span>}
            >
              <Input />
            </FormItem>
            <FormItem
              control={control}
              name='assigness'
              label={<span className='font-bold'>Assignees</span>}
            >
              <Input />
            </FormItem>
            <FormItem
              control={control}
              name='priorityId'
              label={<span className='font-bold'>Priority</span>}
            >
              <Input />
            </FormItem>
            <FormItem
              control={control}
              name='originalEstimate'
              label={<span className='font-bold'>Original Estimate</span>}
            >
              <InputNumber min={0} className='w-full' />
            </FormItem>
            <Form.Item label={<span className='font-bold'>Time Tracking</span>}>
              <Slider
                value={Number(timeSpent)}
                max={Number(timeSpent) + Number(timeRemaining)}
              />
              <Flex justify='space-between'>
                <span>{timeSpent}h logged</span>
                <span>{timeRemaining}h remaining</span>
              </Flex>
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}>
                <FormItem
                  control={control}
                  name='timeTrackingSpent'
                  label={<span className='font-bold'>Time spent</span>}
                >
                  <InputNumber
                    min={0}
                    className='w-full'
                    onChange={value => setTimeSpent(value)}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  control={control}
                  name='timeTrackingRemaining'
                  label={<span className='font-bold'>Time remaining</span>}
                >
                  <InputNumber
                    min={0}
                    className='w-full'
                    onChange={value => setTimeRemaining(value)}
                  />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}

export default TaskDetailModal
