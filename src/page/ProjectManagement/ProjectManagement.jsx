import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons'
import {
  AutoComplete,
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Popconfirm,
  Popover,
  Row,
  Space,
  Table,
  Tag
} from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import EditDrawer from '../../components/EditDrawer'
import useDebounce from '../../hooks/useDebounce'
import {
  useAssignUserProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useRemoveUserFromProjectMutation
} from '../../store/api/project.service'
import { useGetUserQuery } from '../../store/api/users.service'
import { openDrawer } from '../../store/reducer/drawer.slice'
import { setProjectID } from '../../store/reducer/project.slice'

function ProjectManagement() {
  const dispatch = useDispatch()
  const [sortedInfo, setSortedInfo] = useState({})
  const [userKeyword, setUserKeyword] = useState('')
  const debouncedSearchTerm = useDebounce(userKeyword, 1000)
  const { data: projectList, isFetching } = useGetAllProjectsQuery()
  const { data: user } = useGetUserQuery(debouncedSearchTerm)
  const [deleteProject] = useDeleteProjectMutation()
  const [assignUserProject] = useAssignUserProjectMutation()
  const [removeUserFromProject] = useRemoveUserFromProjectMutation()

  const handleChange = sorter => {
    setSortedInfo(sorter)
  }

  const clearAll = () => {
    setSortedInfo({})
  }

  const setIDSort = () => {
    setSortedInfo({
      columnKey: 'id',
      order: 'descend'
    })
  }

  const handleClick = id => {
    dispatch(openDrawer())
    dispatch(setProjectID(id))
  }

  const handleDeleteProject = id => {
    deleteProject(id)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName'
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName'
    },
    {
      title: 'Creator',
      key: 'creator',
      render: record => {
        return <Tag color='cyan'>{record.creator?.name}</Tag>
      }
    },
    {
      title: 'Members',
      key: 'members',
      render: record => {
        return (
          <Flex align='center' justify='space-between'>
            <Avatar.Group
              maxCount={2}
              maxStyle={{
                color: '#f56a00',
                backgroundColor: '#fde3cf'
              }}
            >
              {record?.members.map(member => (
                <Popover
                  overlayClassName='w-80'
                  key={member.id}
                  content={
                    <Row className='text-center items-center'>
                      <Col span={4}>
                        <Avatar src={member.avatar} />
                      </Col>
                      <Col span={16} className='text-left pl-4'>
                        <span className='font-bold'>{`Name: ${member.name}`}</span>
                        <p>{`ID: ${member.userId}`}</p>
                      </Col>
                      <Col span={4} className='flex items-center'>
                        <Divider type='vertical' />
                        <Button
                          icon={<DeleteOutlined />}
                          type='link'
                          onClick={() => {
                            removeUserFromProject({
                              projectId: record.id,
                              userId: member.userId
                            })
                          }}
                        />
                      </Col>
                    </Row>
                  }
                  destroyTooltipOnHide={true}
                >
                  <Avatar className='cursor-pointer' src={member.avatar} />
                </Popover>
              ))}
            </Avatar.Group>
            <Popover
              overlayClassName='w-72'
              content={
                <AutoComplete
                  className='w-full'
                  onChange={value => {
                    setUserKeyword(value)
                  }}
                  options={user?.content.map(user => ({
                    label: (
                      <Flex justify='space-between'>
                        <span>{user.name}</span>
                        <Avatar src={user.avatar} />
                      </Flex>
                    ),
                    value: user.userId.toString(),
                    user
                  }))}
                  value={userKeyword}
                  onSelect={(value, option) => {
                    setUserKeyword(option.user.name)
                    assignUserProject({
                      projectId: record.id,
                      userId: option.user.userId
                    })
                    setTimeout(() => setUserKeyword(''), 0)
                  }}
                />
              }
              title='Add User'
              trigger='click'
              destroyTooltipOnHide={true}
            >
              <Button
                shape='circle'
                icon={<UserAddOutlined className='text-amber-600' />}
              />
            </Popover>
          </Flex>
        )
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Button
            type='text'
            icon={<EditOutlined />}
            onClick={() => handleClick(record.id)}
          />
          <Popconfirm
            title='Delete the task'
            description='Are you sure to delete this project, bro?'
            onConfirm={() => {
              handleDeleteProject(record.id)
            }}
            okText='Yes'
            okType='danger'
            cancelText='No'
            destroyTooltipOnHide={true}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <>
      <h1 className='text-2xl py-5'>Project Management</h1>
      <Space
        style={{
          marginBottom: 16
        }}
      >
        <Button onClick={setIDSort} type=''>
          Sort ID
        </Button>
        <Button onClick={clearAll}>Clear sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={projectList?.content}
        onChange={handleChange}
        loading={isFetching}
      />
      <EditDrawer />
    </>
  )
}

export default ProjectManagement
