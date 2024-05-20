import { Breadcrumb, Input } from 'antd'

import CardBoard from '../components/CardBoard'

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
          rootClassName='w-44 bg-slate-100'
          prefix={<i className='fa fa-search'></i>}
        />
        <div className='flex -space-x-2 pl-8 pr-4'>
          <img
            className='inline-block h-8 w-8 rounded-full ring-2 ring-white hover:-translate-y-1 border border-amber-500 transition-transform duration-200'
            src='./img/download (1).jfif'
            alt='User1'
          />
          <img
            className='inline-block h-8 w-8 rounded-full ring-2 ring-white hover:-translate-y-1 border border-amber-500 transition-transform duration-200'
            src='./img/download (2).jfif'
            alt='User2'
          />
          <img
            className='inline-block h-8 w-8 rounded-full ring-2 ring-white hover:-translate-y-1 border border-amber-500 transition-transform duration-200'
            src='./img/download (3).jfif'
            alt='User3'
          />
        </div>
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
