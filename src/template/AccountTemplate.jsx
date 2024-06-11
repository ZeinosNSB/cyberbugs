import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const AccountTemplate = () => {
  const [size, setSize] = useState({
    width: Math.round(window.innerWidth),
    height: Math.round(window.innerHeight)
  })
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight)
      })
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <Row>
      <Col span={12}>
        <img
          src={`https://picsum.photos/${Math.round(size.width / 2)}/${Math.round(size.height)}`}
          alt='Login'
        />
      </Col>
      <Col span={12}>
        <Outlet />
      </Col>
    </Row>
  )
}

export default AccountTemplate
