import { Badge, Card } from 'antd'
import { Droppable } from 'react-beautiful-dnd'

import TaskCard from './TaskCard'

const { Ribbon } = Badge

const taskColorMap = {
  1: '#ccd5eb',
  2: '#fb923c',
  3: '#3399ff',
  4: '#90ee90'
}

function TaskColumn({ task, setOpen, setTaskID }) {
  return (
    <Droppable droppableId={task.statusId} key={task.statusId}>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Ribbon text={task.lstTaskDeTail.length} color={taskColorMap[task.statusId]}>
            <Card
              title={<span className='text-xs'>{task.statusName}</span>}
              bordered={false}
              className='bg-gray-100'
              size='small'
            >
              {task.lstTaskDeTail.map((taskDetail, index) => (
                <TaskCard
                  key={taskDetail.taskId}
                  taskDetail={taskDetail}
                  index={index}
                  onClick={() => {
                    setOpen(true)
                    setTaskID(taskDetail.taskId)
                  }}
                />
              ))}
              {provided.placeholder}
            </Card>
          </Ribbon>
        </div>
      )}
    </Droppable>
  )
}

export default TaskColumn
