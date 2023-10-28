import React, { useState } from 'react'
import {Row,Col} from 'react-bootstrap'
import Category from '../components/Category'
import View from '../components/View'
import Add from '../components/Add'
import { Link } from 'react-router-dom'

function Nextpage() {
  const [serverRes,setServerRes] = useState([])
  const handleRes =(res)=>{
    setServerRes(res)
  }
  return (
    <>
    <h1 className='text-info ms-5 mb-5 ms-auto'>All Video cards   <Link to={'/watch-history'} style={{fontSize:'30px',textDecoration:'none'}}>Watch History</Link></h1>
   
    
    <div className='container-fluid'>
    <Row className='mt-5'>
      <Col lg={1}>
        <Add handleRes={handleRes}/>
        
      </Col>
      <Col lg={7} className='ms-5'>
        <View serverRes={serverRes}/>
      </Col>
      <Col>
        <Category />
      </Col>
      
      </Row>
    </div>
    
    </>
  )
}

export default Nextpage