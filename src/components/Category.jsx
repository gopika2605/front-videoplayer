import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCategory, getallcategory,deletecategory, getaVideo, updateCategory } from "../sevices/allApi";
import { Trash2 } from "react-feather";
import {Col, Row} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
// import {VideoCard} from './VideoCard.js'
import VideoCard from "./VideoCard";


function Category() {
    const [allCategory, setallCategory] = useState([]);
  const [categoryItem, setCategoryItem] = useState({
    id: "",
    categoryName: "",
    allVideos: [],
  });
  const addCategoryForm = (e) => {
    const { name, value } = e.target;
    setCategoryItem({ ...categoryItem, [name]: value });
  };
  console.log(categoryItem);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const { id, categoryName } = categoryItem;
    if (!id || !categoryName) {
      toast.warning("please fill the form");
    } else {
      const response = await addCategory(categoryItem);
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        setShow(false);
        toast.success("new category added successfully");
        getcategoryList();
      } else {
        toast.error("provide unique id....");
      }
    }
  };

 

  const getcategoryList = async () => {
    const response = await getallcategory();
    console.log(response);
    setallCategory(response.data);
  };
  console.log(allCategory);
  useEffect(() => {
    getcategoryList();
  }, []);

  const removeCategory = async(e,id)=>{
    e.preventDefault()
    console.log(id);
     await deletecategory(id)
     getcategoryList();

    

  }
  const dragOver =(e)=>{
    e.preventDefault()
    console.log("Dragging over the category board");

  }
  const dropped= async(e,categoryId)=>{
    console.log("category id:",categoryId);
    let sourceCardId = e.dataTransfer.getData("userId")
    console.log("Source card id:",sourceCardId);
    let {data} = await getaVideo(sourceCardId)
    console.log("Source video data",data);


    let selectedCategory = allCategory.find(item=>item.id === categoryId)
    console.log("Target category detected",selectedCategory);
    selectedCategory.allVideos.push(data)
    console.log("Upadted Target category detected",selectedCategory);
    await updateCategory(categoryId,selectedCategory)
    getcategoryList()



  }


  return (
    <>
      <div className="d-grid">
        <button onClick={handleShow} className="btn btn-dark">
          Add Categories
        </button>
      </div>
      {
      allCategory?.map(item => (
        <div droppable 
        onDragOver={e=>dragOver(e)} 
        onDrop ={e=>dropped(e,item?.id)}>
        <div className="d-flex justify-content-between border rounded mt-2 p-3">
          <h4>{item?.categoryName}</h4>
          <span onClick={e=>removeCategory(e,item?.id)}>
            <Trash2 color="red"  />
          </span>
        </div>
        <Row>
          {
            item?.allVideos.map(card=>(
              <Col sm={12} className="p-3 mb-3">
                {/* <Card style={{height:'300px'}}  className='shadow' >
                <Card.Img onClick={handleShow} variant="top" height={'200px'} src={card?.thumbnail} />
                <Card.Body>
                    <Card.Title>
                        <span>{card?.caption}</span>
                        

                    </Card.Title>

                </Card.Body>
            </Card> */}
            <VideoCard card={card} insideCategory ={true}/>
              </Col>
            ))
          }
        </Row>
        </div>
      ))
    


      
      }
      

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className="mb-3" controlId="floatingId" label=" Id">
            <Form.Control
              type="text"
              placeholder="Id"
              name="id"
              onChange={addCategoryForm}
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="floatingCategory"
            label="Category"
          >
            <Form.Control
              type="text"
              placeholder="Category"
              name="categoryName"
              onChange={addCategoryForm}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddCategory} variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
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
  );
}

export default Category;
