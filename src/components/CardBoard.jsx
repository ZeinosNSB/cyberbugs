import { Card, Col, Row } from 'antd'

function CardBoard() {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card
          hoverable
          className={`bg-gray-100 before:content-['2'] before:text-center before:block before:-translate-y-2.5 before:translate-x-6  before:w-10 before:h-6 before:bg-blue-400 before:rounded-full`}
          title={<span className='text-xs'>SELECTED FOR DEVELOPMENT</span>}
          bordered={false}
        ></Card>
      </Col>
      <Col span={6}>
        <Card
          hoverable
          className='bg-gray-100 before:content-["2"] before:text-center before:block before:-translate-y-2.5 before:translate-x-6  before:w-10 before:h-6 before:bg-blue-400 before:rounded-full'
          title={<span className='text-xs'>SELECTED FOR DEVELOPMENT</span>}
          bordered={false}
        ></Card>
      </Col>
      <Col span={6}>
        <Card
          hoverable
          className='bg-gray-100 before:content-["1"] before:text-center before:block before:-translate-y-2.5 before:translate-x-6  before:w-10 before:h-6 before:bg-amber-400 before:rounded-full'
          title={<span className='text-xs'>IN PROGRESS</span>}
          bordered={false}
        ></Card>
      </Col>
      <Col span={6}>
        <Card
          hoverable
          className='bg-gray-100 before:content-["1"] before:text-center before:block before:-translate-y-2.5 before:translate-x-6  before:w-10 before:h-6 before:bg-green-400 before:rounded-full'
          title={<span className='text-xs'>DONE</span>}
          bordered={false}
        ></Card>
      </Col>
    </Row>
  )
}

export default CardBoard
