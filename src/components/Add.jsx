import React, { useState } from 'react'
import { PlusCircle } from 'react-feather'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addVideo} from '../sevices/allApi'

function Add({handleRes}) {

    const[uploadData,setUploadData] = useState({
        id:"",caption:"",thumbnail:"",url:""

    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setInput=(e)=>{
        // console.log(e.target.value);
        const{name,value} = e.target
        setUploadData({...uploadData,[name]:value})

    }

    // console.log(uploadData);

    const extracUrl =(e)=>{
        let youtubeUrl = e.target.value
        if(youtubeUrl.includes("v=")){
            let index = youtubeUrl.indexOf("v=")
            let videourl = youtubeUrl.substring(index+2,index+13)
            // console.log(videourl);

            let videoData = uploadData
            videoData.url=`https://www.youtube.com/embed/${videourl}`
            setUploadData(videoData)

        }
        console.log(uploadData);
    }

    const handleAdd= async()=>{
        const {id,caption,thumbnail,url} = uploadData
        if(!id || !caption || !thumbnail || !url){
            toast("please fill the form completely")
        }else{
           const response =  await addVideo(uploadData)
           if(response.status>=200 && response.status<300){
            handleRes(response.data);
            setShow(false)
            toast.success("new video uploaded successfully")

           }else{
            toast.error("provide unique id....")
           }
           
        }
    }

    
    return (
        <>

            <div className='btn' onClick={handleShow}>
                <PlusCircle color='grey ' size={100} />
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Video Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <FloatingLabel className='mb-3' controlId="floatingId" label="Video Id">
                            <Form.Control type="text" placeholder="uploading video adding" name="id" onChange={setInput} />
                        </FloatingLabel>
                        <FloatingLabel className='mb-3' controlId="floatingCaption" label="Video Caption">
                            <Form.Control type="text" placeholder="uploading video Caption" name="caption" onChange={setInput} />
                        </FloatingLabel>
                        <FloatingLabel className='mb-3' controlId="floatingImage" label="Video Cover Image URL">
                            <Form.Control type="text" placeholder="uploading video cover " name="thumbnail" onChange={setInput} />
                        </FloatingLabel>
                        <FloatingLabel className='mb-3' controlId="floatingLink" label="Video Link">
                            <Form.Control type="text" placeholder="uploading video Link" name="url" onChange={extracUrl} />
                        </FloatingLabel>


                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <div onClick={handleClose}><Button onClick={handleAdd}  variant="primary">Add</Button></div>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
            <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>





        </>
    )
}

export default Add