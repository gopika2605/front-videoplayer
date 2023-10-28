import React, { useEffect, useState } from 'react'
import { getHistory } from '../sevices/allApi.js'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'

function Watchhistory() {
    const[history,setHistroy]= useState([])
    const getwatchHistory = async()=>{
        const {data} = await getHistory()
        setHistroy(data)
    }
    console.log(history);

    useEffect(()=>{
        getwatchHistory()
    },[])
  return (
   <>
   <h1>Watch History</h1>
   <Link to={'/Nextpage'} style={{textDecoration:'none'}}><ArrowLeft></ArrowLeft>Back</Link>
   <table className='table shadow m-3 rounded border'>
   <thead>
    <tr>
        <th>No</th>
        <th>Name</th>
        <th>URL</th>
        <th>Time</th>
    </tr>
   </thead>
   <tbody>
    {
        history?.map((item,index)=>(

        
        
    <tr>
        <td>{index+1}</td>
        <td>{item?.cardname}</td>
        <td>{item?.url}</td>
        <td>{item?.date}</td>
    </tr>
    ))
    }

   </tbody>
   </table>
   </>
  )
}

export default Watchhistory