import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addStudentApi } from '../services/allApis';
import { addResponseContext } from '../context/Context';

function Add() {

    const [show, setShow] = useState(false);

    const [student, setStudent] = useState({
        name: "", batch: "", phone: "", image: ""
    })

    const [preview, setPreview] = useState("")

    const { addResponse, setAddResponse } = useContext(addResponseContext)

    useEffect(() => {
        if (student.image) {
            setPreview(URL.createObjectURL(student.image))
        } else {
            setPreview("")
        }
    }, [student.image])

    const handleAddStudent = async () => {
        console.log(student)
        const { name, batch, phone, image } = student
        if (!name || !batch || !phone || !image) {
            toast.warning("Enter valid inputs !!")
        } else {
            const fd = new FormData()
            fd.append("name", name)
            fd.append("batch", batch)
            fd.append("phone", phone)
            fd.append("image", image)

            const header = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }

            const res = await addStudentApi(header, fd)
            console.log(res)
            if (res.status == 200) {
                toast.success("Student added successfully !!")
                handleClose()
                setAddResponse(res)
            } else {
                toast.error("Student adding failed !!")
            }
        }
    }

    const handleClose = () => {
        setShow(false)
        setStudent({
            name: "", batch: "", phone: "", image: ""
        })
        setPreview("")
    }
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='mt-4 ms-5'>
                <button className='btn btn-warning fw-bold' onClick={handleShow}>Add Student +</button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold text-warning'>Add Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className='d-flex justify-content-center flex-column'>
                            <label style={{ cursor: 'pointer' }}>
                                <input type="file" style={{ display: 'none' }} onChange={(e) => setStudent({ ...student, image: e.target.files[0] })} />
                                <img className='img-fluid' src={preview ? preview : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" />
                            </label>
                        </Col>
                        <Col className='d-flex justify-content-center flex-column'>
                            <FloatingLabel controlId="" label="Enter Name">
                                <Form.Control type="text" placeholder="" onChange={(e) => setStudent({ ...student, name: e.target.value })} />
                            </FloatingLabel>
                            <FloatingLabel className='mt-2' controlId="" label="Enter Phone Number">
                                <Form.Control type="number" placeholder="" onChange={(e) => setStudent({ ...student, phone: e.target.value })} />
                            </FloatingLabel>
                            <FloatingLabel className='mt-2' controlId="" label="Enter Class">
                                <Form.Control type="text" placeholder="" onChange={(e) => setStudent({ ...student, batch: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={handleAddStudent}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add