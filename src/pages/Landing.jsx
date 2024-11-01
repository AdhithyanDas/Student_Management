import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <>
            <div className='container-fluid d-flex justify-content-center w-100 align-items-center' style={{ height: '100vh' }}>
                <div className='w-75 p-5'>
                    <Row>
                        <Col>
                            <h2 className='fw-bold text-warning'>Student Managment</h2>
                            <p style={{ textAlign: "justify" }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae unde inventore, voluptates commodi culpa consequuntur consequatur obcaecati at accusantium dignissimos. Iure nobis nulla dicta, aperiam numquam suscipit veniam est reprehenderit!
                                Voluptatem fugit deserunt, quasi dolore itaque neque tempora, architecto saepe consectetur eius ratione, necessitatibus quia facere officia ipsum atque provident excepturi earum voluptates vitae. Tempora ullam mollitia modi aliquam! Dolorem.</p>
                            <Link to={'/auth'} className='btn btn-warning fw-bold'>Get Started</Link>
                        </Col>
                        <Col>
                            <img className='img-fluid w-100' src="https://img.freepik.com/free-vector/businessman-consulting-watch_74855-2350.jpg?semt=ais_hybrid" alt="" />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Landing