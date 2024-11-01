import commonApi from "./commonApi"
import baseUrl from "./baseUrl"

export const registerApi = async (data) => {
    return await commonApi(`${baseUrl}/reg`, 'POST', "", data)
}

export const loginApi = async (data) => {
    return await commonApi(`${baseUrl}/log`, 'POST', "", data)
}

export const addStudentApi = async (header, data) => {
    return await commonApi(`${baseUrl}/addstudent`, 'POST', header, data)
}

export const getStudentApi = async (header, search) => {
    return await commonApi(`${baseUrl}/getstudents?search=${search}`, 'GET', header, "")
}

export const deleteStudentApi = async (id, header) => {
    return await commonApi(`${baseUrl}/deletestudent/${id}`, 'DELETE', header, {})
}

export const updateStudentApi = async (id, header, data) => {
    return await commonApi(`${baseUrl}/updatestudent/${id}`, 'PUT', header, data)
}