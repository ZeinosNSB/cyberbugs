import { Avatar, Breadcrumb, Input } from 'antd'

import CardBoard from '../../components/CardBoard'

function CyberBoard() {
  return (
    <>
      <Breadcrumb
        items={[
          { href: '', title: 'Project' },
          { href: '', title: 'CyberLearn' },
          { title: 'Cyber Board' }
        ]}
      />
      <h1 className='text-2xl py-5'>Cyber Board</h1>
      <div className='flex items-center pb-14'>
        <Input
          rootClassName='w-56 bg-slate-100'
          prefix={<i className='fa fa-search'></i>}
        />
        <Avatar.Group className='pl-12 pr-8'>
          <Avatar
            className='cursor-pointer hover:-translate-y-1.5 transition-transform duration-200'
            src='./img/download (1).jfif'
            size={35}
          />
          <Avatar
            className='cursor-pointer hover:-translate-y-1.5 transition-transform duration-200'
            src='./img/download (2).jfif'
            size={35}
          />
          <Avatar
            className='cursor-pointer hover:-translate-y-1.5 transition-transform duration-200'
            src='./img/download (3).jfif'
            size={35}
          />
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
      <CardBoard />
    </>
  )
}

export default CyberBoard
