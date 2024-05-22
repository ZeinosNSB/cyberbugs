import { Button, Space, Table } from 'antd'
import { useState } from 'react'

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sydney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  }
]

function ProjectManagement() {
  const [sortedInfo, setSortedInfo] = useState({})
  const handleChange = sorter => {
    setSortedInfo(sorter)
  }
  const clearAll = () => {
    setSortedInfo({})
  }
  const setAgeSort = () => {
    setSortedInfo({})
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'project_name'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: text => <a>{text}</a>
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
        <Button onClick={setAgeSort} type=''>
          Sort age
        </Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>

      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  )
}

export default ProjectManagement
