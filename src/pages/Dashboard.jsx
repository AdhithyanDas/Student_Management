import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { deleteStudentApi, getStudentApi } from '../services/allApis'
import { addResponseContext, editResponseContext } from '../context/Context'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

    const [students, setStudents] = useState([])
    const [searchKey, setSearchKey] = useState("")
    console.log(searchKey);

    const nav = useNavigate()


    const { addResponse, setAddResponse } = useContext(addResponseContext)

    const { editResponse } = useContext(editResponseContext)

    useEffect(() => {
        getData()
    }, [addResponse, editResponse, searchKey])

    const getData = async () => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }

        const res = await getStudentApi(header, searchKey)
        console.log(res)
        if (res.status == 200) {
            setStudents(res.data)
        }
    }

    const deleteStudent = async (id) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }

        const res = await deleteStudentApi(id, header)
        if (res.status == 200) {
            toast.success("Student details removed !!")
            getData()
        } else {
            toast.error("Something went wrong !!")
            console.log(res)
        }
    }

    const logout = () => {
        sessionStorage.clear()
        nav('/auth')
    }

    return (
        <>
            <Header logout={logout} />
            <div className='d-flex justify-content-between'>
                <Add />
                <div className='mt-4 me-5'>
                    <input type="text" className='p-2 border-3 rounded-3 border-warning' placeholder='Search..' onChange={(e) => setSearchKey(e.target.value)} />
                </div>
            </div>

            <div className='container-fluid p-4'>
                {
                    students.length > 0 ?
                        <table className='table table-bordered mt-4'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Class</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students?.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.batch}</td>
                                            <td>{item.phone}</td>
                                            <td>
                                                <Edit student={item} />
                                                <button className='btn' onClick={() => deleteStudent(item._id)}>
                                                    <i className="fa-solid fa-trash-can text-primary" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <h3 className='fw-bold text center'>No students yet !!</h3>
                }
            </div>
        </>
    )
}

export default Dashboard