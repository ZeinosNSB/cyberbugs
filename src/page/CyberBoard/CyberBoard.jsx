import { Avatar, Badge, Breadcrumb, Card, Col, Input, Row } from 'antd'

const { Ribbon } = Badge

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
      <Row gutter={16}>
        <Col span={6}>
          <Ribbon text='0' color='#ccd5eb'>
            <Card
              title={<span className='text-xs'>BACKLOG</span>}
              bordered={false}
              className='bg-gray-100'
              size='small'
            ></Card>
          </Ribbon>
        </Col>
        <Col span={6}>
          <Ribbon text='0' color='#fb923c'>
            <Card
              title={<span className='text-xs'>SELECTED FOR DEVELOPMENT</span>}
              bordered={false}
              className='bg-gray-100'
              size='small'
            ></Card>
          </Ribbon>
        </Col>
        <Col span={6}>
          <Ribbon text='0' color='#3399ff'>
            <Card
              title={<span className='text-xs'>IN PROGRESS</span>}
              bordered={false}
              className='bg-gray-100'
              size='small'
            ></Card>
          </Ribbon>
        </Col>
        <Col span={6}>
          <Ribbon text='0' color='#90ee90'>
            <Card
              title={<span className='text-xs'>DONE</span>}
              bordered={false}
              className='bg-gray-100'
              size='small'
            ></Card>
          </Ribbon>
        </Col>
      </Row>
    </>
  )
}

export default CyberBoard
