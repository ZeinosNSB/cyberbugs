import { Avatar, Badge, Breadcrumb, Card, Col, Flex, Input, Row } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import TaskDetailModal from '../../components/modal/TaskDetailModal'
import {
  useGetProjectDetailQuery,
  useGetTaskDetailQuery
} from '../../store/api/project.service'

const { Ribbon } = Badge

const taskColorMap = {
  1: '#ccd5eb',
  2: '#fb923c',
  3: '#3399ff',
  4: '#90ee90'
}

function ProjectDetailBoard() {
  const [open, setOpen] = useState(false)
  const [taskID, setTaskID] = useState(null)
  const { projectID } = useParams()
  const { data: projectDetail } = useGetProjectDetailQuery(projectID)
  const { data: taskDetail } = useGetTaskDetailQuery(taskID, { skip: !open })

  return (
    <div>
      <Breadcrumb
        items={[
          { href: '', title: 'Project' },
          { href: '', title: 'CyberLearn' },
          { href: '/project-management', title: 'Project Management' },
          { title: projectDetail?.content?.projectName }
        ]}
      />
      <h1 className='text-2xl py-5'>{projectDetail?.content?.projectName}</h1>
      <div className='flex items-center pb-14'>
        <Input
          rootClassName='w-56 bg-slate-100'
          prefix={<i className='fa fa-search'></i>}
        />
        <Avatar.Group
          className='pl-12 pr-8'
          maxCount={2}
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf'
          }}
          size={35}
        >
          {projectDetail?.content.members.map(member => (
            <Avatar
              className='cursor-pointer hover:-translate-y-1.5 transition-transform duration-200'
              key={member.userId}
              src={member.avatar}
              size={35}
            />
          ))}
        </Avatar.Group>
        <div>
          <span className='mr-2 py-2 px-4 hover:bg-gray-100 hover:rounded-md cursor-pointer'>
            Only My Issues
          </span>
          <span className='py-2 px-4 hover:bg-gray-100 hover:rounded-md cursor-pointer'>
            Recently Updated
          </span>
        </div>
      </div>
      <Row gutter={16}>
        {projectDetail?.content?.lstTask.map(task => (
          <>
            <Col span={6} key={task.statusId}>
              <Ribbon
                text={task.lstTaskDeTail.length}
                color={taskColorMap[task.statusId]}
              >
                <Card
                  title={<span className='text-xs'>{task.statusName}</span>}
                  bordered={false}
                  className='bg-gray-100'
                  size='small'
                >
                  {task.lstTaskDeTail.map(taskDetail => (
                    <Card
                      key={taskDetail.taskId}
                      className='my-3.5'
                      hoverable
                      size='small'
                      onClick={() => {
                        setOpen(true)
                        setTaskID(taskDetail.taskId)
                      }}
                    >
                      <p className='py-2 font-bold'>{taskDetail.taskName}</p>
                      <Flex justify='space-between'>
                        <div>
                          {taskDetail.taskTypeDetail.id === 1 ? (
                            <i className='fa fa-bug mr-2 text-red-400' />
                          ) : (
                            <i className='fa fa-bookmark mr-2 text-green-500' />
                          )}
                          {taskDetail.priorityTask.priorityId === 1 ? (
                            <i className='fa fa-arrow-up text-red-500' />
                          ) : taskDetail.priorityTask.priorityId === 2 ? (
                            <i className='fa fa-arrow-up text-orange-400' />
                          ) : taskDetail.priorityTask.priorityId === 3 ? (
                            <i className='fa fa-arrow-down text-green-500' />
                          ) : taskDetail.priorityTask.priorityId === 4 ? (
                            <i className='fa fa-arrow-down text-green-300' />
                          ) : null}
                        </div>
                        <Avatar.Group
                          maxCount={2}
                          maxStyle={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                            fontSize: '13px'
                          }}
                          max={{
                            style: {
                              color: '#f56a00',
                              backgroundColor: '#fde3cf',
                              fontSize: '13px'
                            },
                            count: '2'
                          }}
                          size={25}
                        >
                          {taskDetail.assigness.map(member => (
                            <Avatar
                              className='cursor-pointer hover:-translate-y-1 transition-transform duration-200'
                              key={member.userId}
                              src={member.avatar}
                              size={25}
                            />
                          ))}
                        </Avatar.Group>
                      </Flex>
                    </Card>
                  ))}
                </Card>
              </Ribbon>
            </Col>
            <TaskDetailModal
              open={open}
              setOpen={setOpen}
              taskDetail={taskDetail?.content}
              members={projectDetail?.content?.members}
              projectId={projectID}
            />
          </>
        ))}
      </Row>
    </div>
  )
}

export default ProjectDetailBoard
