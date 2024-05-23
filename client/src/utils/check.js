import jwt_decode from 'jwt-decode'

export const checkRole = () => {
    const obj = jwt_decode(localStorage.getItem('token'))
    // console.log(obj.role)
    return obj.role
}

export const checkName = () => {
    const decodedToken = jwt_decode(localStorage.getItem('token'))

    return decodedToken.name
}

export const checkId = () => {
    const obj = jwt_decode(localStorage.getItem('token'))

    return obj.id
}