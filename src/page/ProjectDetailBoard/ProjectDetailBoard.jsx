import { Avatar, Badge, Breadcrumb, Card, Col, Input, Row } from 'antd'
import { useParams } from 'react-router-dom'

import { useGetProjectDetailQuery } from '../../store/api/project.service'

const { Ribbon } = Badge

const taskColorMap = {
  1: '#ccd5eb',
  2: '#fb923c',
  3: '#3399ff',
  4: '#90ee90'
}

function ProjectDetailBoard() {
  const { projectID } = useParams()
  const { data: projectDetail } = useGetProjectDetailQuery(projectID)

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
          <Col span={6} key={task.statusId}>
            <Ribbon text={task.lstTaskDeTail.length} color={taskColorMap[task.statusId]}>
              <Card
                title={<span className='text-xs'>{task.statusName}</span>}
                bordered={false}
                className='bg-gray-100'
                size='small'
              >
                <Card hoverable size='small' className='mb-3'>
                  Content
                </Card>
              </Card>
            </Ribbon>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProjectDetailBoard
