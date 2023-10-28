import React,{useEffect, useState} from 'react'
import { Row,Col } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getVideo } from '../sevices/allApi'

function View({serverRes}) {

  const [deleteStatus,setDeleteStatus] = useState(false)
  const handleDeleteStatus = (res)=>{
    setDeleteStatus(res)
  }
  const [allVideos,setallvideos] = useState([])

  const getallVideos = async()=>{
     const response =await getVideo()
     setallvideos(response.data);
  }
  console.log(allVideos);
  useEffect(() => {
    getallVideos()
  
    
  },[serverRes,deleteStatus])
  
  return (
    
    <div className='border p-3 rounded'>
        <Row>
          {
            allVideos.map(video=>(
            <Col className='ps-3 mb-3' s={12} md={6}>
                <VideoCard card={video} handleDeleteStatus={handleDeleteStatus}/>
            </Col>
            ))
          }
        </Row>

    </div>
    
  )
}

export default View