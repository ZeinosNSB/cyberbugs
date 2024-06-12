import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { AutoComplete, Avatar, Button, Flex, Input, Popconfirm, Space, Table } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import EditUser from '../../components/drawer/EditUser'
import useDebounce from '../../hooks/useDebounce'
import { useDeleteUserMutation, useGetUserQuery } from '../../redux/api/users.service'
import { openDrawer } from '../../redux/reducer/drawer.slice'
import { setUserDetail } from '../../redux/reducer/user.slice'

function UserManagement() {
  const [userKeyword, setUserKeyword] = useState('')

  const dispatch = useDispatch()

  const debouncedSearchTerm = useDebounce(userKeyword, 1000)

  const { data: userList, isFetching } = useGetUserQuery(debouncedSearchTerm)
  const [deleteUser] = useDeleteUserMutation()

  const columns = [
    {
      width: '10%',
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => (
        <NavLink to={`/cyberbugs/${record.id}`} className='text-blue-400'>
          {text}
        </NavLink>
      )
    },
    {
      width: '25%',
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      width: '19%',
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      width: '10%',
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Button
            type='text'
            icon={<EditOutlined />}
            onClick={() => {
              dispatch(openDrawer('editUser'))
              dispatch(setUserDetail(record))
            }}
          />
          <Popconfirm
            title='Delete the user'
            description='Are you sure to delete this user, bro?'
            onConfirm={() => {
              deleteUser(record.userId)
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
      <p className='text-2xl py-5 text-left'>User Management</p>
      <div className='py-5 mb-2'>
        <AutoComplete
          className='w-full'
          popupMatchSelectWidth='100%'
          onChange={value => setUserKeyword(value)}
          options={userList?.content.map(user => ({
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
        >
          <Input.Search size='large' placeholder='Search user here, bro!!' enterButton />
        </AutoComplete>
      </div>
      <Table
        columns={columns}
        dataSource={userList?.content}
        // onChange={handleChange}
        loading={isFetching}
      />
      <EditUser />
    </>
  )
}

export default UserManagement
