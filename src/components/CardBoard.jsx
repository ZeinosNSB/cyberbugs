import { Badge, Card, Col, Row } from 'antd'

const { Ribbon } = Badge

function CardBoard() {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Ribbon text='3' color='#ccd5eb'>
          <Card
            title={<span className='text-xs'>BACKLOG</span>}
            bordered={false}
            className='bg-gray-100'
            size='small'
          >
            <Card hoverable size='small'>
              Content
            </Card>
          </Card>
        </Ribbon>
      </Col>
      <Col span={6}>
        <Ribbon text='2' color='#fb923c'>
          <Card
            title={<span className='text-xs'>SELECTED FOR DEVELOPMENT</span>}
            bordered={false}
            className='bg-gray-100'
            size='small'
          >
            <Card hoverable size='small'>
              Content
            </Card>
          </Card>
        </Ribbon>
      </Col>
      <Col span={6}>
        <Ribbon text='2' color='#3399ff'>
          <Card
            title={<span className='text-xs'>IN PROGRESS</span>}
            bordered={false}
            className='bg-gray-100'
            size='small'
          >
            <Card hoverable size='small'>
              Content
            </Card>
          </Card>
        </Ribbon>
      </Col>
      <Col span={6}>
        <Ribbon text='1' color='#90ee90'>
          <Card
            title={<span className='text-xs'>DONE</span>}
            bordered={false}
            className='bg-gray-100'
            size='small'
          >
            <Card hoverable size='small'>
              Content
            </Card>
          </Card>
        </Ribbon>
      </Col>
    </Row>
  )
}

export default CardBoard
