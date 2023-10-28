import React from 'react'
import Card from 'react-bootstrap/Card';
import { Trash2 } from 'react-feather';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addHistroy, deleteVideo } from '../sevices/allApi';
import { v4 as uuidv4 } from 'uuid';
// import insideCategory from './Category'


function VideoCard({card,handleDeleteStatus,insideCategory}) {
    

    const [playedCard,setPlayedCard] = useState({})


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async() => {
        setShow(true)
        const uid = uuidv4()
        const {caption,url} = card
        let cardTime = new Date()
        console.log(cardTime);
        
        if(uid!='' && caption!='' && url!='' && cardTime!=''){
            const body={
                id:uid,
                cardname:caption,
                url,
                date:cardTime
            }

            const response = await addHistroy(body)
            console.log(response);

        }
        

    };
    // console.log(watch);
    // Remove
    const removeITem = async (id)=>{
        const response= await deleteVideo(id)
        console.log(response);
        // console.log('button clicked',id);
        if(response.status>=200 && response.status<300){
            handleDeleteStatus(true)
        }
    }

    const dragStarted = (e,id)=>{
        console.log("Drag started and sorce card id:"+id);
        e.dataTransfer.setData("userId",id)

    }
    return (
        <>

            <Card  className='shadow' draggable onDragStart={e=>dragStarted(e,card?.id)}>
                <Card.Img onClick={handleShow} variant="top" height={'200px'} src={card?.thumbnail} />
                <Card.Body>
                    <Card.Title>
                        <span>{card?.caption}</span>
                        { insideCategory?"":
                        <span onClick={()=>removeITem(card?.id)} style={{ float: "right" }}>
                            <Trash2 color='red' /></span>
                        }

                    </Card.Title>

                </Card.Body>
            </Card>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    

                    <iframe width={"100%"} height={"400px"} src={`${card?.url}`} 
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                     gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </Modal.Body>

            </Modal>

        </>
    )
}

export default VideoCard