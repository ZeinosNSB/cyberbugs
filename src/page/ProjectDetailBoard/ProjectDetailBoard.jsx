import { Avatar, Breadcrumb, Input } from 'antd'
import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'

import TaskDetail from '../../components/modal/TaskDetail'
import {
  useGetProjectDetailQuery,
  useGetTaskDetailQuery,
  useUpdateStatusMutation
} from '../../redux/api/project.service'
import TaskColumn from './TaskColumn'

function ProjectDetailBoard() {
  const [open, setOpen] = useState(false)
  const [taskID, setTaskID] = useState(null)

  const { projectID } = useParams()

  const { data: projectDetail } = useGetProjectDetailQuery(projectID)
  const { data: taskDetail } = useGetTaskDetailQuery(taskID, { skip: !open })
  const [updateStatus] = useUpdateStatusMutation()

  // Handle drag and drop task
  const handeDragEnd = result => {
    let { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    updateStatus({ taskId: draggableId, statusId: destination.droppableId })
  }

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

      {/*// Drag and drop task board*/}
      <div className='grid grid-cols-4 gap-6'>
        <DragDropContext onDragEnd={handeDragEnd}>
          {projectDetail?.content?.lstTask.map(task => (
            <TaskColumn
              key={task.statusId}
              task={task}
              setOpen={setOpen}
              setTaskID={setTaskID}
            />
          ))}
        </DragDropContext>
      </div>

      {open && (
        <TaskDetail
          open={open}
          setOpen={setOpen}
          taskDetail={taskDetail?.content}
          members={projectDetail?.content?.members}
          projectId={projectID}
        />
      )}
    </div>
  )
}

export default ProjectDetailBoard
