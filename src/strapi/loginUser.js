import url from '../utils/URL'
import axios from 'axios'

const loginUser = async ({email,password}) => {
    let response = await axios.post(`${url}/auth/local`, {
        identifier: email,
        password
    }).catch(error => {
        console.log(error)
    })
    return response
}

export default loginUser