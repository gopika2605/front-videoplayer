import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function Allvideo() {

  const navigate = useNavigate()

  const handleNavigate=()=>{
    navigate('/Nextpage')
    
  }

  return (
    <Row className='align-items-center'>
        <Col></Col>
        <Col lg={6}>
            <h1>Welcome video.com</h1>
            <p style={{textAlign:"justify"}}><b>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia id reiciendis quos eos minus quisquam unde nesciunt, impedit facilis quis officia dolorum quia,
                 ut, consequatur ipsam non pariatur fugiat ullam?</b></p>
            <button onClick={handleNavigate} className='btn btn-success'>Click here to know more!!!</button>
        </Col>
        <Col></Col>
        <Col lg={5}>
            <img width={'500px'} height={'500px'} src="https://www.nicepng.com/png/full/144-1444747_circle-clip-art-black-and-white-free-clipart.png" alt="" />
        </Col>
    </Row>
  )
}

export default Allvideo