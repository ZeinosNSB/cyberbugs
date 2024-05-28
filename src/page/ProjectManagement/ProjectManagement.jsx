import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Space, Table, Tag } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import EditDrawer from '../../components/EditDrawer'
import {
  useGetAllProjectsQuery,
  useGetProjectDetailQuery
} from '../../store/api/project.service'
import { openDrawer } from '../../store/reducer/drawer.slice'
import { setProjectID } from '../../store/reducer/project.slice'

function ProjectManagement() {
  const [sortedInfo, setSortedInfo] = useState({})
  const { data, isFetching } = useGetAllProjectsQuery()
  const { projectID } = useSelector(state => state.project)
  const { data: projectDetail } = useGetProjectDetailQuery(projectID, {
    skip: !projectID
  })
  const dispatch = useDispatch()
  console.log(projectDetail)

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
          <Button danger icon={<DeleteOutlined />} />
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
        dataSource={data?.content}
        onChange={handleChange}
        loading={isFetching}
      />
      <EditDrawer projectDetail={projectDetail} />
    </>
  )
}

export default ProjectManagement
