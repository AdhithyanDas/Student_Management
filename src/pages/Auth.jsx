import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { loginApi, registerApi } from '../services/allApis';
import { useNavigate } from 'react-router-dom';

function Auth() {

    const [user, setUser] = useState({
        email: "", username: "", password: ""
    })

    const [state, setState] = useState(false)

    const nav = useNavigate()

    const changeState = () => {
        setState(!state)
    }

    const handleRegister = async () => {
        console.log(user)
        const { email, username, password } = user
        if (!email || !username || !password) {
            toast.warning("Enter valid inputs !!")
        } else {
            const res = await registerApi(user)
            console.log(res)
            if (res.status == 200) {
                toast.success("Registration Successfull !!")
                changeState()
                setUser({
                    email: "", username: "", password: ""
                })
            } else {
                toast.error("Registration Failed !!")
            }
        }
    }

    const handleLogin = async () => {
        const { email, password } = user
        if (!email || !password) {
            toast.warning("Enter valid inpust !!")
        } else {
            const res = await loginApi({ email, password })
            if (res.status == 200) {
                console.log(res)
                sessionStorage.setItem("token", res.data.token)
                sessionStorage.setItem("uname", res.data.username)
                toast.success("Login Successfull !!")
                setUser({
                    email: "", username: "", password: ""
                })
                nav('/dash')
            } else {
                toast.error("Login failed !!")
                console.log(res)
            }
        }
    }

    return (
        <>
            <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="w-75 shadow p-5">
                    <Row>
                        <div className='text-center'>
                            {
                                state ?
                                    <h1 className='fw-bold text-warning'>Register</h1>
                                    :
                                    <h1 className='fw-bold text-warning'>Log in</h1>
                            }
                        </div>
                        <Col>
                            <img className='img-fluid' style={{ width: '90%' }} src="https://i.pinimg.com/originals/7a/b6/17/7ab61770dc59b7bbfb04d6aefb76172f.gif" alt="" />
                        </Col>
                        <Col className='d-flex flex-column justify-content-center'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3 mt-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </FloatingLabel>
                            {
                                state &&
                                <FloatingLabel controlId="name" label="Username" style={{ marginBottom: '20px' }}>
                                    <Form.Control type="text" placeholder="name" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                                </FloatingLabel>
                            }
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                            </FloatingLabel>
                            <div className='mt-3'>
                                {
                                    state ?
                                        <div className='d-grid'>
                                            <button className='btn btn-warning fs-5 fw-bold' onClick={handleRegister}>Sign Up</button>
                                        </div>
                                        :
                                        <div className='d-grid'>
                                            <button className='btn btn-warning fs-5 fw-bold' onClick={handleLogin}>Sign in</button>
                                        </div>
                                }
                                <div className='d-flex justify-content-center' onClick={changeState}>
                                    {
                                        state ?
                                            <button className='btn btn-link text-decoration-none mt-2 text-warning'>Have an account?</button>
                                            :
                                            <button className='btn btn-link text-decoration-none mt-2 text-warning'>Don't have an account?</button>
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Auth