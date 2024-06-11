import { Avatar, Card, Flex } from 'antd'
import { Draggable } from 'react-beautiful-dnd'

function TaskCard({ taskDetail, index, onClick }) {
  return (
    <Draggable
      key={taskDetail.taskId.toString()}
      draggableId={taskDetail.taskId.toString()}
      index={index}
    >
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
        >
          <Card className='my-3.5' hoverable size='small'>
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
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard
