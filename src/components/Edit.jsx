import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import baseUrl from '../services/baseUrl';
import { toast } from 'react-toastify';
import { updateStudentApi } from '../services/allApis';
import { editResponseContext } from '../context/Context';

function Edit({ student }) {

    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState({ ...student })
    const [preview, setPreview] = useState("")

    const { setEditResponse } = useContext(editResponseContext)

    useEffect(() => {
        if (detail.image.type) {
            setPreview(URL.createObjectURL(detail.image))
        } else {
            setPreview("")
        }
    }, [detail.image])

    const handleEdit = async () => {
        console.log(detail);
        const { name, phone, batch, image } = detail
        if (!name || !phone || !batch || !image) {
            toast.warning("Invalid input !!")
        } else {
            if (image.type) {
                const fd = new FormData()
                fd.append('name', name)
                fd.append('phone', phone)
                fd.append('batch', batch)
                fd.append('image', image)

                const header = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }

                const res = await updateStudentApi(student._id, header, fd)

                if (res.status == 200) {
                    toast.success("Student details updated !!")
                    setDetail({ ...res.data })
                    setEditResponse(res)
                    setPreview("")
                    handleClose()
                } else {
                    toast.error("Updation failed !!")
                }
            } else {
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }

                const body = { name, phone, batch, image }

                const res = await updateStudentApi(student._id, header, body)

                if (res.status == 200) {
                    toast.success("Student details updated !!")
                    setDetail({ ...res.data })
                    setEditResponse(res)
                    setPreview("")
                    handleClose()
                } else {
                    toast.error("Updation failed !!")
                }
            }
        }
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <button className='btn' onClick={handleShow}>
                <i className="fa-solid fa-pen-to-square text-warning" />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold text-warning'>Edit Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className='d-flex justify-content-center flex-column'>
                            <label style={{ cursor: 'pointer' }}>
                                <input type="file" style={{ display: 'none' }} onChange={(e) => setDetail({ ...detail, image: e.target.files[0] })} />
                                <img className='img-fluid' src={preview ? preview : `${baseUrl}/uploads/${student.image}`} alt="" />
                            </label>
                        </Col>
                        <Col className='d-flex justify-content-center flex-column'>
                            <FloatingLabel controlId="" label="Enter Name">
                                <Form.Control defaultValue={student?.name} onChange={(e) => setDetail({ ...detail, name: e.target.value })} type="text" placeholder="" />
                            </FloatingLabel>
                            <FloatingLabel className='mt-2' controlId="" label="Enter Phone Number">
                                <Form.Control defaultValue={student?.phone} onChange={(e) => setDetail({ ...detail, phone: e.target.value })} type="number" placeholder="" />
                            </FloatingLabel>
                            <FloatingLabel className='mt-2' controlId="" label="Enter Class">
                                <Form.Control defaultValue={student?.batch} onChange={(e) => setDetail({ ...detail, batch: e.target.value })} type="text" placeholder="" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={handleEdit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit