import axios from "axios"


export const getData = async (url, setState) => {
    try {
        const { data } = await axios.get(url)
        setState(data)
    } catch (error) {

    }
}


export const setData = async (url, body) => {
    try {
        const data = await axios.post(url, body)
        if (data) {
            alert('Data have been added')
        } else {
            alert('data doesnt work')
        }
    } catch (error) {

    }
}